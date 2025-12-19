import { Address } from '@/types/address';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Sous-composant : card affichée pour l'adresse sélectionnée
function SelectedAddressCard({ address, onSelect }: {
    address: Address | undefined,
    onSelect: () => void,
}) {
    if (!address) return null;
    return (
        <div className="border rounded p-4 mb-4 shadow bg-white max-w-md">
            <strong>{address.name}</strong> <br />
            {address.street}{address.complement ? ', ' + address.complement : ''}<br />
            {address.zip} {address.city}<br />
            {address.country}
            {address.isDefaultShipping && (
                <span className="text-xs ml-2 bg-green-200 text-green-800 px-2 py-0.5 rounded">Défaut</span>
            )}
            <div>
                <button
                    type="button"
                    className="mt-3 btn btn-outline btn-sm"
                    onClick={onSelect}
                >
                    Sélectionner
                </button>
            </div>
        </div>
    );
}

// Sous-composant : modale de sélection d'adresse (DaisyUI)
function AddressSelectModal({
    addresses,
    selectedAddressId,
    onSelectAddress,
    show,
    onClose
}: {
    addresses: Address[],
    selectedAddressId: string | null,
    onSelectAddress: (addr: Address) => void,
    show: boolean,
    onClose: () => void
}) {
    return (
        <>
            <input type="checkbox" className="modal-toggle" checked={show} readOnly tabIndex={-1} />
            <div className={`modal ${show ? "modal-open" : ""}`}>
                <div className="modal-box max-w-lg">
                    <h3 className='font-bold text-xl mb-4'>Choisir une adresse</h3>
                    <div className='space-y-3 max-h-80 overflow-auto'>
                        {addresses.map(addr => (
                            <div
                                key={addr.id}
                                className={`cursor-pointer border rounded p-3 shadow-sm mb-2 
                                    ${selectedAddressId === addr.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'} transition-colors`}
                                onClick={() => onSelectAddress(addr)}
                            >
                                <strong>{addr.name}</strong> <br />
                                {addr.street}{addr.complement ? ', ' + addr.complement : ''}<br />
                                {addr.zip} {addr.city}<br />
                                {addr.country}
                                {addr.isDefaultShipping && (
                                    <span className="text-xs ml-2 bg-green-200 text-green-800 px-2 py-0.5 rounded">Défaut</span>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="modal-action">
                        <button
                            className="btn"
                            onClick={onClose}
                            type="button"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function ShippingAddressSection({ onSelect }: { onSelect: (addr: Address) => void }) {
    const router = useRouter();
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function fetchAddresses() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch('/api/address');
                if (!res.ok) throw new Error('Erreur de chargement des adresses');
                const data = await res.json();
                const list: Address[] = data || [];
                setAddresses(list);

                let defaultAddr = list.find(addr => addr.isDefaultShipping);
                if (!defaultAddr && list.length > 0) {
                    defaultAddr = list[0];
                }
                setSelectedAddressId(defaultAddr?.id ?? null);
                if (defaultAddr) onSelect(defaultAddr);
            } catch (e) {
                setError((e instanceof Error ? e.message : String(e)) || 'Erreur inconnue');
            } finally {
                setLoading(false);
            }
        }
        fetchAddresses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleManageAddresses = () => {
        router.push('/addresses');
    };

    const handleSelectFromModal = (addr: Address) => {
        setSelectedAddressId(addr.id);
        onSelect(addr);
        setShowModal(false);
    };

    const defaultAddress = addresses.find(addr => addr.id === selectedAddressId);

    return (
        <section>
            <h2 className='font-bold text-2xl mb-2'>Adresse de livraison</h2>
            {loading && <p>Chargement des adresses...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {!loading && !error && (
                <>
                    {addresses.length === 0 ? (
                        <button
                            type="button"
                            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'
                            onClick={handleManageAddresses}
                        >
                            Ajouter adresse
                        </button>
                    ) : (
                        <>
                            <SelectedAddressCard
                                address={defaultAddress}
                                onSelect={() => setShowModal(true)}
                            />
                            <AddressSelectModal
                                addresses={addresses}
                                selectedAddressId={selectedAddressId}
                                onSelectAddress={handleSelectFromModal}
                                show={showModal}
                                onClose={() => setShowModal(false)}
                            />
                        </>
                    )}
                </>
            )}

            <button
                type="button"
                className='mt-2 px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors'
                onClick={handleManageAddresses}
            >
                Gérer mes adresses
            </button>
        </section>
    );
}