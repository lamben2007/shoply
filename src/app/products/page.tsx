"use client";

import { useEffect, useRef } from "react";
import { useProductStore } from "@/store/useProductStore";
import ProductCard from "./ProductCard";

export default function ProductsPage() {

    //
    const { products, fetchProducts, loading, error } = useProductStore();
    const loaderRef = useRef<HTMLParagraphElement>(null);

    //
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);


    //
    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8">Nos Produits</h1>

            {/* Loader avec transition d'opacité et délai via CSS */}
            <p
                ref={loaderRef}
                className={`transition-opacity duration-200 ${loading ? "opacity-100 delay-400" : "opacity-0 delay-0"
                    }`}
            >
                Chargement...
            </p>

            {!loading && error && <p className="text-red-500">{error}</p>}
            {!loading && !products.length && <p>Aucun produit trouvé</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}