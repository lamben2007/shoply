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


/**
 * Composant React affichant la liste des commandes de l'utilisateur connecté.
 * Récupère les données via une requête vers /api/orders et affiche chaque commande sous forme de carte.
 * Affiche une gestion visuelle pour le chargement, les erreurs et l'absence de commande.
 *
 * @returns Liste des commandes ou message approprié.
 */
export default function OrdersList() {

    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        /**
        * Récupère la liste des commandes utilisateur via l'API.
        * Gère les cas d'erreur et l'état de chargement.
        */
        async function fetchOrders() {
            try {
                const res = await fetch("/api/orders");
                if (res.status === 401) {
                    setError("Vous devez être authentifié pour accéder à vos commandes.");
                    setOrders([]); 
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
        <div className="min-h-screen flex items-start justify-center bg-gray-50">
            <div className="w-full max-w-xl bg-white rounded-xl shadow-xl p-8">
                <h1 className="text-2xl font-bold mb-6 text-center">Mes commandes</h1>
                {orders.length === 0 ? (
                    <p className="text-gray-500 text-center">Aucune commande pour l’instant.</p>
                ) : (
                    <ul className="space-y-4">
                        {orders.map(order => (
                            <li key={order.id}>
                                <Link
                                    href={`/orders/${order.id}`}
                                    className="flex items-center justify-between px-5 py-4 bg-gray-100 rounded-lg hover:bg-indigo-50 transition group shadow-sm"
                                >
                                    <span className="text-lg font-mediumgroup-hover:underline">
                                        Commande du {formatDateFr(order.createdAt)}
                                    </span>
                                    <span className="ml-3 inline-block bg-indigo-600 text-white text-xs rounded px-2 py-1 group-hover:bg-indigo-700 transition">
                                        Voir
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}