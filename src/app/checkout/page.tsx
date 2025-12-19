"use client";

import ShippingAddressSection from "@/components/ShippingAddressSection";
import { Address } from "@/types/address";
import { useState } from "react";

export default function CheckOut() {

    const [address, setAddress] = useState<Address | undefined>(undefined);

    return (
        <main>
            <h1 className="font-bold text-3xl pb-1">Validation de votre commande</h1>

            <div className="border-2">
                <ShippingAddressSection onSelect={setAddress} />
            </div>



            {/* ... autres sections à venir ... */}

            <pre>{JSON.stringify(address)}</pre>
            
        </main>
    );
}