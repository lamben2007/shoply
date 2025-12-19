import { NextRequest, NextResponse } from 'next/server';
import { OrderRequest } from '@/types/orderRequest';
// import { saveOrderToDb } from '@/lib/orderUtils'
// import { Order } from '@/types/order';
import { checkStock } from '@/lib/orderUtils';

export async function POST(req: NextRequest) {

  let orderReq: OrderRequest;

  try {
    orderReq = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Payload invalide.' }, { status: 400 });
  }

  // Vérification simple des champs essentiels
  if (!orderReq.cart || orderReq.cart.length === 0 || !orderReq.user || !orderReq.shipping) {
    return NextResponse.json({ success: false, message: 'Informations incomplètes.' }, { status: 400 });
  }

  // Calcul du total (toujours côté serveur)
  // const total = orderReq.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);




  // Vérification du stock
  const stockResult = await checkStock(orderReq.cart);
  if (!stockResult.ok) {
    return NextResponse.json({ success: false, message: stockResult.message || "Stock insuffisant" }, { status: 400 });
  }


  // Génération d’un orderId unique (simplifié, adapter selon BDD)
  // const orderToSave: Omit<Order, 'orderId' | 'createdAt'> = {
  //   // user: orderReq.user,
  //   cart: orderReq.cart,
  //   shipping: orderReq.shipping,
  //   billing: orderReq.billing,
  //   // status: 'pending',
  //   // total
  // };


  // console.log("orderToSave:", orderToSave)

  
  
  try {
      // const savedOrder = await saveOrderToDb(orderToSave); // Doit retourner l'Order avec son id, etc.
      return NextResponse.json({ success: true,  message: "OK STOP ***" }, { status: 200 });
      // return NextResponse.json({ success: true, orderId: savedOrder.orderId }, { status: 200 });
    
    
    } catch {
        return NextResponse.json({ success: false, message: 'Erreur à l\'enregistrement' }, { status: 500 });
      }
      
      // return NextResponse.json({ success: true, message: "OK STOP ***" }, { status: 200 });

}