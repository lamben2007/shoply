import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createClient } from '@/lib/supabase/server';
import { AddressResponse } from "@/lib/dto/address.dto";

type Params = Promise<{ id: string }>;

/**
 * Récupère l'ID du profil utilisateur courant via Supabase Auth.
 * @returns ID du profil ou null si l'utilisateur n'est pas connecté.
 */
async function getProfileId(): Promise<string | null> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id ?? null;

    // -- MOCK pendant dev :
    // const mockProfileId = '0a6515da-7d91-4e3a-a951-b10b8ac67e02';
    // return mockProfileId;
}

/**
 * Récupère l'ID d'adresse depuis l'objet de paramètres Next.js.
 * @param segmentData - Objet contenant les paramètres d'URL de la route.
 * @returns L'identifiant d'adresse ou null si absent.
 */
async function getAddressId(segmentData: { params: Params }): Promise<string | null> {
    const params = await segmentData.params;
    return params?.id ?? null;
}

/**
 * POST /api/address/default-shipping/[id]
 * Définit l'adresse [id] comme adresse de livraison par défaut pour l'utilisateur authentifié.
 * Cette action dé-sélectionne d'abord tout 'isDefaultShipping' sur toutes les adresses du user,
 * puis met 'isDefaultShipping = true' sur celle correspondante à [id].
 *
 * Exigences :
 * - L'utilisateur doit être authentifié.
 * - L'adresse doit exister et appartenir à l'utilisateur.
 *
 * @param req - Objet requête Next.js HTTP
 * @param segmentData - Données de segment avec paramètres d'URL
 * @returns L'adresse mise à jour comme 'default shipping', ou erreur JSON précise
 */
export async function POST(req: NextRequest, segmentData: { params: Params }) {
    try {
        // Récupère l'identifiant d'adresse dans l'URL
        const id = await getAddressId(segmentData);
        if (!id) return NextResponse.json({ error: 'Paramètre id manquant' }, { status: 400 });

        // Récupère l'identifiant de profil (user)
        const profileId = await getProfileId();
        if (!profileId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

        // Vérifie que l'adresse à mettre à jour existe et appartient bien à ce user
        const addressToUpdate = await prisma.address.findUnique({
            where: { id: id },
            select: { profileId: true },
        });

        if (!addressToUpdate) {
            return NextResponse.json({ error: "Adresse introuvable" }, { status: 404 });
        }

        // L'adresse existe, mais n'appartient pas au user authentifié
        if (addressToUpdate.profileId !== profileId) {
            return NextResponse.json({ error: "Non autorisé à modifier cette adresse" }, { status: 403 });
        }

        // 1. Désactive toute autre adresse par défaut pour ce profil
        await prisma.address.updateMany({
            where: {
                profileId,
                isDefaultShipping: true,
            },
            data: {
                isDefaultShipping: false,
            },
        });

        // 2. Rend cette adresse la nouvelle adresse de livraison par défaut
        const address: AddressResponse = await prisma.address.update({
            where: { id: id },
            data: { isDefaultShipping: true },
        });

        // Retourne la nouvelle configuration
        return NextResponse.json({ address });

    } catch (error: unknown) {
        console.error(error);

        // Gestion d'erreur (inattendue)
        let message = "Erreur interne du serveur";
        if (error instanceof Error) message = error.message;

        return NextResponse.json(
            { error: "Erreur interne du serveur", details: message },
            { status: 500 }
        );
    }
}