'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

type Product = {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    price: number;
    imageUrl: string;
    stock: number;
};

type Props = {
    product: Product;
};

export default function ProductCardClient({ product }: Props) {
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
    };

    return (
        <div className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow duration-200">
            <div className="relative w-full h-64 mb-4">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover rounded"
                    unoptimized
                />
            </div>
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
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
