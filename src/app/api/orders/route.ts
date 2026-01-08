import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';
import type { OrderCreatePayload, OrderResponse } from './dto';


/**
 * Utilitaire pour récupérer l'identifiant du profil utilisateur courant
 * (mock pour dev, ou vrai dans la version production).
 *
 * @returns L'identifiant du profil utilisateur, ou null si non connecté
 */
async function getProfileId(): Promise<string | null> {

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user?.id ?? null;

    //-- MOCK pendant dev :
    // const mockProfileId = '0a6515da-7d91-4e3a-a951-b10b8ac67e02';
    // return mockProfileId;
}

const ORDER_STATUS = ['PENDING', 'PAID', 'SHIPPED', 'CANCELLED', 'COMPLETED'] as const;

const orderItemInputSchema = z.object({
    productId: z.uuid(),
    name: z.string(),
    price: z.union([z.string(), z.number()]),
    quantity: z.number().int().min(1),
    imageUrl: z.url().optional(),
});

const orderInputSchema = z.object({
    status: z.enum(ORDER_STATUS),
    total: z.union([z.string(), z.number()]),
    shippingId: z.uuid(),
    billingId: z.uuid(),
    items: z.array(orderItemInputSchema).min(1),
});


/**
 * Handler API route POST /api/orders
 * Crée une nouvelle commande à partir du payload envoyé par le client (authentifié).
 *
 * @param request - La requête HTTP Next.js contenant le payload de création de commande
 * @returns Réponse HTTP contenant la commande créée ou un message d'erreur
 */
export async function POST(request: NextRequest) {
    try {
        const profileId = await getProfileId();
        if (!profileId) {
            return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
        }

        // Validation et typage input
        const json = await request.json();
        const parsed = orderInputSchema.safeParse(json);
        if (!parsed.success) {
            return NextResponse.json({
                error: "Invalid input",
                details: parsed.error.issues,
            }, { status: 400 });
        }

        const payload: OrderCreatePayload = parsed.data;

        // Création de la commande
        const createdOrder = await prisma.order.create({
            data: {
                userId: profileId,
                status: payload.status,
                total: Number(payload.total), // sécurité, convertit string vers number si besoin
                shippingId: payload.shippingId,
                billingId: payload.billingId,
                items: {
                    create: payload.items.map((item) => ({
                        productId: item.productId,
                        name: item.name,
                        price: Number(item.price), // sécurité si le front envoie un string
                        quantity: item.quantity,
                        imageUrl: item.imageUrl,
                    })),
                },
            },
            include: {
                items: true,
            },
        });

        // Structure sortie typée OrderResponse
        const response: OrderResponse = {
            id: createdOrder.id,
            status: createdOrder.status,
            total: Number(createdOrder.total),
            shippingId: createdOrder.shippingId,
            billingId: createdOrder.billingId,
            createdAt: createdOrder.createdAt.toISOString(),
            updatedAt: createdOrder.updatedAt.toISOString(),
            items: createdOrder.items.map(item => ({
                id: item.id,
                productId: item.productId ?? undefined,
                name: item.name,
                price: Number(item.price),
                quantity: item.quantity,
                imageUrl: item.imageUrl ?? undefined,
            }))
        };

        return NextResponse.json(response as OrderResponse, { status: 201 });

    } catch (error: unknown) {
        let message = 'Erreur lors de la création de la commande';
        if (error instanceof Error) message = error.message;
        return NextResponse.json({ error: message }, { status: 500 });
    }
}


/**
 * Handler API route GET /api/orders
 * Retourne la liste des commandes du client authentifié.
 * Si aucune commande, retourne un tableau vide (cas non erreur).
 *
 * @returns Réponse HTTP contenant un tableau de commandes ou une erreur si utilisateur non authentifié
 */
export async function GET() {
    try {
        const profileId = await getProfileId();
        if (!profileId) {
            return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
        }

        // On récupère toutes les commandes de l'utilisateur
        const orders = await prisma.order.findMany({
            where: { userId: profileId },
            orderBy: { createdAt: 'desc' },
            include: {
                items: true,
            },
        });

        // On mappe chaque commande à la forme OrderResponse
        const response: OrderResponse[] = orders.map(order => ({
            id: order.id,
            status: order.status,
            total: Number(order.total),
            shippingId: order.shippingId,
            billingId: order.billingId,
            createdAt: order.createdAt.toISOString(),
            updatedAt: order.updatedAt.toISOString(),
            items: order.items.map(item => ({
                id: item.id,
                productId: item.productId ?? undefined,
                name: item.name,
                price: Number(item.price),
                quantity: item.quantity,
                imageUrl: item.imageUrl ?? undefined,
            }))
        }));

        return NextResponse.json(response, { status: 200 });

    } catch (error: unknown) {
        let message = 'Erreur lors de la récupération des commandes';
        if (error instanceof Error) message = error.message;
        return NextResponse.json({ error: message }, { status: 500 });
    }
}