import React from 'react';


//
type CartActionProps = {
  quantity: number | undefined;
  onAdd: () => void;
  onRemove: () => void;
  onChangeQuantity: (newQuantity: number) => void;
}

//
function CartAction({ quantity, onAdd, onRemove, onChangeQuantity }: CartActionProps) {

  if (!quantity || quantity === 0) {
    return (
      <button onClick={onAdd} aria-label="Ajouter au panier">
        {/* Icône d'ajout, à remplacer par ta lib d'icônes préférée */}
        <span>➕</span> Ajouter
      </button>
    );
  }

  return (
    <div className="cart-action">
      <input
        type="number"
        min={1}
        max={10}
        value={quantity}
        onChange={e => {
          // On coupe la valeur saisie si elle dépasse 10
          let nextValue = Number(e.target.value);
          if (nextValue > 10) nextValue = 10;
          else if (nextValue < 1) nextValue = 1;
          onChangeQuantity(nextValue);
        }}
        aria-label="Quantité"
        // style={{ width: 50, textAlign: 'center' }}
        className='w-12 text-center'
      />
      <button onClick={onRemove} aria-label="Supprimer du panier" style={{ marginLeft: 8 }}>
        {/* Icône de suppression, à remplacer aussi */}
        <span>🗑️</span>
      </button>
    </div>
  );
}

export default CartAction;