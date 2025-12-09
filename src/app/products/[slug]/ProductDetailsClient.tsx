'use client';

import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { Product } from '@/types/product';



type Props = {
    product: Product;
};

export default function ProductDetailsClient({ product }: Props) {

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
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="relative w-full md:w-1/2 h-80 md:h-[400px]">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover rounded-lg"
                        unoptimized
                    />
                </div>

                <div className="md:w-1/2 flex flex-col">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-2xl font-bold mb-4">{product.price.toFixed(2)} €</p>
                    <p className="mb-6">
                        Stock:{' '}
                        <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                            {product.stock > 0 ? product.stock : 'Rupture'}
                        </span>
                    </p>

                    <button
                        onClick={handleAddToCart}
                        className={`px-6 py-3 rounded-lg text-white font-semibold ${product.stock > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                            } transition-colors`}
                        disabled={product.stock === 0}
                    >
                        Ajouter au panier
                    </button>
                </div>
            </div>
        </div>
    );
}
