"use client";

import AcceptCGVSection from "@/components/AcceptCGVSection";
import ConfirmButtonSection from "@/components/ConfirmButtonSection";
import DeliveryMethodSection from "@/components/DeliveryMethodSection";
import OrderSummarySection from "@/components/OrderSummarySection";
import PaymentMethodSection from "@/components/PaymentMethodSection";
import ShippingAddressSection from "@/components/ShippingAddressSection";
import { useCartStore } from "@/store/useCartStore";
import { Address } from "@/types/address";
import { PaymentInfo } from "@/types/payment";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createOrder } from "@/lib/api/orders";


type DeliveryOption = {
    id: string;
    label: string;
    cost: number;
    delay: string;
    description?: string;
};


export default function CheckOut() {

    const [address, setAddress] = useState<Address | undefined>(undefined);
    const [deliveryMethod, setDeliveryMethod] = useState<DeliveryOption | undefined>(undefined)
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | undefined>();
    const [paymentValid, setPaymentValid] = useState(false);
    const [acceptedCGV, setAcceptedCGV] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();


    //
    const { items, total } = useCartStore();



    //
    async function submitCommand(): Promise<string | null> {
        try {
            if (!address || !address.id) throw new Error("Veuillez sélectionner une adresse de livraison valide.");
            if (!items || items.length === 0) throw new Error("Votre panier est vide.");

            const newOrder = await createOrder({
                status: 'PAID',
                total: total(),
                shippingId: address.id,
                billingId: address.id,
                items: items
            })

            console.log("nouvelle commande:", newOrder)

            return newOrder.id

        } catch (e) {
            alert('Erreur lors de la commande : ' + (e as Error).message);
            return null
        }
    }



    // --- Fonction dédiée de confirmation ---
    const handleConfirm = async () => {
        setError(null);
        if (!address) return setError("Veuillez indiquer une adresse.");
        if (!deliveryMethod) return setError("Veuillez choisir un mode de livraison.");
        if (!paymentValid) return setError("Veuillez remplir correctement le mode de paiement.");
        if (!acceptedCGV) return setError("Veuillez accepter les CGV.");
        setLoading(true);
        // Simule un traitement
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        // alert("Commande simulée avec succès !");
        const orderId = await submitCommand()
        if (orderId) {
            router.push(`/confirmation/${orderId}`);
        }
    };


    //
    return (
        <main>
            <h1 className="font-bold text-3xl pb-1">Validation de votre commande</h1>

            <div className="border-2">
                <ShippingAddressSection onSelect={setAddress} />
            </div>

            <div className="border-2">
                <DeliveryMethodSection onSelect={setDeliveryMethod} />
            </div>

            <div className="border-2">
                <PaymentMethodSection
                    onChange={(info) => setPaymentInfo(info)}
                    onValidChange={(valid) => setPaymentValid(valid)}
                />
            </div>

            <div className="border-2">
                <OrderSummarySection items={items} deliveryCost={0} />
            </div>

            <div className="border-2">
                <AcceptCGVSection checked={acceptedCGV} onChange={setAcceptedCGV} />
            </div>

            <div className="border-2">
                <ConfirmButtonSection
                    disabled={!address || !deliveryMethod || !paymentValid || !acceptedCGV}
                    loading={loading}
                    error={error}
                    onConfirm={handleConfirm}
                />
            </div>



            {/* ... autres sections à venir ... */}

            <pre>{JSON.stringify(address)}</pre>
            <pre>{JSON.stringify(deliveryMethod)}</pre>

            <pre>
                {JSON.stringify(paymentInfo)}
                paymentValid:{JSON.stringify(paymentValid)}
            </pre>

            <pre>
                acceptedCGV:{JSON.stringify(acceptedCGV)}
            </pre>

        </main>
    );
}