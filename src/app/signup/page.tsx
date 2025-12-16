"use client";
import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        const supabase = createClient();
        const { error } = await supabase.auth.signUp({ email, password });

        if (error) {
            setError(error.message);
        } else {
            setSuccess(true);
            setTimeout(() => router.push("/login"), 2000); // Redirige vers login après 2s
        }
    };

    return (
        <div>
            <h1>Créer un compte</h1>
            <form onSubmit={handleSignup}>
                <input
                    required
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    required
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    minLength={6}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">S’inscrire</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Inscription réussie ! Vous allez être redirigé...</p>}
            <p>
                Déjà un compte ? <a href="/login">Connectez-vous</a>
            </p>
        </div>
    );
}