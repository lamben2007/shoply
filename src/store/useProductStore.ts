import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Product } from '@/types/product'

type ProductStore = {
    products: Product[];
    loading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
};

export const useProductStore = create<ProductStore>()(
    devtools((set) => ({
        products: [],
        loading: false,
        error: null,

        fetchProducts: async () => {
            set({ loading: true, error: null });

            try {
                const res = await fetch("/api/products");
                if (!res.ok) throw new Error("Erreur chargement produits");

                const data = await res.json();
                set({ products: data.products as Product[], loading: false });

            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : String(err)
                set({
                    error: message,
                    loading: false,
                });
            }
        },
    }))
);


