import { CartItem } from '@/types/cart';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'

/**
 * Interface de l'état du panier (CartState).
 * Définit les propriétés et méthodes de gestion du panier pour zustand.
 */
type CartState = {
    items: CartItem[]; // Tableau des items présents dans le panier
    addItem: (item: CartItem) => void; // Ajoute un nouvel item ou augmente sa quantité si déjà présent
    getItemById: (id: string) => CartItem | undefined; // Récupère un item par son productId
    removeItem: (id: string) => void; // Supprime un item du panier par son productId
    updateQuantity: (id: string, quantity: number) => void; // Modifie la quantité d'un item
    clearCart: () => void; // Vide le panier
    total: () => number; // Calcule le total du panier (prix * quantité)
};

/**
 * Hook Zustand de gestion du panier (useCartStore)
 * 
 * Fournit toutes les actions (CRUD, total) et un état persistant (localStorage),
 * compatible avec l'outil de développement Zustand (`devtools` activés seulement en development).
 * 
 * Les items sont identifiés par leur `productId`.
 * 
 * @returns Un store Zustand typé CartState
 */
export const useCartStore = create<CartState>()(
    devtools(
        persist(
            // Définition de l'état & des méthodes
            (set, get) => ({
                items: [],

                /**
                 * Récupère un item du panier par son ID produit.
                 */
                getItemById: (id) => {
                    return get().items.find((item) => item.productId === id);
                },

                /**
                 * Ajoute un item au panier, ou incrémente la quantité si déjà existant.
                 */
                addItem: (item) => {
                    const existing = get().items.find((i) => i.productId === item.productId);
                    if (existing) {
                        // Si item présent, augmente la quantité
                        set({
                            items: get().items.map((i) =>
                                i.productId === item.productId
                                    ? { ...i, quantity: i.quantity + item.quantity }
                                    : i
                            ),
                        });
                    } else {
                        // Sinon, ajoute comme nouvel item
                        set({ items: [...get().items, item] });
                    }
                },

                /**
                 * Retire un item du panier par son ID.
                 */
                removeItem: (id) => {
                    set({ items: get().items.filter((i) => i.productId !== id) });
                },

                /**
                 * Met à jour la quantité d'un item.
                 */
                updateQuantity: (id, quantity) => {
                    set({
                        items: get().items.map((i) =>
                            i.productId === id
                                ? { ...i, quantity: quantity }
                                : i
                        ),
                    });
                },

                /**
                 * Vide entièrement le panier.
                 */
                clearCart: () => set({ items: [] }),

                /**
                 * Calcule le total du panier (somme prix x quantité de chaque item).
                 */
                total: () => {
                    return get().items.reduce(
                        (acc, i) => acc + i.price * i.quantity, 0
                    );
                },
            }),
            {
                // Nom de la clé locale utilisée pour persister le panier
                name: "cart-storage",
            }
        ),
        {
            // Devtools activés seulement en environnement development
            name: "ProductStore",
            enabled: process.env.NODE_ENV === "development"
        }
    )
);