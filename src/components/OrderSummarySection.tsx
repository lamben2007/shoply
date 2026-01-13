import React from "react";
import { CartItem } from "@/types/cart";

type Props = {
    items: CartItem[];
    deliveryCost: number;
    discount?: number;
};

export default function OrderSummarySection({ items, deliveryCost, discount = 0 }: Props) {

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + deliveryCost - discount;

    return (
        // <section className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
        <section>
            <h2 className='font-bold text-2xl mb-4'>4. Résumé de la commande</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="px-4 py-2 font-semibold border-b border-gray-200">Article</th>
                            <th className="px-4 py-2 font-semibold border-b border-gray-200">Qté</th>
                            <th className="px-4 py-2 font-semibold border-b border-gray-200">Prix unitaire</th>
                            <th className="px-4 py-2 font-semibold border-b border-gray-200">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, idx) => (
                            <tr
                                key={item.productId}
                                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                            >
                                <td className="px-4 py-2 border-b border-gray-100">{item.name}</td>
                                <td className="px-4 py-2 border-b border-gray-100 text-center">{item.quantity}</td>
                                <td className="px-4 py-2 border-b border-gray-100">{item.price.toFixed(2)} €</td>
                                <td className="px-4 py-2 border-b border-gray-100">{(item.price * item.quantity).toFixed(2)} €</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-6 space-y-1 flex flex-col items-end">
                <div><b>Sous-total :</b> {subtotal.toFixed(2)} €</div>
                <div><b>Frais de livraison :</b> {deliveryCost.toFixed(2)} €</div>
                {discount > 0 && <div><b>Remise :</b> -{discount.toFixed(2)} €</div>}
                <div className="font-bold text-xl mt-2 text-blue-700">TOTAL TTC : {total.toFixed(2)} €</div>
            </div>
        </section>
    );
}