import { useCartStore } from '@/store/useCartStore'
import { toast } from 'sonner'
import { Product } from '@/types/product'

export function useProductCartActions(product: Product) {


    const addItem = useCartStore(state => state.addItem);
    const removeItem = useCartStore(state => state.removeItem);
    const updateQuantity = useCartStore(state => state.updateQuantity);
    const cartItem = useCartStore(state => state.items.find(item => item.productId === product.id));

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

    const handleRemoveToCart = () => {
        removeItem(product.id)
        toast.success('Produit retiré du panier !')
    }

    const handleChangeQuantity = (newQuantity: number) => {
        updateQuantity(product.id, newQuantity);
        toast.success('Quantité modifiée dans le panier !');
    };

    return {
        cartItem,
        handleAddToCart,
        handleRemoveToCart,
        handleChangeQuantity,
    }
}