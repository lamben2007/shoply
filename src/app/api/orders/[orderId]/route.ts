import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import type { OrderResponse } from '../dto';
import { z } from "zod";

//
type Params = Promise<{ orderId: string }>;

const uuidSchema = z.uuid();

/**
 * Handler API route GET /api/orders
 *
 * Récupère la liste des commandes du client authentifié.
 * Retourne un tableau vide si le client n'a aucune commande.
 * Retourne une erreur 401 si le client n'est pas authentifié.
 *
 * @returns Une réponse contenant la liste des commandes (OrderResponse[]) ou un message d'erreur.
 * @throws {Error} 500 en cas d'erreur interne.
 */
export async function GET(request: Request, segmentData: { params: Params }) {

  const params = await segmentData.params;
  const id = params.orderId;

  // if (!id) {
  //   return NextResponse.json({ error: 'Aucun id fourni.' }, { status: 400 });
  // }

    // ✅ On valide l'id avant toute requête DB
  const parse = uuidSchema.safeParse(id);
  if (!parse.success) {
    return NextResponse.json({ error: "ID de commande invalide" }, { status: 400 });
  }


  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) {
    return NextResponse.json({ error: 'Commande non trouvée.' }, { status: 404 });
  }

  // Mapping vers OrderResponse DTO
  const response: OrderResponse = {
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
    })),
  };

  return NextResponse.json(response);
}
