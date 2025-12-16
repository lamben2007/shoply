'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import CartAction from '@/components/CartAction';
import { useProductCartActions } from '@/hooks/useProductCartActions';

// Déclaration des props attendues par ProductCard
type Props = {
    product: Product;
};

export default function ProductCard({ product }: Props) {
    // Custom hook factorisé qui centralise toute la logique panier
    // Fournit l'item du panier lié au produit, et les handlers pour les actions
    const {
        cartItem,
        handleAddToCart,
        handleRemoveToCart,
        handleChangeQuantity
    } = useProductCartActions(product);

    // Rendu principal du composant
    return (
        <div className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow duration-200">
            {/* Affichage de l’image produit via next/image */}
            <div className="relative w-full h-64 mb-4">
                <Image
                    src={product.imagePreview}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="rounded-lg object-cover"
                />
            </div>

            {/* Informations sur le produit */}
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p>{product.id}</p>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-lg font-bold mb-4">{product.price.toFixed(2)} €</p>

            {/* Action row : Lien vers la fiche + gestion du panier */}
            <div className="flex justify-between items-center">
                {/* Lien vers la page de détails produit */}
                <Link
                    href={`/products/${product.slug}`}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                >
                    Voir
                </Link>

                {/* Composant d'action panier, entièrement contrôlé par logique du hook */}
                <CartAction
                    quantity={cartItem?.quantity}          // Quantité dans le panier (undefined si non ajouté)
                    onAdd={handleAddToCart}                // Handler pour ajouter le produit
                    onRemove={handleRemoveToCart}          // Handler pour retirer le produit
                    onChangeQuantity={handleChangeQuantity} // Handler pour modifier la quantité
                />
            </div>
        </div>
    );
}
