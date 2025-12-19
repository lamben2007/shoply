import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createClient } from '@/lib/supabase/server';


type Params = Promise<{ id: string }>;

// Facteur utilitaire pour récupérer le profileId (mock ou prod)
async function getProfileId(): Promise<string | null> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id ?? null;

    // -- MOCK pendant dev :
    // const mockProfileId = '0a6515da-7d91-4e3a-a951-b10b8ac67e02';
    // return mockProfileId;
}

// Factor utilitaire pour récupérer le paramètre id
async function getAddressId(segmentData: { params: Params }): Promise<string | null> {
    const params = await segmentData.params;
    return params?.id ?? null;
}


//
export async function POST(req: NextRequest, segmentData: { params: Params }) {
    try {
        const id = await getAddressId(segmentData);
        if (!id) return NextResponse.json({ error: 'Paramètre id manquant' }, { status: 400 });

        const profileId = await getProfileId();
        if (!profileId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

        // Vérifie si l'adresse appartient bien au profil
        const addressToUpdate = await prisma.address.findUnique({
            where: { id: id },
            select: { profileId: true },
        });

        if (!addressToUpdate) {
            return NextResponse.json({ error: "Adresse introuvable" }, { status: 404 });
        }

        if (addressToUpdate.profileId !== profileId) {
            return NextResponse.json({ error: "Non autorisé à modifier cette adresse" }, { status: 403 });
        }

        // 1. Désélectionner toutes les adresses de ce profil
        await prisma.address.updateMany({
            where: {
                profileId,
                isDefaultShipping: true,
            },
            data: {
                isDefaultShipping: false,
            },
        });

        // 2. Sélectionner cette adresse comme adresse de livraison par défaut
        const address = await prisma.address.update({
            where: { id: id },
            data: { isDefaultShipping: true },
        });

        return NextResponse.json({ address });

    } catch (error: unknown) {
        console.error(error);

        //
        let message = "Erreur interne du serveur";
        if (error instanceof Error) message = error.message;

        return NextResponse.json(
            { error: "Erreur interne du serveur", details: message },
            { status: 500 }
        );
    }
}