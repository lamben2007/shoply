'use client';

import Image from 'next/image';
import { Product } from '@/types/product';
import CartAction from '@/components/CartAction';
import { useProductCartActions } from '@/hooks/useProductCartActions';

/**
 * Propriétés attendues par le composant ProductDetails.
 *
 * @property {Product} product - Le produit à afficher
 */
type Props = {
    product: Product;
};

/**
 * Affiche les détails d'un produit donné et propose des actions d'ajout/retrait
 * au panier.
 *
 * Utilise le hook personnalisé useProductCartActions pour gérer les interactions panier.
 *
 * @param {Props} props Les propriétés du composant, contient le produit à afficher
 * @returns Le composant d'affichage des détails produit
 */
export default function ProductDetails({ product }: Props) {

    // Récupération des méthodes et de l'état panier relatif à ce produit
    const {
        cartItem,
        handleAddToCart,
        handleRemoveToCart,
        handleChangeQuantity
    } = useProductCartActions(product);

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Affichage de l'image produit */}
                <div className="relative w-full md:w-1/2 h-80 md:h-[400px]">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={1200}
                        height={800}
                        className="rounded-xl object-cover"
                    />
                </div>

                <div className="md:w-1/2 flex flex-col">
                    {/* Nom du produit */}
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    {/* Description du produit */}
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    {/* Prix formaté */}
                    <p className="text-2xl font-bold mb-4">{product.price.toFixed(2)} €</p>
                    {/* Stock : indique la quantité disponible ou 'Rupture' */}
                    <p className="mb-6">
                        Stock:{' '}
                        <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                            {product.stock > 0 ? product.stock : 'Rupture'}
                        </span>
                    </p>
                    {/* Composant d'action panier : ajouter, retirer ou changer quantité */}
                    <CartAction
                        quantity={cartItem?.quantity}
                        onAdd={handleAddToCart}
                        onRemove={handleRemoveToCart}
                        onChangeQuantity={handleChangeQuantity}
                    />
                </div>
            </div>
        </div>
    );
}