"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Profile } from "@/types/profile";

/**
 * Page de gestion et édition du profil utilisateur.
 *
 * Charge le profil de l'utilisateur authentifié, affiche un formulaire d'édition
 * et permet la sauvegarde des modifications via une API.
 *
 * @returns Le composant principal de la page profil
 */
export default function ProfilePage() {

    // État local du profil (id, prénom, nom)
    const [profile, setProfile] = useState<Profile>({ id: "", lastName: "", firstName: "" });
    // Indique le chargement des données du profil
    const [loading, setLoading] = useState(true);
    // Indique le chargement de sauvegarde (enregistrement)
    const [saving, setSaving] = useState(false);
    // Message d'erreur éventuel
    const [error, setError] = useState("");
    // Message de succès éventuel
    const [success, setSuccess] = useState("");
    // Router Next.js pour redirections (ex. : si non-authentifié)
    const router = useRouter();

    // Effet de récupération (fetch) du profil utilisateur au montage
    useEffect(() => {
        /**
         * Récupère le profil de l'utilisateur authentifié via Supabase et API custom.
         * Redirige vers /login si l'utilisateur n'est pas connecté.
         */
        const fetchProfile = async () => {
            const supabase = createClient();
            // Vérifie l'authentification côté client
            const { data: userData } = await supabase.auth.getUser();
            if (!userData.user) {
                router.push("/login");
                return;
            }

            try {
                // Appel à l'API interne pour récupérer le profil utilisateur
                const res = await fetch("/api/profile");
                if (!res.ok) {
                    setError("Impossible de charger le profil.");
                    setLoading(false);
                    return;
                }
                // Parse les données JSON et sécurise les champs attendus
                const data = await res.json() as Profile;

                setProfile({
                    id: data.id,
                    lastName: data.lastName || "",
                    firstName: data.firstName || "",
                });

            } catch {
                setError("Erreur réseau lors du chargement.");
            }
            setLoading(false);
        };
        fetchProfile();
    }, [router]);

    /**
     * Gère la modification d'un input dans le formulaire de profil.
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e L'événement de changement d'input
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    /**
     * Gère la soumission du formulaire de sauvegarde du profil utilisateur.
     * Fait un POST sur l'API /api/profile.
     *
     * @param {React.FormEvent} e L'événement de soumission du formulaire
     */
    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        setError("");
        setSuccess("");
        setSaving(true);

        try {
            const res = await fetch("/api/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profile),
            });
            if (!res.ok) {
                setError("Erreur lors de l’enregistrement.");
            } else {
                setSuccess("Profil enregistré !");
            }
        } catch {
            setError("Erreur réseau lors de l’enregistrement.");
        }
        setSaving(false);
    };

    // Affiche un indicateur de chargement lors de la récupération du profil
    if (loading) return <div>Chargement…</div>;

    return (
        <div className="max-w-md mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Mon profil</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Champ de saisie du prénom */}
                <input
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Prénom"
                />
                {/* Champ de saisie du nom */}
                <input
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Nom"
                />

                {/* Bouton de validation */}
                <button
                    type="submit"
                    disabled={saving}
                    className="btn btn-primary w-full"
                >
                    {saving ? "Enregistrement..." : "Enregistrer"}
                </button>
                {/* Messages d'erreur et/ou succès */}
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-600">{success}</p>}
            </form>
        </div>
    );
}