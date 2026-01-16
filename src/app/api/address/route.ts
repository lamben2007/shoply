import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { createClient } from '@/lib/supabase/server';
import { CreateAddressSchema } from '@/lib/zod/address.schema';
import type { CreateAddressDto, AddressResponse } from '@/lib/dto/address.dto';

/**
 * Récupère l'identifiant du profil de l'utilisateur connecté via Supabase Auth.
 *
 * @returns {Promise<string | null>} L'identifiant du profil courant ou null si non connecté.
 */
async function getProfileId(): Promise<string | null> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id ?? null;

    //-- MOCK pendant dev :
    //const mockProfileId = '0a6515da-7d91-4e3a-a951-b10b8ac67e02';
    //return mockProfileId;
}

/**
 * GET /api/address
 * Retourne la liste des adresses du profil authentifié.
 * Les champs renvoyés correspondent au DTO public AddressResponse.
 *
 * @returns - 200 avec la liste des adresses, 401 si non authentifié
 */
export async function GET() {
    const profileId = await getProfileId();
    if (!profileId) {
        return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // On ne sélectionne que les champs publics / DTO
    const addresses: AddressResponse[] = await prisma.address.findMany({
        where: { profileId: profileId },
        orderBy: { name: "asc" },
        select: {
            id: true,
            profileId: true,
            name: true,
            street: true,
            zip: true,
            city: true,
            country: true,
            complement: true,
            isDefaultShipping: true,
            isDefaultBilling: true,
        }
    });

    return NextResponse.json(addresses);
}

/**
 * POST /api/address
 * Crée une nouvelle adresse pour le profil authentifié.
 * Les données reçues sont validées via le schéma Zod CreateAddressSchema.
 * Retourne la nouvelle adresse selon le DTO public AddressResponse.
 *
 * @param req - La requête Next.js, contenant le body au format JSON de l'adresse à créer
 * @returns - 201 avec l'adresse, 400 si validation échouée, 401 si non authentifié
 */
export async function POST(req: NextRequest) {
    const profileId = await getProfileId();
    if (!profileId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

    const data = await req.json();

    // Validation des données reçues via schéma Zod
    const result = CreateAddressSchema.safeParse(data);
    if (!result.success) {
        return NextResponse.json({ error: "Validation échouée", details: result.error.issues }, { status: 400 });
    }
    const addressData: CreateAddressDto = result.data;

    // Création de l'adresse en base de données
    const address = await prisma.address.create({
        data: {
            ...addressData,
            profileId: profileId
        }
    });
    // On caste la donnée en DTO public (filtrage sur les champs à exposer)
    const publicAddress: AddressResponse = {
        id: address.id,
        profileId: address.profileId,
        name: address.name,
        street: address.street,
        zip: address.zip,
        city: address.city,
        country: address.country,
        complement: address.complement,
        isDefaultShipping: address.isDefaultShipping,
        isDefaultBilling: address.isDefaultBilling
    };

    return NextResponse.json(publicAddress, { status: 201 });
}
