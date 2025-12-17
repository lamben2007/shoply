import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@/lib/supabase/server';


export async function GET() {

    // 1. Crée le client supabase côté serveur (auth automatique via cookies)
    const supabase = await createClient();

    // 2. Récupère l'utilisateur connecté
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.email) {
        return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // 3. Récupère les commandes avec le filtre id
    const profile = await prisma.profiles.findUnique({
        where: { id: user.id },
    });

    return NextResponse.json(profile);
}


export async function POST(req: NextRequest) {

    // 1. Crée le client supabase côté serveur (auth automatique via cookies)
    const supabase = await createClient();

    // 2. Récupère l'utilisateur connecté
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.id) {
        return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const data = await req.json();

    try {
        const profile = await prisma.profiles.update({
            where: { id: user.id },
            data: {
                nom: data.nom ?? "",
                prenom: data.prenom ?? "",
                adresse: data.adresse ?? "",
            },
        });
        return NextResponse.json(profile);
    } catch {
        // Si le profil n'existe pas, Prisma lève une erreur
        return NextResponse.json({ error: "Profil introuvable, impossible de mettre à jour." }, { status: 404 });
    }
}