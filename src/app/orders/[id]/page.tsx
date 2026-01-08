// src/app/orders/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import type { OrderResponse } from "@/types/order";
import { getOrderById } from "@/lib/api/orders";
import dayjs from "dayjs";
import "dayjs/locale/fr"; // pour affichage en français
import Image from "next/image";
import { useParams } from "next/navigation";
dayjs.locale("fr");

/**
 * Formate une date ISO au format français "DD/MM/YYYY HH:mm".
 *
 * @param isoString - Date au format ISO (ex: "2024-06-09T12:34:56Z")
 * @returns La date formatée en "jour/mois/année heure:minute"
 */
function formatDateFr(isoString: string): string {
    return dayjs(isoString).format("DD/MM/YYYY HH:mm");
}

/**
 * Affiche le détail d'une commande selon son id présent dans l'URL.
 * Gère le chargement, l'erreur, et affiche la liste des articles.
 *
 * Utilise le hook useParams pour récupérer l'identifiant de commande.
 *
 * @component
 */
export default function OrderDetailClientPage() {
    // État de la commande (null si pas encore chargée)
    const [order, setOrder] = useState<OrderResponse | null>(null);
    // État de chargement
    const [loading, setLoading] = useState(true);
    // État d'erreur (chaîne ou null)
    const [error, setError] = useState<string | null>(null);

    // Récupère l'id de la commande depuis l'URL
    const { id } = useParams<{ id: string }>();

    // Pour debug éventuellement
    console.log("id:", id)

    // Effet de chargement au montage (ou si l'id change)
    useEffect(() => {
        async function fetchOrder() {
            setLoading(true);
            setError(null);
            try {
                const fetchedOrder = await getOrderById(id);
                setOrder(fetchedOrder);
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : "Erreur inconnue";
                setError(message)
            } finally {
                setLoading(false);
            }
        }
        fetchOrder();
    }, [id]);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;
    if (!order) return <div>Aucune commande trouvée.</div>;

    return (
        <main>
            {/* Titre principal avec l'identifiant de la commande */}
            <h1 className="text-2xl font-bold mb-4">
                Détail de la commande <span className="text-gray-500">{order.id}</span>
            </h1>
            <section className="mb-6">
                {/* Infos générales de la commande */}
                <div>Statut : <b>{order.status}</b></div>
                <div>Date de création : <b>{formatDateFr(order.createdAt)}</b></div>
                <div>Total : <b>{order.total.toFixed(2)} €</b></div>
                {/* 
                <div>Adresse livraison id : <span className="text-gray-700">{order.shippingId}</span></div>
                <div>Adresse facturation id : <span className="text-gray-700">{order.billingId}</span></div>
                */}
            </section>
            <section>
                <h2 className="text-xl font-semibold mb-2">Articles commandés</h2>
                <ul className="divide-y">
                    {order.items.map((item) => (
                        <li key={item.productId} className="py-3 flex items-center">
                            {/* Affiche une image si présente, avec le composant optimisé Next/Image */}
                            {item.imageUrl && (
                                <Image
                                    src={item.imageUrl}
                                    alt={item.name}
                                    width={64}
                                    height={64}
                                    className="w-16 h-16 object-cover mr-3 rounded"
                                />
                            )}
                            <div>
                                <div className="font-bold">{item.name}</div>
                                <div>Qté : {item.quantity}</div>
                                <div>Prix unitaire : {item.price.toFixed(2)} €</div>
                                <div>Total : {(item.price * item.quantity).toFixed(2)} €</div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}