"use client";

import DeliveryMethodSection from "@/components/DeliveryMethodSection";
import ShippingAddressSection from "@/components/ShippingAddressSection";
import { Address } from "@/types/address";
import { useState } from "react";


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

    return (
        <main>
            <h1 className="font-bold text-3xl pb-1">Validation de votre commande</h1>

            <div className="border-2">
                <ShippingAddressSection onSelect={setAddress} />
            </div>

            <div className="border-2">
                <DeliveryMethodSection onSelect={setDeliveryMethod} />
            </div>



            {/* ... autres sections à venir ... */}

            <pre>{JSON.stringify(address)}</pre>
            <pre>{JSON.stringify(deliveryMethod)}</pre>

        </main>
    );
}