import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

type Params = Promise<{ id: string }>;

// Facteur utilitaire pour récupérer le profileId (mock ou prod)
/**
 * Récupère l'identifiant du profil utilisateur via Supabase Auth.
 * Si l'utilisateur n'est pas connecté, retourne null.
 */
async function getProfileId(): Promise<string | null> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id ?? null;
    // -- MOCK pendant dev :
    // const mockProfileId = '0a6515da-7d91-4e3a-a951-b10b8ac67e02';
    // return mockProfileId;
}

// Facteur utilitaire pour récupérer le paramètre id
/**
 * Extrait le paramètre id depuis l'objet segmentData de Next.js.
 * @param segmentData - Objet contenant les paramètres d'URL.
 * @returns L'identifiant d'adresse ou null si absent.
 */
async function getAddressId(segmentData: { params: Params }): Promise<string | null> {
    const params = await segmentData.params;
    return params?.id ?? null;
}

/**
 * GET /api/address/[id]
 * Récupère une adresse spécifique appartenant à l'utilisateur authentifié.
 *
 * @param req - La requête HTTP Next.js
 * @param segmentData - Données de segment avec paramètres d'URL
 * @returns Adresse trouvée, 404 si non trouvée, 401 si non authentifié, 400 si id manquant
 */
export async function GET(req: NextRequest, segmentData: { params: Params }) {

    // Récupère le profil utilisateur
    const profileId = await getProfileId();
    if (!profileId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

    // Récupère le paramètre id de l'adresse
    const id = await getAddressId(segmentData);
    if (!id) return NextResponse.json({ error: 'Paramètre id manquant' }, { status: 400 });

    // Recherche l'adresse en base de données pour ce user
    const address = await prisma.address.findUnique({
        where: { id, profileId }
    });

    if (!address) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(address);
}

/**
 * PUT /api/address/[id]
 * Met à jour une adresse existante appartenant à l'utilisateur authentifié.
 *
 * @param req - La requête HTTP Next.js (avec payload JSON)
 * @param segmentData - Données de segment avec paramètres d'URL
 * @returns Adresse mise à jour, 404 si non trouvée, 401 si non authentifié, 400 si id manquant
 */
export async function PUT(req: NextRequest, segmentData: { params: Params }) {
    const profileId = await getProfileId();
    if (!profileId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    const id = await getAddressId(segmentData);
    if (!id) return NextResponse.json({ error: 'Paramètre id manquant' }, { status: 400 });

    // Données à mettre à jour (extraites de la requête)
    const data = await req.json();

    // Met à jour l'adresse (updateMany pour prendre en compte le profileId)
    const result = await prisma.address.updateMany({
        where: { id, profileId },
        data,
    });

    // Si aucune ligne modifiée (adresse inexistante ou pas à cet utilisateur)
    if (result.count === 0) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Retourne la nouvelle version de l'adresse
    const updated = await prisma.address.findUnique({
        where: { id },
    });
    return NextResponse.json(updated);
}

/**
 * DELETE /api/address/[id]
 * Supprime une adresse spécifique appartenant à l'utilisateur authentifié.
 *
 * @param req - La requête HTTP Next.js
 * @param segmentData - Données de segment avec paramètres d'URL
 * @returns 204 si supprimée, 404 si non trouvée, 401 si non authentifié, 400 si id manquant
 */
export async function DELETE(req: NextRequest, segmentData: { params: Params }) {
    const profileId = await getProfileId();
    if (!profileId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    const id = await getAddressId(segmentData);
    if (!id) return NextResponse.json({ error: 'Paramètre id manquant' }, { status: 400 });

    // Supprime l'adresse
    const result = await prisma.address.deleteMany({
        where: { id, profileId }
    });

    if (result.count === 0) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Succès : retourne 204 (No Content)
    return new NextResponse(null, { status: 204 });
}