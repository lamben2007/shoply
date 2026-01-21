// src/components/ConfirmButtonSection.tsx

import React from "react";

/**
 * Propriétés attendues pour le composant ConfirmButtonSection.
 *
 * @property {boolean} disabled - Indique si le bouton est désactivé.
 * @property {boolean} loading - Indique si l'action est en cours de traitement.
 * @property {string | null | undefined} [error] - Message d'erreur éventuel à afficher.
 * @property {() => void} onConfirm - Fonction appelée lors du clic sur le bouton.
 */
type ConfirmButtonSectionProps = {
    disabled: boolean;
    loading: boolean;
    error?: string | null;
    onConfirm: () => void;
};

/**
 * Section avec un bouton de confirmation principal pour valider un paiement ou une action critique.
 *
 * Gère l'état désactivé, l'affichage d'un loader animé, et un éventuel message d'erreur.
 *
 * @param props Propriétés de contrôle et callbacks
 * @returns Section contenant le bouton et le gestionnaire d'état/erreur.
 */
const ConfirmButtonSection = ({
    disabled,
    loading,
    error,
    onConfirm,
}: ConfirmButtonSectionProps) => {
    return (
        <section style={{ margin: "2rem 0", textAlign: "center" }}>
            {/* Affichage du message d'erreur s'il existe */}
            {error && (
                <div style={{ color: "red", marginBottom: 12 }}>{error}</div>
            )}
            <button
                onClick={onConfirm}
                disabled={disabled || loading}
                style={{
                    background: "#2945F7",
                    color: "#fff",
                    border: "none",
                    borderRadius: 5,
                    padding: "1em 2em",
                    fontSize: "1.15em",
                    fontWeight: "bold",
                    opacity: disabled || loading ? 0.6 : 1,
                    cursor: disabled || loading ? "not-allowed" : "pointer",
                    minWidth: 220,
                    position: "relative",
                    transition: "opacity 0.2s",
                }}
                aria-busy={loading}
            >
                {/* Affichage du loader et du texte de traitement si 'loading' true */}
                {loading ? (
                    <>
                        Traitement en cours…
                        <span
                            style={{
                                position: "absolute",
                                right: 20,
                                top: "50%",
                                marginTop: -10,
                                width: 20,
                                height: 20,
                            }}
                            aria-label="Chargement"
                            aria-live="polite"
                        >
                            <svg width="20" height="20" viewBox="0 0 50 50">
                                <circle
                                    cx="25"
                                    cy="25"
                                    r="20"
                                    fill="none"
                                    stroke="#fff"
                                    strokeWidth="4"
                                    strokeDasharray="31.415, 31.415"
                                    transform="rotate(90 25 25)"
                                >
                                    <animateTransform
                                        attributeName="transform"
                                        type="rotate"
                                        from="0 25 25"
                                        to="360 25 25"
                                        dur="1s"
                                        repeatCount="indefinite"
                                    />
                                </circle>
                            </svg>
                        </span>
                    </>
                ) : (
                    // Sinon, texte d'action principal
                    "Confirmer et payer"
                )}
            </button>
        </section>
    );
};

export default ConfirmButtonSection;