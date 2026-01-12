"use client";

import { useEffect, useState } from "react";
import { OrderResponse } from "../../types/order";
import Link from "next/link";

import dayjs from "dayjs";

/**
 * Convertit une date ISO en format français dd/mm/yyyy hh:mm
 * @param isoString - Une date ISO (ex : "2024-06-06T18:40:25.000Z")
 * @returns La date formatée en français (ex : "06/06/2024 20:40")
 */
export function formatDateFr(isoString: string): string {
    return dayjs(isoString).format("DD/MM/YYYY HH:mm");
}


export default function OrdersList() {

    const [orders, setOrders] = useState<OrderResponse[]>([]);
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
                    const data: OrderResponse[] = await res.json();
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
            <h1>LISTE DES COMMANDES</h1>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        <Link href={`/orders/${order.id}`}>
                            Commande du {formatDateFr(order.createdAt)}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}