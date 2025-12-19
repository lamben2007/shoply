import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { createClient } from '@/lib/supabase/server';


// Facteur utilitaire pour récupérer le profileId (mock ou prod)
async function getProfileId(): Promise<string | null> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id ?? null;

    //-- MOCK pendant dev :
    //const mockProfileId = '0a6515da-7d91-4e3a-a951-b10b8ac67e02';
    //return mockProfileId;
}


export async function GET() {

    const profileId = await getProfileId();
    if (!profileId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

    // Liste toutes les adresses du profil courant
    const addresses = await prisma.address.findMany({
        where: { profileId: profileId },
        orderBy: { name: "asc" }
    });
    return NextResponse.json(addresses);
}


export async function POST(req: NextRequest) {

    const profileId = await getProfileId();
    if (!profileId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

    const data = await req.json();

    const address = await prisma.address.create({
        data: {
            ...data,
            profileId: profileId
        }
    });
    return NextResponse.json(address, { status: 201 });
}