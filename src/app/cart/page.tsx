'use client';

import VerticalMenuCart from '@/components/VerticalMenuCart';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { CreditCard } from 'lucide-react';

/**
 * Page du panier :
 * Affiche les produits dans le panier de l'utilisateur, permet de modifier la quantité,
 * retirer un produit ou vider entièrement le panier. 
 * Un lien permet également d’aller vers la page de paiement.
 *
 * @component
 */
export default function CartPage() {

    // Récupère l'état du panier grâce au store global
    const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();

    // Affiche un message si le panier est vide
    if (items.length === 0) {
        return (
            <div className='flex flex-col md:flex-row'>
                <VerticalMenuCart />
                <div className="max-w-4xl mx-auto px-4 py-10">
                    <h1 className="text-3xl font-bold mb-4">Votre panier est vide</h1>
                    <Link href="/products" className="text-blue-600 hover:underline">
                        Voir les produits
                    </Link>
                </div>
            </div>
        );
    }


    // Affichage du panier s'il contient des articles
    return (
        <div className='flex flex-col md:flex-row'>

            {/* Menu latéral spécifique au panier */}
            <VerticalMenuCart />

            <div className="max-w-4xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold mb-8">Panier</h1>
                <div className="space-y-6">
                    {/* Liste des articles du panier */}
                    {items.map((item) => (
                        <div key={item.productId} className="flex items-center gap-4 border-b pb-4">
                            {/* Visuel du produit */}
                            <div className="w-24 h-24 relative">
                                <Link href={`/products/${item.slug}`}>
                                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover rounded" unoptimized />
                                </Link>
                            </div>

                            {/* Détails et gestion de la quantité */}
                            <div className="flex-1">
                                <h2 className="font-semibold">{item.name}</h2>
                                <p>{item.price.toFixed(2)} €</p>
                                <input
                                    type="number"
                                    min={1}
                                    value={item.quantity}
                                    // Modification de la quantité du produit
                                    onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
                                    className="border rounded px-2 py-1 w-20 mt-1"
                                />
                            </div>

                            {/* Suppression d'un article */}
                            <button
                                onClick={() => {
                                    removeItem(item.productId)
                                    toast.success('Produit supprimé au panier !');
                                }}
                                className="text-red-600 hover:underline"
                            >
                                Supprimer
                            </button>
                        </div>
                    ))}
                </div>

                {/* Récapitulatif et actions du panier */}
                <div className="mt-8 text-right">
                    <p className="text-xl font-bold mb-4">Total : {total().toFixed(2)} €</p>

                    <div className='flex flex-col gap-4'>
                        {/* Bouton pour vider le panier, utilise une confirmation toast */}
                        <button
                            onClick={() => {
                                toast.warning(
                                    "Voulez-vous vraiment vider le panier ?",
                                    {
                                        duration: 10000, // 10 secondes
                                        action: {
                                            label: "Confirmer",
                                            onClick: () => {
                                                clearCart();
                                                toast.success("Panier vidé !");
                                            },
                                        }
                                    }
                                );
                            }}
                            className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Vider le panier
                        </button>

                        {/* Lien vers la page de finalisation de commande */}
                        <Link href={"/checkout"}
                            className="flex items-center justify-center px-6 py-3 bg-blue-300 hover:bg-blue-200 transition-colors rounded-lg mb-1">
                            <CreditCard className="w-5 h-5 mr-3" />
                            <span>PASSER COMMANDE</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
