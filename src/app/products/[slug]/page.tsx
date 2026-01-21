"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "@/store/useProductStore";
import ProductDetails from "./ProductDetails";
import { useParams } from "next/navigation";
import { Product } from "@/types/product"

/**
 * Page de détail d'un produit affiché selon le slug dans l'URL.
 * 
 * Charge le produit depuis le store local ou via une requête API si absent,
 * et gère l'état de chargement ou d'erreur.
 * 
 * @returns Composant React pour la page d'un produit spécifique
 */
export default function ProductPage() {

    // Récupère le paramètre 'slug' de l'URL dynamique
    const { slug } = useParams<{ slug: string }>();
    // Récupère la liste des produits depuis le store Zustand
    const { products } = useProductStore();
    // État local pour le produit à afficher
    const [product, setProduct] = useState<Product | null>(null);
    // État d'affichage du chargement
    const [loading, setLoading] = useState(true);
    // État d'éventuelle erreur
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Vérifie d'abord si le produit est déjà dans le store
        const existing = products.find((p) => p.slug === slug);
        if (existing) {
            setProduct(existing);
            setLoading(false);
            return;
        }

        // Sinon, tente de récupérer le produit via l'API
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/products/${slug}`);
                if (!res.ok) throw new Error("Produit introuvable");
                // On suppose que la réponse contient la clé { product }
                const data: { product: Product } = await res.json();
                setProduct(data.product);

            } catch (err: unknown) {
                // Gestion d'une éventuelle erreur lors du fetch
                const message = err instanceof Error ? err.message : "Erreur inconnue";
                setError(message);

            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug, products]); // Relance l'effet si le slug ou les produits changent

    // Affichage pendant le chargement
    if (loading) return <p>Chargement...</p>;
    // Affiche l'erreur ou un message si le produit est introuvable
    if (error || !product) return <p className="text-red-500">{error ?? "Produit introuvable"}</p>;

    // Affiche les détails du produit si tout va bien
    return <ProductDetails product={product} />;
}