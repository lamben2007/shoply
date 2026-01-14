import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingCart } from "lucide-react";


export default function CartIcon() {
  
  // Total des articles du panier : somme des quantités, pas que le nombre de lignes !
  const itemCount = useCartStore(
    state => state.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <Link href="/cart" className="relative inline-block">
      <ShoppingCart />
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