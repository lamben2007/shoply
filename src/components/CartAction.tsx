import React from 'react';

//
// Propriétés attendues pour le composant CartAction
/**
 * @property {number | undefined} quantity Quantité actuelle dans le panier pour le produit
 * @property {() => void} onAdd Fonction appelée lors de l'ajout au panier
 * @property {() => void} onRemove Fonction appelée lors de la suppression du panier
 * @property {(newQuantity: number) => void} onChangeQuantity Fonction appelée lors du changement de quantité
 */
type CartActionProps = {
  quantity: number | undefined;
  onAdd: () => void;
  onRemove: () => void;
  onChangeQuantity: (newQuantity: number) => void;
}

/**
 * Composant d'action pour gérer l'ajout, la modification ou la suppression
 * d'un produit dans le panier.
 *
 * Affiche soit un bouton d'ajout si la quantité est nulle,
 * soit un champ de saisie de quantité et un bouton de suppression.
 *
 * @param {CartActionProps} props Propriétés d'interaction panier
 * @returns Interface des actions panier pour le produit courant
 */
function CartAction({ quantity, onAdd, onRemove, onChangeQuantity }: CartActionProps) {

  // Si aucune quantité dans le panier, affiche le bouton d'ajout
  if (!quantity || quantity === 0) {
    return (
      <button onClick={onAdd} aria-label="Ajouter au panier">
        {/* Icône d'ajout, à remplacer par une vraie icône si besoin */}
        <span>➕</span> Ajouter
      </button>
    );
  }

  // Si le produit est dans le panier, permet de modifier la quantité ou supprimer
  return (
    <div className="cart-action">
      <input
        type="number"
        min={1}
        max={10}
        value={quantity}
        onChange={e => {
          // On limite la valeur saisie entre 1 et 10
          let nextValue = Number(e.target.value);
          if (nextValue > 10) nextValue = 10;
          else if (nextValue < 1) nextValue = 1;
          onChangeQuantity(nextValue);
        }}
        aria-label="Quantité"
        className='w-12 text-center'
      />
      <button onClick={onRemove} aria-label="Supprimer du panier" style={{ marginLeft: 8 }}>
        {/* Icône de suppression, à remplacer aussi si besoin */}
        <span>🗑️</span>
      </button>
    </div>
  );
}

export default CartAction;