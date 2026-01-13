import { useEffect, useState } from 'react';
import { Address } from '@/types/address';
import AddressForm from '@/components/AddressForm';
import Portal from "@/components/Portal";

/**
 * Gestionnaire d'adresses utilisateur : permet d'afficher, créer, modifier, supprimer et définir l'adresse de livraison par défaut.
 *
 * @param onAddressesChanged Callback appelé après modification de la liste d'adresses (création/suppression/mise à jour). Optionnel.
 * @returns Le composant principal de gestion des adresses.
 */
function AddressManager({ onAddressesChanged }: { onAddressesChanged?: () => void }) {

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editAddress, setEditAddress] = useState<Address | null>(null);

    useEffect(() => {
        /**
         * Récupère les adresses à l'initialisation du composant.
         * @returns
         */
        const fetchAddresses = async () => {
            try {
                const res = await fetch('/api/address');
                if (res.status === 401) {
                    // Redirige vers la page de connexion
                    window.location.href = '/login';
                    return;
                }
                if (!res.ok) {
                    // Pour d’autres erreurs serveur
                    setAddresses([]);
                    return;
                }
                const data = await res.json();
                setAddresses(Array.isArray(data) ? data : []);
            } catch {
                setAddresses([]);
            }
        };

        fetchAddresses();
    }, []);

    /**
     * Ouvre le formulaire en mode édition, avec une adresse à éditer.
     * @param address Adresse à éditer.
     */
    const handleEdit = (address: Address) => {
        setEditAddress(address);
        setShowForm(true);
    };

    /**
     * Supprime une adresse (après confirmation utilisateur).
     * @param id Identifiant de l'adresse à supprimer.
     */
    const handleDelete = async (id: string) => {
        if (!confirm('Supprimer cette adresse ?')) return;
        await fetch(`/api/address/${id}`, { method: 'DELETE' });
        setAddresses(addr => addr.filter(a => a.id !== id));
        if (onAddressesChanged) onAddressesChanged();
    };

    /**
     * Définit une adresse comme adresse de livraison par défaut.
     * @param id Identifiant de l'adresse à définir par défaut.
     */
    const handleDefaultShipping = async (id: string) => {
        await fetch(`/api/address/default-shipping/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        await fetchAddresses();
        if (onAddressesChanged) onAddressesChanged();
    };

    /**
     * Récupère la liste des adresses utilisateur depuis l'API.
     */
    const fetchAddresses = async () => {
        try {
            const res = await fetch('/api/address');
            const data = await res.json();
            setAddresses(Array.isArray(data) ? data : []);
        } catch {
            setAddresses([]);
        }
    };

    /**
     * Valide le formulaire d'édition/création d'adresse (création ou mise à jour).
     * @param form Données du formulaire à enregistrer.
     */
    const handleFormValidate = async (form: Partial<Address>) => {
        if (editAddress) {
            await fetch(`/api/address/${editAddress.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
        } else {
            await fetch('/api/address', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
        }
        setShowForm(false);
        setEditAddress(null);
        await fetchAddresses();
        if (onAddressesChanged) onAddressesChanged();
    };


    // Rendu principal : liste des adresses et formulaire modal affiché si besoin
    return (
        <main>
            <h1 className="text-2xl font-bold mb-6">Mes adresses</h1>
            <div className="flex flex-wrap gap-3">
                {addresses.map(addr => (
                    <div
                        key={addr.id}
                        className={`
                            border rounded-lg p-4 min-w-[260px] flex gap-2.5 flex-col
                            ${addr.isDefaultShipping ? 'bg-green-50 border-green-200' : 'bg-white border-gray-300'}
                        `}
                    >
                        <div>
                            <strong>{addr.name}</strong><br />
                            {addr.street}{addr.complement && `, ${addr.complement}`}<br />
                            {addr.zip} {addr.city}<br />
                            {addr.country}
                        </div>
                        <hr className="my-2" />
                        <div className="flex gap-2">
                            <button
                                className="btn btn-sm btn-outline"
                                onClick={() => handleEdit(addr)}
                            >
                                Modifier
                            </button>
                            <button
                                className="btn btn-sm btn-outline text-red-600 border-red-300 hover:bg-red-50"
                                onClick={() => handleDelete(addr.id)}
                            >
                                Supprimer
                            </button>
                            {!addr.isDefaultShipping && (
                                <button
                                    className="btn btn-sm btn-outline"
                                    onClick={() => handleDefaultShipping(addr.id)}
                                >
                                    Mettre par défaut (livraison)
                                </button>
                            )}
                        </div>
                        <div>
                            {addr.isDefaultShipping && (
                                <span className="bg-green-500 text-white px-2 py-1 rounded text-xs ml-1">Livraison par défaut</span>
                            )}
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => { setEditAddress(null); setShowForm(true); }}
                    className="min-w-[260px] min-h-[120px] border-2 border-dashed border-gray-300 flex items-center justify-center text-3xl text-gray-400 hover:bg-gray-50 rounded-lg transition"
                >
                    + Ajouter une adresse
                </button>
            </div>

            {showForm && (
                <Portal>
                    <div className="modal modal-open">
                        <div className="modal-box max-h-[90vh] overflow-auto min-w-60">
                            <AddressForm
                                initialAddress={editAddress || undefined}
                                onSubmit={handleFormValidate}
                                onCancel={() => { setShowForm(false); setEditAddress(null); }}
                            />
                        </div>
                    </div>
                </Portal>
            )}
        </main>
    );
}

export default AddressManager