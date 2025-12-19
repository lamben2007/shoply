import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
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

export async function GET(req: NextRequest, segmentData: { params: Params }) {

    const profileId = await getProfileId();
    if (!profileId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    const id = await getAddressId(segmentData);
    if (!id) return NextResponse.json({ error: 'Paramètre id manquant' }, { status: 400 });

    const address = await prisma.address.findUnique({
        where: { id, profileId }
    });

    if (!address) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(address);
}

//
export async function PUT(req: NextRequest, segmentData: { params: Params }) {
    const profileId = await getProfileId();
    if (!profileId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    const id = await getAddressId(segmentData);
    if (!id) return NextResponse.json({ error: 'Paramètre id manquant' }, { status: 400 });

    const data = await req.json();

    const result = await prisma.address.updateMany({
        where: { id, profileId },
        data,
    });

    if (result.count === 0) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Retourner la nouvelle version de l'adresse
    const updated = await prisma.address.findUnique({
        where: { id },
    });
    return NextResponse.json(updated);
}

//
export async function DELETE(req: NextRequest, segmentData: { params: Params }) {
    const profileId = await getProfileId();
    if (!profileId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    const id = await getAddressId(segmentData);
    if (!id) return NextResponse.json({ error: 'Paramètre id manquant' }, { status: 400 });

    const result = await prisma.address.deleteMany({
        where: { id, profileId }
    });

    if (result.count === 0) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Success: 204 No Content
    return new NextResponse(null, { status: 204 });
}