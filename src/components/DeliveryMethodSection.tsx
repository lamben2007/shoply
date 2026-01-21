// DeliveryMethodSection.tsx
import React, { useEffect, useState } from 'react';

/**
 * Type décrivant une option de livraison.
 * 
 * @property {string} id Identifiant unique de l'option
 * @property {string} label Nom de l'option affichée à l'utilisateur
 * @property {number} cost Coût de la livraison (en euros)
 * @property {string} delay Délai de livraison estimé
 * @property {string} [description] Description optionnelle affichée à côté de l'option
 */
type DeliveryOption = {
    id: string;
    label: string;
    cost: number;
    delay: string;
    description?: string;
};

// Liste statique de toutes les options de livraison proposées
const deliveryOptions: DeliveryOption[] = [
    {
        id: 'standard',
        label: 'Standard',
        cost: 0,
        delay: '3-5 jours ouvrés',
    },
    {
        id: 'express',
        label: 'Express',
        cost: 4.99,
        delay: '1-2 jours ouvrés',
    },
    {
        id: 'relais',
        label: 'Point relais',
        cost: 2.99,
        delay: '2-4 jours ouvrés',
        description: '(choix du point à l’étape suivante)',
    },
];

/**
 * Props attendues pour le composant DeliveryMethodSection.
 * 
 * @property {function} [onSelect] Callback appelée lors du choix ou changement de mode de livraison
 */
interface DeliveryMethodSectionProps {
    onSelect?: (option: DeliveryOption) => void;
}

/**
 * Composant proposant un formulaire de sélection du mode de livraison.
 *
 * Affiche la liste des modes de livraison disponibles sous forme de boutons radio
 * et remonte l'option sélectionnée via une callback `onSelect` si fournie.
 *
 * @param  props Props optionnelles dont la callback
 * @returns Le formulaire de sélection de livraison
 */
const DeliveryMethodSection = ({ onSelect }: DeliveryMethodSectionProps) => {

    // État local, identifiant de l'option actuellement sélectionnée
    const [selected, setSelected] = useState<string>('standard');

    // Effet déclenché au montage ou à chaque changement de sélection/handler : 
    // notifie l'option sélectionnée au parent via onSelect
    useEffect(() => {
        if (onSelect) {
            const found = deliveryOptions.find(opt => opt.id === selected);
            if (found) onSelect(found);
        }
    }, [onSelect, selected]);

    /**
     * Handler de changement de sélection (radio button).
     *
     * @param {React.ChangeEvent<HTMLInputElement>} event L'événement du changement de choix
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelected(event.target.value);
        if (onSelect) {
            const found = deliveryOptions.find(opt => opt.id === event.target.value);
            if (found) onSelect(found);
        }
    };

    return (
        <form>
            <h2 className='font-bold text-2xl mb-2'>Choisissez votre mode de livraison</h2>
            {/* Affichage de chaque option de livraison sous forme de ligne radio */}
            {deliveryOptions.map(option => (
                <label
                    key={option.id}
                    className="mb-2 cursor-pointer p-3 rounded border border-gray-200 hover:bg-gray-50 flex items-center gap-3 transition"
                >
                    <input
                        type="radio"
                        name="livraison"
                        value={option.id}
                        checked={selected === option.id}
                        onChange={handleChange}
                        className="mr-3 accent-blue-600"
                    />
                    <div>
                        <span className="font-semibold">{option.label}</span>
                        <span className="mx-2 text-gray-500">—</span>
                        <span className="font-medium">{option.cost === 0 ? 'Gratuit' : `${option.cost.toFixed(2)}€`}</span>
                        <span className="mx-2 text-gray-500">—</span>
                        <span>{option.delay}</span>
                        {option.description && (
                            <span className="ml-3 italic text-gray-400">
                                {option.description}
                            </span>
                        )}
                    </div>
                </label>
            ))}
        </form>
    );
};

export default DeliveryMethodSection;