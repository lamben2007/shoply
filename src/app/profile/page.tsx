"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Profile } from "@/types/profile";


export default function ProfilePage() {

    const [profile, setProfile] = useState<Profile>({ id: "", lastName: "", firstName: "" });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            const supabase = createClient();
            // Vérifie l'authentification côté client
            const { data: userData } = await supabase.auth.getUser();
            if (!userData.user) {
                router.push("/login");
                return;
            }

            try {
                const res = await fetch("/api/profile");
                if (!res.ok) {
                    setError("Impossible de charger le profil.");
                    setLoading(false);
                    return;
                }
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

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

    if (loading) return <div>Chargement…</div>;

    return (
        <div className="max-w-md mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Mon profil</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Prénom"
                />
                <input
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Nom"
                />

                <button
                    type="submit"
                    disabled={saving}
                    className="btn btn-primary w-full"
                >
                    {saving ? "Enregistrement..." : "Enregistrer"}
                </button>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-600">{success}</p>}
            </form>
        </div>
    );
}