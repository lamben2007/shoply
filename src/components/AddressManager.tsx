import { useEffect, useState } from 'react';
import { Address } from '@/types/address';
import AddressForm from '@/components/AddressForm';


function AddressManager({ onAddressesChanged }: { onAddressesChanged?: () => void }) {

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editAddress, setEditAddress] = useState<Address | null>(null);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const res = await fetch('/api/address');
                const data = await res.json();
                setAddresses(data);
            } catch {
                setAddresses([]);
            }
        };
        fetchAddresses();
    }, []);

    const handleEdit = (address: Address) => {
        setEditAddress(address);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Supprimer cette adresse ?')) return;
        await fetch(`/api/address/${id}`, { method: 'DELETE' });
        setAddresses(addr => addr.filter(a => a.id !== id));
        if (onAddressesChanged) onAddressesChanged();
    };

    const handleDefaultShipping = async (id: string) => {
        //
        await fetch(`/api/address/default-shipping/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        await fetchAddresses();
        if (onAddressesChanged) onAddressesChanged();
    };

    const fetchAddresses = async () => {
        try {
            const res = await fetch('/api/address');
            const data = await res.json();
            setAddresses(Array.isArray(data) ? data : []);
        } catch {
            setAddresses([]);
        }
    };

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
                            {/* {!addr.isDefaultBilling && (
                <button onClick={() => handleDefault(addr.id, 'billing')}>Mettre par défaut (facturation)</button>
              )} */}
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