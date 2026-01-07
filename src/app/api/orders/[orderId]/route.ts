import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import type { OrderResponse } from '../dto';

//
type Params = Promise<{ orderId: string }>;


//
export async function GET(request: Request, segmentData: { params: Params }) {

  const params = await segmentData.params;
  const id = params.orderId;

  console.log("id:", id)


  if (!id) {
    return NextResponse.json({ error: 'Aucun id fourni.' }, { status: 400 });
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
