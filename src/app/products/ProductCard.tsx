'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { Product } from '@/types/product'
import { toast } from 'sonner';

type Props = {
    product: Product;
};

export default function ProductCard({ product }: Props) {

    //
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1,
        });
        toast.success('Produit ajouté au panier !');
    };

    return (
        <div className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow duration-200">
            <div className="relative w-full h-64 mb-4">
                <Image
                    src={product.imagePreview}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="rounded-lg object-cover"
                />
            </div>
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p>{product.id}</p>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-lg font-bold mb-4">{product.price.toFixed(2)} €</p>
            <div className="flex justify-between items-center">
                <Link
                    href={`/products/${product.slug}`}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                >
                    Voir
                </Link>
                <button
                    onClick={handleAddToCart}
                    className={`px-4 py-2 rounded text-white font-semibold ${product.stock > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                        } transition-colors`}
                    disabled={product.stock === 0}
                >
                    Ajouter
                </button>
            </div>
        </div>
    );
}
