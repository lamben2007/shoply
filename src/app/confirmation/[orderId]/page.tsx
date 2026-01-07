"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/api/orders";
import { OrderResponse } from "@/types/order";
import { useRouter } from "next/navigation";

/**
 * Page de confirmation de commande :
 * - Récupère l'identifiant de commande via l'URL
 * - Interroge l'API pour obtenir les infos de commande
 * - Affiche un état de chargement, d'erreur, ou le détail de la commande passée
 *
 * @returns Rendu de la page de confirmation, ou messages de chargement/erreur
 */
export default function ConfirmationPage() {

    const router = useRouter();

    // Récupère le paramètre d'URL 'orderId'
    const { orderId } = useParams<{ orderId: string }>();

    // States pour la gestion de l'état de chargement, d'erreur et de la commande
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [order, setOrder] = useState<OrderResponse | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true);
            try {
                const myOrder = await getOrderById(orderId);
                if (!myOrder) throw new Error("Commande introuvable");
                setOrder(myOrder);
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : "Erreur inconnue";
                setError(message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [orderId]);

    // Affichage du message de chargement
    if (loading) {
        return (
            <main className="max-w-xl mx-auto py-8 px-4">
                <p>Chargement de votre commande...</p>
            </main>
        );
    }

    // Affichage en cas d'erreur lors de la récupération
    if (error) {
        return (
            <main className="max-w-xl mx-auto py-8 px-4">
                <p className="text-red-500">Erreur : {error}</p>
            </main>
        );
    }

    if (!order) {
        return notFound();
    }

    return (
        <main className="max-w-xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-2">Thank you for your order!</h1>
            <p className="mb-4">Order number: <b>{order.id}</b></p>
            {/* Liste des articles de la commande */}
            <ul className="mb-4 bg-gray-100 p-4 rounded-lg">
                {order.items.map(item => (
                    <li key={item.productId} className="mb-1 last:mb-0">
                        {item.name} × {item.quantity} — {item.price}€ each
                    </li>
                ))}
            </ul>
            <p className="font-bold mb-8">Total: <b>{order.total} €</b></p>

            {/* Bouton de retour à l'accueil, navigation client-side */}
            <div className="mt-6 flex gap-4">
                <button
                    className="bg-blue-700 hover:bg-blue-800 text-white rounded px-6 py-3 font-bold transition-colors"
                    onClick={() => router.push("/")}
                >
                    Retour à l&apos;accueil
                </button>
            </div>
            <p className="mt-8 text-gray-400 italic">
                Cette page est un exemple pour portfolio. Aucune commande réelle n’est passée.
            </p>
        </main>
    );
}