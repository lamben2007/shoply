import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingCart } from "lucide-react";

/**
 * Icône du panier d'achat affichée dans le header ou la navigation.
 *
 * Affiche une icône de chariot avec, si le panier a des articles,
 * un badge signalant le total cumulé des quantités.
 *
 * @returns Icône du panier avec badge quantité si > 0
 */
export default function CartIcon() {

  // Récupération du total d'articles actuellement dans le panier
  // (on somme les quantités, pas le nombre de lignes !)
  const itemCount = useCartStore(
    state => state.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <Link href="/cart" className="relative inline-block">
      {/* Icône chariot / panier (lib lucide-react) */}
      <ShoppingCart />
      {/* Badge d'alerte si au moins un article dans le panier */}
      {itemCount > 0 && (
        <span
          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold border border-white shadow"
          aria-label={`Panier : ${itemCount} articles`}
        >
          {itemCount}
        </span>
      )}
    </Link>
  );
}