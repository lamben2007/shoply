"use client";
import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

/**
 * SignupPage – Page d'inscription utilisateur
 * 
 * Permet la création de compte via email/mot de passe avec Supabase. 
 * Affiche des messages d'erreur ou de succès, et redirige vers la page de connexion en cas de succès.
 *
 * Fonctionnalités :
 * - Formulaire contrôlé pour email & mot de passe
 * - Validation côté client (HTML, minLength)
 * - Inscription via Supabase
 * - Messagerie utilisateur (succès, erreur)
 * - Redirection automatique après succès
 *
 * @component
 * @returns La page d'inscription
 */
export default function SignupPage() {

    // Champs du formulaire (états contrôlés)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");        // Message d'erreur d'inscription
    const [success, setSuccess] = useState(false); // Flag d'inscription réussie
    const router = useRouter();

    /**
     * Gère la soumission du formulaire d'inscription.
     * Appelle Supabase pour créer un utilisateur.
     * Gère les feedback d'erreur et de succès.
     */
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault(); // Empêche le rechargement de la page
        setError("");
        setSuccess(false);

        const supabase = createClient();
        const { error } = await supabase.auth.signUp({ email, password });

        if (error) {
            setError(error.message); // Affiche le message d'erreur Supabase
        } else {
            setSuccess(true); // Affiche le message de succès
            setTimeout(() => router.push("/login"), 2000); // Redirige après 2 secondes
        }
    };

    return (
        // Fond dégradé bleu -> blanc, centrage vertical/horizontal
        <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-blue-100 via-white to-white">
            {/* Carte centrale à l'aspect classique */}
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-blue-50">
                <h1 className="text-2xl font-semibold mb-6 text-blue-800 text-center">
                    Créer un compte
                </h1>
                {/* Formulaire d'inscription (contrôlé) */}
                <form onSubmit={handleSignup} className="flex flex-col gap-4">
                    <input
                        required
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="px-4 py-2 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                    />
                    <input
                        required
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        minLength={6}
                        onChange={e => setPassword(e.target.value)}
                        className="px-4 py-2 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                    />
                    <button
                        type="submit"
                        className="mt-2 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                    >
                        S’inscrire
                    </button>
                </form>
                {/* Affichage conditionnel des messages d'erreur/succès */}
                {error && (
                    <p className="text-red-600 mt-4 text-center">{error}</p>
                )}
                {success && (
                    <p className="text-green-600 mt-4 text-center">
                        Inscription réussie ! Vous allez être redirigé...
                    </p>
                )}
                {/* Lien de navigation vers la page de connexion */}
                <p className="mt-8 text-center text-sm">
                    Déjà un compte ?{" "}
                    <a
                        href="/login"
                        className="text-blue-700 font-semibold hover:underline"
                    >
                        Connectez-vous
                    </a>
                </p>
            </div>
        </div>
    );
}