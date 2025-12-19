import { CartItem } from '@/types/cart';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware'

type CartState = {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    getItemById: (id: string) => CartItem | undefined;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    total: () => number;
};

export const useCartStore = create<CartState>()(
    devtools(

        (set, get) => ({
            items: [],

            getItemById: (id) => {
                return get().items.find((item) => item.productId === id);
            },

            addItem: (item) => {
                const existing = get().items.find((i) => i.productId === item.productId);
                if (existing) {
                    set({
                        items: get().items.map((i) =>
                            i.productId === item.productId ? { ...i, quantity: i.quantity + item.quantity } : i
                        ),
                    });
                } else {
                    set({ items: [...get().items, item] });
                }
            },

            removeItem: (id) => {
                set({ items: get().items.filter((i) => i.productId !== id) });
            },

            updateQuantity: (id, quantity) => {
                set({
                    items: get().items.map((i) =>
                        i.productId === id ? { ...i, quantity: quantity } : i
                    ),
                });
            },

            clearCart: () => set({ items: [] }),

            total: () => {
                return get().items.reduce(
                    (acc, i) => acc + i.price * i.quantity, 0
                );
            },
        }),

        {
            name: "ProductStore",
            enabled: process.env.NODE_ENV === "development"
        }

    ));