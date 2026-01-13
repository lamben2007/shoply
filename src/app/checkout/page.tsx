"use client";

import AcceptCGVSection from "@/components/AcceptCGVSection";
import ConfirmButtonSection from "@/components/ConfirmButtonSection";
import DeliveryMethodSection from "@/components/DeliveryMethodSection";
import OrderSummarySection from "@/components/OrderSummarySection";
import PaymentMethodSection from "@/components/PaymentMethodSection";
import ShippingAddressSection from "@/components/ShippingAddressSection";
import { useCartStore } from "@/store/useCartStore";
import { Address } from "@/types/address";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createOrder } from "@/lib/api/orders";
// import { PaymentInfo } from "@/types/payment";


type DeliveryOption = {
    id: string;
    label: string;
    cost: number;
    delay: string;
    description?: string;
};


/**
 * CheckOut component
 *
 * Page de validation de commande :
 * - Permet à l'utilisateur de sélectionner une adresse de livraison, un mode de livraison et un mode de paiement,
 * - Affiche le récapitulatif de la commande,
 * - Gère l'acceptation des CGV et la confirmation de la commande,
 * - Crée la commande et redirige vers la page de confirmation.
 *
 * @component
 * @returns Page de validation de la commande
 */
export default function CheckOut() {

    const [address, setAddress] = useState<Address | undefined>(undefined);
    const [deliveryMethod, setDeliveryMethod] = useState<DeliveryOption | undefined>(undefined)
    // const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | undefined>();
    const [paymentValid, setPaymentValid] = useState(false);
    const [acceptedCGV, setAcceptedCGV] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    //
    const { items, total, clearCart } = useCartStore();



    /**
    * Crée une nouvelle commande à partir du panier courant.
    * Affiche une alerte en cas d'erreur.
    *
    * @returns L'identifiant de la commande créée, ou null si erreur.
    */
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

            return newOrder.id

        } catch (e) {
            console.log('Erreur lors de la commande : ' + (e as Error).message);
            return null
        }
    }



    /**
    * Procédure de confirmation : vérifie que tous les champs sont valides,
    * déclenche la création de commande, puis redirige.
    *
    * @remarks
    * Gère les messages d'erreur utilisateur.
    */
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
        const orderId = await submitCommand()
        if (orderId) {
            clearCart()
            router.push(`/confirmation/${orderId}`);
        }
    };


    //
    return (
        <div>
            <h1 className="font-bold text-3xl pb-1">Validation de votre commande</h1>

            <div className="flex flex-col gap-5">

                <div className="border-b-2 pb-2.5">
                    <ShippingAddressSection onSelect={setAddress} />
                </div>

                <div className="border-b-2 pb-2.5">
                    <DeliveryMethodSection onSelect={setDeliveryMethod} />
                </div>

                <div className="border-b-2 pb-2.5">
                    <PaymentMethodSection
                        onValidChange={(valid) => setPaymentValid(valid)}
                    />
                </div>

                <div className="border-b-2 pb-2.5">
                    <OrderSummarySection items={items} deliveryCost={0} />
                </div>

                <div className="border-b-2 pb-2.5">
                    <AcceptCGVSection checked={acceptedCGV} onChange={setAcceptedCGV} />
                </div>

                <div className="border-b-2 pb-2.5">
                    <ConfirmButtonSection
                        disabled={!address || !deliveryMethod || !paymentValid || !acceptedCGV}
                        loading={loading}
                        error={error}
                        onConfirm={handleConfirm}
                    />
                </div>

            </div>

        </div>
    );
}