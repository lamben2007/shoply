"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Profile = {
    nom: string;
    prenom: string;
    adresse: string;
};

export default function ProfilePage() {
    const [profile, setProfile] = useState<Profile>({ nom: "", prenom: "", adresse: "" });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [userId, setUserId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            const supabase = createClient();
            // Check session/user
            const { data: userData } = await supabase.auth.getUser();
            if (!userData.user) {
                router.push("/login");
                return;
            }
            setUserId(userData.user.id);

            // Get profile
            const { data, error } = await supabase
                .from("profiles")
                .select("nom, prenom, adresse")
                .eq("id", userData.user.id)
                .single();

            if (error && error.code !== 'PGRST116') {
                setError("Impossible de charger le profil." + error.message);
            } else {
                setProfile({
                    nom: data?.nom || "",
                    prenom: data?.prenom || "",
                    adresse: data?.adresse || "",
                });
            }
            setLoading(false);
        };
        fetchProfile();
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setSaving(true);

        const supabase = createClient();
        const { error } = await supabase
            .from("profiles")
            .upsert({
                id: userId,
                ...profile,
            });

        if (error) {
            setError("Erreur lors de l’enregistrement.");
        } else {
            setSuccess("Profil enregistré !");
        }
        setSaving(false);
    };

    if (loading) return <div>Chargement…</div>;

    return (
        <div className="max-w-md mx-auto py-8">
            <pre>{userId}</pre>
            <h1 className="text-2xl font-bold mb-4">Mon profil</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                    name="prenom"
                    value={profile.prenom}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Prénom"
                />
                <input
                    name="nom"
                    value={profile.nom}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Nom"
                />
                <input
                    name="adresse"
                    value={profile.adresse}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Adresse"
                />
                <button type="submit" disabled={saving} className="btn btn-primary w-full">
                    {saving ? "Enregistrement..." : "Enregistrer"}
                </button>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-600">{success}</p>}
            </form>
        </div>
    );
}