"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Order } from "../../types/orders";


export default function OrdersList() {

    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const res = await fetch("/api/orders");
                if (res.status === 401) {
                    setError("Vous devez être authentifié pour accéder à vos commandes.");
                    setOrders([]); // Optionnel : reset si erreur
                } else if (!res.ok) {
                    setError("Erreur lors du chargement des commandes.");
                    setOrders([]);
                } else {
                    const data: Order[] = await res.json();
                    setOrders(data);
                }
            } catch (err: unknown) {
                if (err instanceof Error)
                    setError("Erreur réseau : " + err.message)
                else
                    setError("Erreur réseau.");

                setOrders([]);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, []);

    if (loading) return <div>Chargement…</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;

    return (
        <div>
            <h1>Commandes</h1>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        <Link href={`/orders/${order.id}`}>
                            {order.id} - {order.fullname} — {order.createdAt}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}