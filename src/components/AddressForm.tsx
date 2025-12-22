import { useState } from "react";
import type { Address } from "@/types/address";

/**
 * Props pour le composant AddressForm.
 */
interface AddressFormProps {
    initialAddress?: Partial<Address>;
    onSubmit: (address: Partial<Address>) => void;
    onCancel: () => void;
}

/**
 * Formulaire d'édition ou création d'une adresse.
 *
 * @param initialAddress Adresse initiale à éditer/préremplir (optionnelle, partielle).
 * @param onSubmit Callback appelée lors de la validation du formulaire avec la nouvelle adresse.
 * @param onCancel Callback appelée lors de l'annulation de la modification/création d'adresse.
 * @returns Le composant formulaire d'adresse.
 */
export default function AddressForm({ initialAddress = {}, onSubmit, onCancel }: AddressFormProps) {
    
    const [form, setForm] = useState<Partial<Address>>({
        name: '',
        street: '',
        zip: '',
        city: '',
        country: '',
        complement: '',
        ...initialAddress,
    });

    /**
     * Met à jour le formulaire local selon la saisie utilisateur.
     * @param e L'événement de changement de champ (champ input).
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    /**
     * Gère la soumission du formulaire, appelle le callback parent avec la nouvelle adresse.
     * @param e L'événement de soumission du formulaire.
     */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                required
                value={form.name || ''}
                onChange={handleChange}
                placeholder="Nom du destinataire"
                style={{ marginBottom: 8, width: "100%" }}
            />
            <input
                name="street"
                required
                value={form.street || ''}
                onChange={handleChange}
                placeholder="Adresse"
                style={{ marginBottom: 8, width: "100%" }}
            />
            <input
                name="complement"
                value={form.complement || ''}
                onChange={handleChange}
                placeholder="Complément d'adresse"
                style={{ marginBottom: 8, width: "100%" }}
            />
            <input
                name="zip"
                required
                value={form.zip || ''}
                onChange={handleChange}
                placeholder="Code postal"
                style={{ marginBottom: 8, width: "100%" }}
            />
            <input
                name="city"
                required
                value={form.city || ''}
                onChange={handleChange}
                placeholder="Ville"
                style={{ marginBottom: 8, width: "100%" }}
            />
            <input
                name="country"
                required
                value={form.country || ''}
                onChange={handleChange}
                placeholder="Pays"
                style={{ marginBottom: 8, width: "100%" }}
            />

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
                <button type="button" onClick={onCancel}>Annuler</button>
                <button type="submit">Enregistrer</button>
            </div>
        </form>
    );
}