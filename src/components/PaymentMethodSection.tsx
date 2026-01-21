import { PaymentInfo, PaymentMethod } from "@/types/payment";
import React, { useEffect, useState } from "react";

/**
 * Propriétés attendues pour PaymentMethodSection.
 * 
 * @property {(paymentInfo: PaymentInfo) => void} [onChange] Callback appelée lors d'une modification d'info de paiement.
 * @property {(isValid: boolean) => void} [onValidChange] Callback signalant la validité globale du formulaire de paiement.
 */
type Props = {
    onChange?: (paymentInfo: PaymentInfo) => void;
    onValidChange?: (isValid: boolean) => void;
};

// Valeur fictive pour simuler un compte PayPal connecté
const fakePaypalUser = "jean.paypal@email.com";
// Valeurs fictives pour pré-remplissage rapide carte bancaire
const fakeCardData = {
    name: "Jean Dupont",
    number: "4111 1111 1111 1111",
    expiry: "12/28",
    cvv: "123"
};

/**
 * Composant d'affichage du choix du mode de paiement (carte, PayPal, virement).
 *
 * Gère la saisie et la validation du formulaire via état local,
 * et notifie le parent de toute modification et validation.
 *
 * @param props Props de callback pour synchronisation externe
 * @returns Section complète du paiement (avec form dynamique)
 */
const PaymentMethodSection = ({ onChange, onValidChange }: Props) => {

    // Méthode de paiement sélectionnée (par défaut : carte)
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");
    // Infos de la carte bancaire saisies
    const [card, setCard] = useState({ name: "", number: "", expiry: "", cvv: "" });
    // Pour simuler une connexion PayPal
    const [paypalConnected, setPaypalConnected] = useState(false);

    // Validation des champs de la carte bancaire
    const cardIsValid = (
        card.name &&
        /^\d{16}$/.test(card.number.replace(/\s/g, "")) &&
        /^\d{2}\/\d{2}$/.test(card.expiry) &&
        /^\d{3}$/.test(card.cvv)
    );

    // Objet récapitulatif envoyé au parent via onChange
    const paymentInfo: PaymentInfo = {
        method: selectedMethod,
        cardDetails: selectedMethod === "card" ? card : undefined,
        paypalUser: selectedMethod === "paypal" && paypalConnected ? fakePaypalUser : undefined,
    };

    // Effet de synchronisation vers l'extérieur (parent) lors de toute modification ou validation
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

    /**
     * Gestionnaire de changement d'un input du formulaire de carte
     * @param {React.ChangeEvent<HTMLInputElement>} e Événement de changement du champ
     */
    const onCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCard((prev) => ({ ...prev, [name]: value }));
    };

    /**
     * Préremplit le formulaire de carte avec des valeurs de test simulées.
     */
    const simulateCardInput = () => {
        setCard(fakeCardData);
    };

    /**
     * Retourne un message d'erreur si le formulaire carte n'est pas valide,
     * sinon null.
     *
     * @returns {string|null} Le message d'erreur éventuel pour la carte
     */
    function getCardError(): string | null {
        if (selectedMethod !== "card") return null;
        if (!card.name && !card.number && !card.expiry && !card.cvv) return null;
        if (
            card.name &&
            /^\d{16}$/.test(card.number.replace(/\s/g, "")) &&
            /^\d{2}\/\d{2}$/.test(card.expiry) &&
            /^\d{3}$/.test(card.cvv)
        )
            return null;
        return "Veuillez remplir tous les champs correctement.";
    }

    return (
        <section>
            <h2 className='font-bold text-2xl mb-4'>3. Mode de paiement</h2>
            {/* Choix du mode de paiement */}
            <div className="flex flex-wrap gap-6 mb-4">
                {/* Carte bancaire */}
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={selectedMethod === "card"}
                        onChange={() => {
                            setSelectedMethod("card");
                            setPaypalConnected(false);
                        }}
                        className="accent-blue-600"
                    />
                    <span>Carte bancaire</span>
                </label>
                {/* PayPal */}
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={selectedMethod === "paypal"}
                        onChange={() => {
                            setSelectedMethod("paypal");
                            setCard({ name: "", number: "", expiry: "", cvv: "" });
                        }}
                        className="accent-blue-600"
                    />
                    <span>PayPal</span>
                </label>
                {/* Virement bancaire */}
                <label className="flex items-center gap-2 cursor-pointer">
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
                        className="accent-blue-600"
                    />
                    <span>Virement bancaire</span>
                </label>
            </div>

            {/* Formulaire de carte bancaire */}
            {selectedMethod === "card" && (
                <div className="bg-gray-50 rounded-xl p-5 mb-4 w-full max-w-md">
                    <div className="mb-4">
                        <label className="block font-medium mb-1">
                            Nom sur la carte
                            <input
                                type="text"
                                name="name"
                                value={card.name}
                                onChange={onCardChange}
                                placeholder="Jean Dupont"
                                autoComplete="cc-name"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium mb-1">
                            Numéro de carte
                            <input
                                type="text"
                                name="number"
                                value={card.number}
                                onChange={onCardChange}
                                maxLength={19}
                                placeholder="1234 5678 9012 3456"
                                autoComplete="cc-number"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                            />
                        </label>
                    </div>
                    <div className="flex gap-4 mb-4">
                        <label className="flex-1 font-medium">
                            Expiration (MM/AA)
                            <input
                                type="text"
                                name="expiry"
                                value={card.expiry}
                                onChange={onCardChange}
                                maxLength={5}
                                placeholder="09/26"
                                autoComplete="cc-exp"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                            />
                        </label>
                        <label className="flex-1 font-medium">
                            CVV
                            <input
                                type="text"
                                name="cvv"
                                value={card.cvv}
                                onChange={onCardChange}
                                maxLength={3}
                                placeholder="123"
                                autoComplete="cc-csc"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                            />
                        </label>
                    </div>
                    <div className="flex gap-4 mt-2">
                        <button
                            type="button"
                            onClick={simulateCardInput}
                            className="btn btn-outline btn-sm"
                        >
                            Simuler la saisie
                        </button>
                    </div>
                    {getCardError() && (
                        <div className="text-red-600 mt-3">{getCardError()}</div>
                    )}
                </div>
            )}

            {/* Simulation d'une connexion PayPal */}
            {selectedMethod === "paypal" && (
                <div className="bg-gray-50 rounded-xl p-5 mb-4 w-full max-w-md">
                    {!paypalConnected ? (
                        <button
                            onClick={() => setPaypalConnected(true)}
                            aria-label="Simuler la connexion PayPal"
                            className="btn btn-outline btn-sm"
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

            {/* Instructions simulées pour le virement */}
            {selectedMethod === "wire" && (
                <div className="bg-gray-50 rounded-xl p-5 mb-4 w-full max-w-md text-sm">
                    <strong>Instructions de virement :</strong><br />
                    IBAN : FR76 XXXX XXXX XXXX XXXX XXXX XXX<br />
                    BIC : XXXXXXXX<br />
                    Merci de mentionner votre numéro de commande en référence.<br />
                </div>
            )}

            <div className="italic text-gray-500 mt-8 text-sm">
                Simulation – aucune donnée réelle transmise.
            </div>
        </section>
    );
};

export default PaymentMethodSection;