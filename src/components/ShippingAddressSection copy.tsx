import { Address } from '@/types/address';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ShippingAddressSection({ onSelect }: { onSelect: (addr: Address) => void }) {

    //
    const router = useRouter();
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

                // Rechercher l'adresse par défaut puis fallback sur la première
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

    const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAddressId(event.target.value);
        const found = addresses.find(addr => addr.id === event.target.value);
        if (found) onSelect(found);
    };

    const handleManageAddresses = () => {
        router.push('/addresses');
    };

    return (
        <section>
            <h2 className='font-bold text-2xl mb-2'>Adresse de livraison</h2>
            {loading && <p>Chargement des adresses...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && !error && (
                <>
                    {addresses.length === 0 ? (
                        <p>Aucune adresse renseignée.</p>
                    ) : (
                        <ul className="mb-4">
                            {addresses.map(addr => (
                                <li key={addr.id} className="mb-2 flex items-center">
                                    <input
                                        type="radio"
                                        name="shippingAddress"
                                        value={addr.id}
                                        checked={selectedAddressId === addr.id}
                                        onChange={handleSelect}
                                        className="mr-2"
                                    />
                                    <div>
                                        <strong>{addr.name}</strong> <br />
                                        {addr.street}{addr.complement ? ', ' + addr.complement : ''}<br />
                                        {addr.zip} {addr.city}<br />
                                        {addr.country}
                                        {addr.isDefaultShipping && (
                                            <span className="text-xs ml-2 bg-green-200 text-green-800 px-2 py-0.5 rounded">Défaut</span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
            <button
                type="button"
                className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'
                onClick={handleManageAddresses}
            >
                Gérer mes adresses
            </button>
        </section>
    );
}