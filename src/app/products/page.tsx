"use client";

import { useEffect } from "react";
import { useProductStore } from "@/store/useProductStore";
import ProductCardClient from "./ProductCardClient";

export default function ProductsPage() {

    //
    const { products, fetchProducts, loading, error } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!products.length) return <p>Aucun produit trouvé</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8">Nos Produits</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {products.map((product) => (
                    <ProductCardClient key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
