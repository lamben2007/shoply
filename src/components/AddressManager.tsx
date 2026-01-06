import { useEffect, useState } from 'react';
import { Address } from '@/types/address';
import AddressForm from '@/components/AddressForm';

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
         * @returns {Promise<void>}
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


    //
    return (
        <main>
            <h1>Mes adresses</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
                {addresses.map(addr => (
                    <div key={addr.id} style={{
                        border: '1px solid #bbb',
                        borderRadius: 8,
                        padding: 16,
                        minWidth: 260,
                        position: 'relative',
                        background: addr.isDefaultShipping ? '#e7f5e7' : '#fff'
                    }}>

                        <div>
                            <strong>{addr.name}</strong><br />
                            {addr.street}{addr.complement && `, ${addr.complement}`}<br />
                            {addr.zip} {addr.city}<br />
                            {addr.country}
                        </div>
                        <hr />
                        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                            <button onClick={() => handleEdit(addr)}>Modifier</button>
                            <button onClick={() => handleDelete(addr.id)} style={{ color: '#c00' }}>Supprimer</button>
                            {!addr.isDefaultShipping && (
                                <button onClick={() => handleDefaultShipping(addr.id)}>Mettre par défaut (livraison)</button>
                            )}
                        </div>
                        <div>
                            {addr.isDefaultShipping && (
                                <span style={{
                                    background: '#22c55e', color: '#fff',
                                    padding: '2px 8px', borderRadius: 8, fontSize: 12
                                }}>Livraison par défaut</span>
                            )}
                        </div>
                    </div>
                ))}
                <button
                    onClick={() => { setEditAddress(null); setShowForm(true); }}
                    style={{ minWidth: 260, minHeight: 120, border: '2px dashed #bbb', fontSize: 24 }}>
                    + Ajouter une adresse
                </button>
            </div>



            {showForm && (
                <div className="modal modal-open">
                    <div className="modal-box" style={{ minWidth: 240 }}>
                        <AddressForm
                            initialAddress={editAddress || undefined}
                            onSubmit={handleFormValidate}
                            onCancel={() => { setShowForm(false); setEditAddress(null); }}
                        />
                        <div className="modal-action">
                            <button className="btn" onClick={() => { setShowForm(false); setEditAddress(null); }}>
                                Annuler
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => { setShowForm(false); setEditAddress(null); }} />
                </div>
            )}



        </main>
    );

}

export default AddressManager