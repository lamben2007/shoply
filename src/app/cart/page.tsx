'use client';

import VerticalMenuCart from '@/components/VerticalMenuCart';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

export default function CartPage() {

    //
    const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();

    if (items.length === 0) {
        return (
            <div className='flex'>
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


    //
    return (
        <div className='flex'>

            <VerticalMenuCart />

            <div className="max-w-4xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold mb-8">Panier</h1>
                <div className="space-y-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                            <div className="w-24 h-24 relative">
                                <Link href={`/products/${item.slug}`}>
                                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover rounded" unoptimized />
                                </Link>
                            </div>

                            <div className="flex-1">
                                <h2 className="font-semibold">{item.name}</h2>
                                <p>{item.price.toFixed(2)} €</p>
                                <input
                                    type="number"
                                    min={1}
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                                    className="border rounded px-2 py-1 w-20 mt-1"
                                />
                            </div>

                            <button
                                onClick={() => {
                                    removeItem(item.id)
                                    toast.success('Produit supprimé au panier !');
                                }}
                                className="text-red-600 hover:underline"
                            >
                                Supprimer
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-right">
                    <p className="text-xl font-bold mb-4">Total : {total().toFixed(2)} €</p>
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
                </div>
            </div>

        </div>
    );
}
