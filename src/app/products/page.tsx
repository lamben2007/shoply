"use client";

import { useEffect, useRef } from "react";
import { useProductStore } from "@/store/useProductStore";
import ProductCard from "./ProductCard";

/**
 * Page d'affichage de la liste des produits.
 *
 * Récupère les produits via le store global et affiche
 * une liste de cartes produit, ainsi que la gestion du chargement et des erreurs.
 *
 * @returns  Le composant principal pour la page de produits.
 */
export default function ProductsPage() {

    // Récupération des produits, loading, error et fonction de fetch depuis le store
    const { products, fetchProducts, loading, error } = useProductStore();
    // Référence pour le paragraphe du loader (optionnel pour accessibilité ou effets)
    const loaderRef = useRef<HTMLParagraphElement>(null);

    // Lance la récupération des produits lors du montage du composant
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            {/* Titre de la page */}
            <h1 className="text-3xl font-bold mb-8">Nos Produits</h1>

            {/* Loader avec transition d'opacité et délai via CSS */}
            <p
                ref={loaderRef}
                className={`transition-opacity duration-200 ${loading ? "opacity-100 delay-400" : "opacity-0 delay-0"
                    }`}
            >
                Chargement...
            </p>

            {/* Affichage d'une erreur si besoin */}
            {!loading && error && <p className="text-red-500">{error}</p>}
            {/* Affiche un message si la liste est vide */}
            {!loading && !products.length && <p>Aucun produit trouvé</p>}

            {/* Grille d'affichage des cartes produit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}