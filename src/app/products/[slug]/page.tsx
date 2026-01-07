"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "@/store/useProductStore";
import ProductDetails from "./ProductDetails";
import { useParams } from "next/navigation";
import { Product } from "@/types/product"

export default function ProductPage() {
    
    const { slug } = useParams<{ slug: string }>();
    const { products } = useProductStore();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Vérifier si le produit est déjà dans le store
        const existing = products.find((p) => p.slug === slug);
        if (existing) {
            setProduct(existing);
            setLoading(false);
            return;
        }

        // Sinon fetch via API
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/products/${slug}`);
                if (!res.ok) throw new Error("Produit introuvable");
                const data: { product: Product } = await res.json();
                setProduct(data.product);

            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : "Erreur inconnue";
                setError(message);
                
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug, products]);

    if (loading) return <p>Chargement...</p>;
    if (error || !product) return <p className="text-red-500">{error ?? "Produit introuvable"}</p>;

    return <ProductDetails product={product} />;
}
