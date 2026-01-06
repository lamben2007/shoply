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
        <section>
            <h2>4. Résumé de la commande</h2>
            <table>
                <thead>
                    <tr>
                        <th>Article</th>
                        <th>Qté</th>
                        <th>Prix unitaire</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.productId}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price.toFixed(2)} €</td>
                            <td>{(item.price * item.quantity).toFixed(2)} €</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div><b>Sous-total :</b> {subtotal.toFixed(2)} €</div>
            <div><b>Frais de livraison :</b> {deliveryCost.toFixed(2)} €</div>
            {discount > 0 && <div><b>Remise :</b> -{discount.toFixed(2)} €</div>}
            <div style={{ fontWeight: "bold", fontSize: "1.2em" }}>TOTAL TTC : {total.toFixed(2)} €</div>
        </section>
    );
}