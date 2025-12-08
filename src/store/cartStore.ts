import { create } from 'zustand';

export type CartItem = {
    id: string;
    name: string;
    slug: string;
    price: number;
    imageUrl: string;
    quantity: number;
};

type CartState = {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    total: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
    items: [],

    addItem: (item) => {
        const existing = get().items.find((i) => i.id === item.id);
        if (existing) {
            set({
                items: get().items.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                ),
            });
        } else {
            set({ items: [...get().items, item] });
        }
    },

    removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
    },

    updateQuantity: (id, quantity) => {
        set({
            items: get().items.map((i) =>
                i.id === id ? { ...i, quantity: quantity } : i
            ),
        });
    },

    clearCart: () => set({ items: [] }),

    total: () => {
        return get().items.reduce(
            (acc, i) => acc + i.price * i.quantity, 0
        );
    },
}));