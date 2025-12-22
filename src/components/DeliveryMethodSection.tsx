// DeliveryMethodSection.tsx
import React, { useEffect, useState } from 'react';

type DeliveryOption = {
    id: string;
    label: string;
    cost: number;
    delay: string;
    description?: string;
};

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

interface DeliveryMethodSectionProps {
    onSelect?: (option: DeliveryOption) => void;
}

const DeliveryMethodSection = ({ onSelect }: DeliveryMethodSectionProps) => {

    // const [selected, setSelected] = useState<string>('standard');
    const [selected, setSelected] = useState<string>('standard');



    // Notifier l’option par défaut au parent au montage.
    useEffect(() => {
        if (onSelect) {
            // const found = deliveryOptions.find(opt => opt.id === 'standard');
            const found = deliveryOptions.find(opt => opt.id === selected);
            if (found) onSelect(found);
        }
    }, [onSelect, selected]); // appelé une seule fois au montage


    //
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelected(event.target.value);
        if (onSelect) {
            const found = deliveryOptions.find(opt => opt.id === event.target.value);
            if (found) onSelect(found);
        }
    };

    //
    return (
        <form>
            <h2>Choisissez votre mode de livraison</h2>
            {deliveryOptions.map(option => (
                <label key={option.id} style={{ display: 'block', marginBottom: 8 }}>
                    <input
                        type="radio"
                        name="livraison"
                        value={option.id}
                        checked={selected === option.id}
                        onChange={handleChange}
                    />
                    <strong>{option.label}</strong> — {option.cost === 0 ? 'Gratuit' : `${option.cost.toFixed(2)}€`} — {option.delay}
                    {option.description && (
                        <span style={{ marginLeft: 8, fontStyle: 'italic', color: '#555' }}>
                            {option.description}
                        </span>
                    )}
                </label>
            ))}

        </form>
    );
};

export default DeliveryMethodSection;