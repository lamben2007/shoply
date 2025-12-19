import { Order } from '@/types/order';
import { CartItem } from '@/types/cart';
import prisma from "@/lib/prisma";


export async function checkStock(cart: CartItem[]): Promise<{ ok: boolean; message?: string }> {

  for (const cartItem of cart) {

    const dbProduct = await prisma.product.findUnique({
      where: { id: cartItem.productId }
    });

    if (!dbProduct) {
      return { ok: false, message: `Produit ${cartItem.productId} inconnu.` };
    }
    if (cartItem.quantity > dbProduct.stock) {
      return { ok: false, message: `Stock insuffisant pour ${cartItem.productId}.` };
    }
  }
  return { ok: true };
}






// "order" ici : { user, cart, shipping, billing, status, total }
export async function saveOrderToDb(order: Omit<Order, 'orderId' | 'createdAt'>): Promise<Order | undefined> {

  // Générer un id unique (tu peux aussi laisser Prisma générer avec uuid par défaut !)
  // const generatedOrderId = `order_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  // Préparer les cartItems à insérer
  const cartItemsData = order.cart.map(item => ({
    productId: item.productId,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    imageUrl: item.imageUrl
  }));

  console.log("cartItemsData:", cartItemsData)


  // Enregistrer la commande + items
  // const createdOrder = await prisma.order.create({
  //   data: {
  //     orderId: generatedOrderId,
  //     status: order.status,
  //     total: order.total,
  //     user: { connect: { userId: userRecord.userId } },
  //     shipping: order.shipping,
  //     billing: order.billing || null,
  //     cart: {
  //       create: cartItemsData
  //     }
  //   },
  //   include: {
  //     cart: true,
  //     user: true
  //   }
  // });

  // Mapping vers ton type Order
  // return {
  //   orderId: createdOrder.orderId,
  //   user: {
  //     userId: createdOrder.user.userId,
  //     email: createdOrder.user.email,
  //     firstName: createdOrder.user.firstName,
  //     lastName: createdOrder.user.lastName,
  //   },
  //   cart: createdOrder.cart.map(item => ({
  //     productId: item.productId,
  //     name: item.name,
  //     price: item.price,
  //     quantity: item.quantity,
  //     // Ajoute imageUrl si ton modèle le permet
  //   })),
  //   shipping: createdOrder.shipping,
  //   billing: createdOrder.billing || undefined,
  //   status: createdOrder.status as any,
  //   createdAt: createdOrder.createdAt.toISOString(),
  //   updatedAt: createdOrder.updatedAt ? createdOrder.updatedAt.toISOString() : undefined,
  //   total: createdOrder.total
  // };

  console.log("ok saveOrderToDb")

  return undefined
}