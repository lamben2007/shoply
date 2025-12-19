// import { NextResponse } from 'next/server';
// import prisma from "@/lib/prisma";
// import { z } from 'zod';
// import { createClient } from '@/lib/supabase/server';


// // Validation du corps de création de commande
// const OrderSchema = z.object({
//     fullname: z.string().min(1),
//     email: z.email(),
//     address: z.string().min(1),
//     items: z.array(
//         z.object({
//             productId: z.string().min(1),
//             quantity: z.number().min(1),
//             price: z.number().min(0.01),
//         })
//     ).min(1),
//     totalPrice: z.number().min(0.01),
// });


export async function GET() {

//     // 1. Crée le client supabase côté serveur (auth automatique via cookies)
//     const supabase = await createClient();

//     // 2. Récupère l'utilisateur connecté
//     const { data: { user } } = await supabase.auth.getUser();

//     if (!user?.email) {
//         return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
//     }

//     // 3. Récupère les commandes avec le filtre email
//     const orders = await prisma.order.findMany({
//         where: { email: user.email },
//         include: { items: true },
//         orderBy: { createdAt: 'desc' },
//     });

//     return NextResponse.json(orders);
}



export async function POST(request: Request) {
//     try {
//         const data = await request.json();
//         const parsed = OrderSchema.parse(data);

//         // Transaction de création commande + items
//         const createdOrder = await prisma.order.create({
//             data: {
//                 fullname: parsed.fullname,
//                 email: parsed.email,
//                 address: parsed.address,
//                 totalPrice: parsed.totalPrice,
//                 items: {
//                     create: parsed.items.map((item) => ({
//                         productId: item.productId,
//                         quantity: item.quantity,
//                         price: item.price,
//                     })),
//                 },
//             },
//             include: {
//                 items: true,
//             },
//         });
//         return NextResponse.json(createdOrder, { status: 201 });
//     } catch (error) {
//         if (error instanceof z.ZodError) {
//             return NextResponse.json({ error: error.issues }, { status: 400 });
//         } else {
//             console.error(error)
//             return NextResponse.json({ error: 'Erreur lors de la création.' }, { status: 500 });
//         }
//     }
}
