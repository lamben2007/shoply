"use client";

import { useRouter } from "next/navigation";
import React from "react";

// Tu peux recevoir l'info par state/global pour un vrai projet (ici démo / factice)
const fakeOrderNumber = () => "CMD-000000";

export default function ConfirmationPage() {

    const router = useRouter();

    return (
        <main style={{ maxWidth: 600, margin: "2rem auto", padding: "1rem" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
                Merci pour votre commande !
            </h1>
            <p>Votre commande a bien été prise en compte.</p>
            <p>
                <strong>Numéro de commande : {fakeOrderNumber()}</strong>
            </p>
            <hr style={{ margin: "1.5em 0" }} />

            <h2 style={{ fontSize: "1.3rem", margin: "1em 0 0.5em" }}>
                Récapitulatif (démonstration)
            </h2>
            <ul style={{ background: "#f7f7fa", padding: 16, borderRadius: 8, listStyle: 'none' }}>
                <li>Produit 1 × 2 &nbsp;—&nbsp; 19,00 €</li>
                <li>Produit 2 × 1 &nbsp;—&nbsp; 12,00 €</li>
                <li><b>Total TTC : 49,90 €</b></li>
            </ul>
            <div style={{ marginTop: 24, display: "flex", gap: 16 }}>
                <button
                    style={{
                        background: "#2945F7",
                        color: "#fff",
                        border: "none",
                        borderRadius: 5,
                        padding: "0.75em 1.5em",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                    onClick={() => router.push("/")}
                >
                    Retour à l&apos;accueil
                </button>
                {/* <button
                    style={{
                        background: "#ddd",
                        border: "none",
                        borderRadius: 5,
                        padding: "0.75em 1.5em",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }}
                    onClick={() => router.push("/account")}
                >
                    Mon compte
                </button> */}
            </div>
            <p style={{ marginTop: 32, color: "#888" }}><i>Cette page est un exemple pour portfolio. Aucune commande réelle n’est passée.</i></p>
        </main>
    );
}