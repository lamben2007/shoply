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

    const [selected, setSelected] = useState<string>('standard');

    // Notifier l’option par défaut au parent au montage.
    useEffect(() => {
        if (onSelect) {
            const found = deliveryOptions.find(opt => opt.id === selected);
            if (found) onSelect(found);
        }
    }, [onSelect, selected]);

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
            <h2 className='font-bold text-2xl mb-2'>Choisissez votre mode de livraison</h2>
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