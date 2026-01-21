import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * Handler pour la méthode GET de l'API produits.
 * Récupère tous les produits de la base de données, du plus récent au plus ancien.
 * @returns Une réponse JSON contenant la liste des produits, ou une erreur serveur
 */
export async function GET() {
    try {
        // Récupère tous les produits dans la base de données, triés par date de création décroissante
        const products = await prisma.product.findMany({
            orderBy: { createdAt: "desc" },
        });

        // Pour chaque produit, on parse le champ price en float (s'il existe)
        const parsedProducts = products.map(product => ({
            ...product,
            price: product.price !== null ? parseFloat(product.price as unknown as string) : null,
        }));

        // Retourne la liste des produits sous forme de tableau JSON
        return NextResponse.json({ products: parsedProducts });

    } catch (error) {
        // Log l'erreur côté serveur
        console.error("API error:", error);
        // Retourne une erreur 500 si la requête échoue
        return new NextResponse("Erreur serveur", { status: 500 });
    }
}
