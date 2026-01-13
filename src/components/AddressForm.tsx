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
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-gray-50 rounded-xl shadow-lg border border-gray-200"
        >
            <h2 className="mb-6 text-xl font-semibold text-gray-800">
                {initialAddress ? "Modifier l'adresse" : "Nouvelle adresse"}
            </h2>
            <div className="mb-4">
                <label htmlFor="name" className="block font-medium mb-1 text-gray-700">
                    Nom du destinataire
                </label>
                <input
                    id="name"
                    name="name"
                    required
                    value={form.name || ''}
                    onChange={handleChange}
                    placeholder="Nom du destinataire"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="street" className="block font-medium mb-1 text-gray-700">
                    Adresse
                </label>
                <input
                    id="street"
                    name="street"
                    required
                    value={form.street || ''}
                    onChange={handleChange}
                    placeholder="Adresse"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="complement" className="block font-medium mb-1 text-gray-700">
                    Complément d&apos;adresse
                </label>
                <input
                    id="complement"
                    name="complement"
                    value={form.complement || ''}
                    onChange={handleChange}
                    placeholder="Complément d'adresse"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                />
            </div>
            <div className="flex gap-4 mb-4">
                <div className="w-1/3">
                    <label htmlFor="zip" className="block font-medium mb-1 text-gray-700">
                        Code postal
                    </label>
                    <input
                        id="zip"
                        name="zip"
                        required
                        value={form.zip || ''}
                        onChange={handleChange}
                        placeholder="Code postal"
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    />
                </div>
                <div className="w-2/3">
                    <label htmlFor="city" className="block font-medium mb-1 text-gray-700">
                        Ville
                    </label>
                    <input
                        id="city"
                        name="city"
                        required
                        value={form.city || ''}
                        onChange={handleChange}
                        placeholder="Ville"
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    />
                </div>
            </div>
            <div className="mb-6">
                <label htmlFor="country" className="block font-medium mb-1 text-gray-700">
                    Pays
                </label>
                <input
                    id="country"
                    name="country"
                    required
                    value={form.country || ''}
                    onChange={handleChange}
                    placeholder="Pays"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                />
            </div>
            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="py-2 px-5 rounded-md border border-gray-300 bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    className="py-2 px-5 rounded-md bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
                >
                    Enregistrer
                </button>
            </div>
        </form>
    );
}