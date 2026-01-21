import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@/lib/supabase/server';
import { Profile } from "@/types/profile";

/**
 * Handler GET : récupère le profil de l’utilisateur authentifié.
 * - Authentifie via Supabase (cookie côté serveur)
 * - Retourne le profil correspondant à l’ID de l’utilisateur, ou une erreur si non authentifié.
 * 
 * @returns Un profil utilisateur JSON ou un message d’erreur avec code HTTP approprié.
 */
export async function GET() {

    // 1. Crée le client supabase côté serveur (avec authentification auto par cookie)
    const supabase = await createClient();

    // 2. Récupère l'utilisateur connecté via Supabase
    const { data: { user } } = await supabase.auth.getUser();

    // 3. Vérifie si l'utilisateur est authentifié (présence e-mail)
    if (!user?.email) {
        return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // 4. Recherche le profil de l'utilisateur via Prisma, en utilisant l'ID
    const profile = await prisma.profile.findUnique({
        where: { id: user.id },
    });

    // 5. Retourne le profil trouvé (sinon null)
    return NextResponse.json(profile);
}

/**
 * Handler POST : met à jour le profil de l’utilisateur authentifié.
 * - Authentifie via Supabase (cookie)
 * - Met à jour lastName et firstName du profil correspondant à l’ID utilisateur.
 * 
 * @param req Requête Next.js contenant les champs du profil à mettre à jour (JSON)
 * @returns {Promise<NextResponse>} Le profil mis à jour ou un message d’erreur en JSON
 */
export async function POST(req: NextRequest) {

    // 1. Crée le client supabase côté serveur (auth automatique via cookies)
    const supabase = await createClient();

    // 2. Récupère l'utilisateur connecté
    const { data: { user } } = await supabase.auth.getUser();

    // 3. Vérifie s’il y a un utilisateur authentifié (présence ID)
    if (!user?.id) {
        return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // 4. Extrait les données du profil depuis la requête
    const data = await req.json() as Profile;

    try {
        // 5. Met à jour le profil avec les nouvelles données
        const profile = await prisma.profile.update({
            where: { id: user.id },
            data: {
                lastName: data.lastName ?? "",
                firstName: data.firstName ?? "",
            },
        });
        // 6. Retourne le profil mis à jour
        return NextResponse.json(profile);
    } catch {
        // 7. Gère le cas où le profil n’existe pas (erreur Prisma)
        return NextResponse.json({ error: "Profil introuvable, impossible de mettre à jour." }, { status: 404 });
    }
}