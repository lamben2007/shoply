import { PaymentInfo, PaymentMethod } from "@/types/payment";
import React, { useEffect, useState } from "react";

type Props = {
    onChange?: (paymentInfo: PaymentInfo) => void;
    onValidChange?: (isValid: boolean) => void;
};

const fakePaypalUser = "jean.paypal@email.com";
const fakeCardData = {
    name: "Jean Dupont",
    number: "4111 1111 1111 1111",
    expiry: "12/28",
    cvv: "123"
};

const PaymentMethodSection = ({ onChange, onValidChange }: Props) => {

    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");
    const [card, setCard] = useState({ name: "", number: "", expiry: "", cvv: "" });
    const [paypalConnected, setPaypalConnected] = useState(false);

    // Validation logique pour savoir si les infos sont "OK"
    const cardIsValid = (
        card.name &&
        /^\d{16}$/.test(card.number.replace(/\s/g, "")) &&
        /^\d{2}\/\d{2}$/.test(card.expiry) &&
        /^\d{3}$/.test(card.cvv)
    );

    const paymentInfo: PaymentInfo = {
        method: selectedMethod,
        cardDetails: selectedMethod === "card" ? card : undefined,
        paypalUser: selectedMethod === "paypal" && paypalConnected ? fakePaypalUser : undefined,
    };

    // Gestion du "lift state up"
    useEffect(() => {
        if (onChange) onChange(paymentInfo);
        if (onValidChange) {
            let valid = false;
            if (selectedMethod === "card") valid = !!cardIsValid;
            else if (selectedMethod === "paypal") valid = paypalConnected;
            else if (selectedMethod === "wire") valid = true;
            onValidChange(valid);
        }
        // eslint-disable-next-line
    }, [selectedMethod, card, paypalConnected]);

    const onCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCard((prev) => ({ ...prev, [name]: value }));
    };

    const simulateCardInput = () => {
        setCard(fakeCardData);
    };

    // Génère le message d'erreur à la volée (pas de state inutile pour cardError)
    function getCardError(): string | null {
        if (selectedMethod !== "card") return null;
        if (!card.name && !card.number && !card.expiry && !card.cvv) return null;
        if (card.name &&
            /^\d{16}$/.test(card.number.replace(/\s/g, "")) &&
            /^\d{2}\/\d{2}$/.test(card.expiry) &&
            /^\d{3}$/.test(card.cvv))
            return null;
        return "Veuillez remplir tous les champs correctement.";
    }

    return (
        <section>
            <h2>3. Mode de paiement</h2>
            <div>
                <label>
                    <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={selectedMethod === "card"}
                        onChange={() => {
                            setSelectedMethod("card");
                            setPaypalConnected(false);
                        }}
                    />
                    Carte bancaire
                </label>
                <label style={{ marginLeft: "2rem" }}>
                    <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={selectedMethod === "paypal"}
                        onChange={() => {
                            setSelectedMethod("paypal");
                            setCard({ name: "", number: "", expiry: "", cvv: "" });
                        }}
                    />
                    PayPal
                </label>
                {/* Facultatif mode wire */}
                <label style={{ marginLeft: "2rem" }}>
                    <input
                        type="radio"
                        name="payment"
                        value="wire"
                        checked={selectedMethod === "wire"}
                        onChange={() => {
                            setSelectedMethod("wire");
                            setPaypalConnected(false);
                            setCard({ name: "", number: "", expiry: "", cvv: "" });
                        }}
                    />
                    Virement bancaire
                </label>
            </div>

            {/* Formulaire Carte */}
            {selectedMethod === "card" && (
                <div style={{ margin: "1rem 0", maxWidth: 350 }}>
                    <div>
                        <label>
                            Nom sur la carte<br />
                            <input
                                type="text"
                                name="name"
                                value={card.name}
                                onChange={onCardChange}
                                placeholder="Jean Dupont"
                                autoComplete="cc-name"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Numéro de carte<br />
                            <input
                                type="text"
                                name="number"
                                value={card.number}
                                onChange={onCardChange}
                                maxLength={19}
                                placeholder="1234 5678 9012 3456"
                                autoComplete="cc-number"
                            />
                        </label>
                    </div>
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <label>
                            Expiration (MM/AA)<br />
                            <input
                                type="text"
                                name="expiry"
                                value={card.expiry}
                                onChange={onCardChange}
                                maxLength={5}
                                placeholder="09/26"
                                autoComplete="cc-exp"
                            />
                        </label>
                        <label>
                            CVV<br />
                            <input
                                type="text"
                                name="cvv"
                                value={card.cvv}
                                onChange={onCardChange}
                                maxLength={3}
                                placeholder="123"
                                autoComplete="cc-csc"
                            />
                        </label>
                    </div>
                    <div style={{ display: "flex", gap: "1rem", marginTop: 12 }}>
                        <button type="button" onClick={simulateCardInput}>
                            Simuler la saisie
                        </button>
                    </div>
                    {getCardError() && <div style={{ color: "red", marginTop: 8 }}>{getCardError()}</div>}
                </div>
            )}

            {/* Simulation PayPal */}
            {selectedMethod === "paypal" && (
                <div style={{ margin: "1rem 0" }}>
                    {!paypalConnected ? (
                        <button
                            onClick={() => setPaypalConnected(true)}
                            aria-label="Simuler la connexion PayPal"
                        >
                            Se connecter à PayPal
                        </button>
                    ) : (
                        <div>
                            Connecté : <strong>{fakePaypalUser}</strong>
                        </div>
                    )}
                </div>
            )}

            {/* Simulation Virement */}
            {selectedMethod === "wire" && (
                <div style={{ margin: "1rem 0", fontSize: "0.9rem" }}>
                    <strong>Instructions de virement :</strong><br />
                    IBAN : FR76 XXXX XXXX XXXX XXXX XXXX XXX<br />
                    BIC : XXXXXXXX<br />
                    Merci de mentionner votre numéro de commande en référence.<br />
                </div>
            )}

            <div style={{ fontStyle: "italic", color: "#888", marginTop: "1.5rem" }}>
                Simulation – aucune donnée réelle transmise.
            </div>
        </section>
    );
};

export default PaymentMethodSection;
