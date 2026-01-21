import { useCartStore } from '@/store/useCartStore'
import { toast } from 'sonner'
import { Product } from '@/types/product'

/**
 * Hook personnalisé pour gérer les actions liées à un produit dans le panier.
 *
 * Fournit des fonctions utilitaires permettant d'ajouter, retirer ou modifier
 * la quantité d'un produit spécifique dans le panier, ainsi que l'accès à
 * l'éventuel item déjà présent en panier.
 *
 * Affiche également une notification adaptée à chaque action via `toast`.
 *
 * @param product Le produit concerné par les actions panier
 * @returns Un objet contenant :
 *  - cartItem: l'item du panier ou undefined si absent
 *  - handleAddToCart: fonction d'ajout au panier
 *  - handleRemoveToCart: fonction de retrait du panier
 *  - handleChangeQuantity: fonction pour changer la quantité
 */
export function useProductCartActions(product: Product) {

    // Récupère les méthodes du store pour manipuler le panier
    const addItem = useCartStore(state => state.addItem);
    const removeItem = useCartStore(state => state.removeItem);
    const updateQuantity = useCartStore(state => state.updateQuantity);

    // Recherche l'item du panier correspondant à ce produit (si déjà présent)
    const cartItem = useCartStore(state =>
        state.items.find(item => item.productId === product.id)
    );

    /**
     * Ajoute le produit au panier avec quantité 1, puis affiche un toast.
     */
    const handleAddToCart = () => {
        addItem({
            productId: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1,
        });
        toast.success('Produit ajouté au panier !');
    };

    /**
     * Retire le produit du panier, puis affiche un toast.
     */
    const handleRemoveToCart = () => {
        removeItem(product.id);
        toast.success('Produit retiré du panier !');
    };

    /**
     * Modifie la quantité du produit dans le panier, puis affiche un toast.
     * @param newQuantity Nouvelle quantité à définir
     */
    const handleChangeQuantity = (newQuantity: number) => {
        updateQuantity(product.id, newQuantity);
        toast.success('Quantité modifiée dans le panier !');
    };

    // Expose l'item de panier (si trouvé) et les handlers d'action
    return {
        cartItem,
        handleAddToCart,
        handleRemoveToCart,
        handleChangeQuantity,
    }
}