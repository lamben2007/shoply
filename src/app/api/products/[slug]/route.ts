import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * Type asynchrone représentant l'objet de paramètres reçus des segments de route dynamiques.
 */
type Params = Promise<{ slug: string }>;

/**
 * Handler pour la méthode GET de l'API produit.
 * @param request L'objet Request Next.js
 * @param segmentData Données des segments de la route, contenant un paramètre slug asynchrone
 * @returns Un objet JSON représentant le produit correspondant au slug fourni, ou un message d'erreur
 */
export async function GET(request: Request, segmentData: { params: Params }) {
    // Récupère les paramètres depuis les segments de route (de manière asynchrone)
    const params = await segmentData.params;
    // Extrait le slug à partir des paramètres
    const slug = params.slug;

    try {
        // Recherche du produit dans la base de données à l'aide de Prisma grâce au slug
        const product = await prisma.product.findUnique({
            where: { slug: slug },
        });

        // Si le produit n'existe pas, renvoie un message d'erreur avec un code 404
        if (!product) {
            return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
        }

        // Retourne le produit, en forçant le champ price à être de type float
        return NextResponse.json({ 
            ...product,
            price: parseFloat(product.price as unknown as string),
         });

    } catch (err: unknown) {
        // Gestion des erreurs, retourne un message explicite ou générique
        const message = err instanceof Error ? err.message : "Erreur inconnue";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}