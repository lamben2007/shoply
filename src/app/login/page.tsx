"use client";
import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

/**
 * LoginPage – Page de connexion utilisateur
 *
 * Permet l'authentification par email et mot de passe via Supabase.
 * Affiche un message d'erreur (traduit si "Invalid login credentials").
 * Redirige vers la page des produits après authentification réussie.
 *
 * Fonctionnalités :
 * - Formulaire contrôlé pour email et mot de passe
 * - Gestion des erreurs (français et valeurs par défaut)
 * - Intégration Supabase pour l'auth
 * - Redirection automatique après succès
 *
 * @component
 * @returns Formulaire de connexion stylisé
 */
export default function LoginPage() {
  // États pour les champs du formulaire et la remontée d'erreur
  const [email, setEmail] = useState("");     // Email de l'utilisateur
  const [password, setPassword] = useState(""); // Mot de passe saisi
  const [error, setError] = useState("");       // Message d'erreur à afficher
  const router = useRouter();

  /**
   * Traite la soumission du formulaire de connexion :
   * - Vide l'erreur précédente
   * - Tente la connexion via Supabase avec email/mot de passe
   * - Affiche une erreur française si identifiants invalides
   * - Redirige vers /products en cas de succès
   *
   * @param {React.FormEvent} e - Événement de soumission formulaire
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire
    setError("");       // Efface le message d'erreur précédent
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      // Affiche un message français si les identifiants sont invalides
      if (error.message === "Invalid login credentials") {
        setError("Identifiants invalides. Veuillez vérifier votre email et votre mot de passe.");
      } else {
        setError(error.message); // Affiche toute autre erreur Supabase telle quelle
      }
    } else {
      router.push("/products"); // Redirige en cas de connexion réussie
    }
  };

  return (
    // Fond gris clair, centré verticalement et horizontalement grâce à Flexbox
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Carte de connexion classique */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>
        {/* Formulaire contrôlé */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            {/* Champ email contrôlé */}
            <input
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          <div>
            {/* Champ mot de passe contrôlé */}
            <input
              required
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          {/* Bouton de soumission */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
          >
            Connexion
          </button>
        </form>
        {/* Message d'erreur affiché si erreur existe */}
        {error && (
          <p className="mt-4 text-center text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
}