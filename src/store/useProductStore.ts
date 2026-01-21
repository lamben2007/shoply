import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Product } from '@/types/product'

/**
 * Store Zustand pour la gestion du catalogue produits.
 *
 * Gère la liste des produits (`products`), l’état de chargement/erreur (`loading`, `error`)
 * et expose une méthode asynchrone `fetchProducts` pour récupérer les produits depuis l’API.
 *
 * @typedef ProductStore
 * @property {Product[]} products - Liste de tous les produits chargés
 * @property {boolean} loading - Indique si la récupération des produits est en cours
 * @property {string | null} error - Message d'erreur si la récupération échoue
 * @property {() => Promise<void>} fetchProducts - Fonction asynchrone pour récupérer les produits via `/api/products`
 */
type ProductStore = {
    products: Product[];            // Liste des produits chargés
    loading: boolean;               // Indicateur de chargement en cours
    error: string | null;           // Erreur (ou null)
    fetchProducts: () => Promise<void>; // Fonction pour charger les produits
};

/**
 * useProductStore : Store Zustand pour gérer les produits du catalogue.
 * Fournit accès/gestion état produits, état de chargement, message d'erreur et chargement API.
 */
export const useProductStore = create<ProductStore>()(
    devtools((set) => ({
        products: [],       // Initialisation : catalogue vide
        loading: false,     // Pas de chargement au départ
        error: null,        // Pas d’erreur au départ

        /**
         * Récupère les produits via `/api/products`.
         * Met à jour l’état `products`, `loading` et `error` en conséquence.
         */
        fetchProducts: async () => {
            // Débute le chargement, reset l’erreur
            set({ loading: true, error: null });

            try {
                // Appel API
                const res = await fetch("/api/products");
                if (!res.ok) throw new Error("Erreur chargement produits");

                // Extraction des produits depuis la réponse
                const data = await res.json();
                set({
                    products: data.products as Product[],
                    loading: false
                });

            } catch (err: unknown) {
                // Gestion de l’erreur + arrêt du chargement
                const message = err instanceof Error ? err.message : String(err)
                set({
                    error: message,
                    loading: false,
                });
            }
        },
    }))
);
