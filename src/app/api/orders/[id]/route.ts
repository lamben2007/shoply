import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

//
type Params = Promise<{ id: string }>;


//
export async function GET(request: Request, segmentData: { params: Params }) {

  const params = await segmentData.params;
  const id = params.id;

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

  return NextResponse.json(order);
}
