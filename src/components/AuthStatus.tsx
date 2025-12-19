"use client";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { User as UserIcon } from "lucide-react";

export default function AuthStatus() {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
            setLoading(false);
        });
        const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setUser(session?.user ?? null);
        });
        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    // Ferme le menu si clic en dehors
    useEffect(() => {
        if (!open) return;
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        setUser(null);
        setOpen(false);
        router.push("/login");
    };

    const handleProfile = () => {
        setOpen(false);
        router.push("/profile");
    };

    const handleAddresses = () => {
        setOpen(false);
        router.push("/addresses");
    };



    if (loading) return null;

    return (
        <div ref={menuRef} className="relative flex items-center gap-2">
            {user && (
                <span className="text-sm font-medium text-base-content max-w-[140px]" title={user.email ?? undefined}>
                    {user.email}
                </span>
            )}
            <button
                className="btn btn-ghost btn-circle"
                aria-label={user ? "Profil utilisateur" : "Se connecter"}
                onClick={() => setOpen((v) => !v)}
                type="button"
            >
                <UserIcon className="w-6 h-6" />
            </button>

            {open && (
                <ul className="menu dropdown-content absolute right-0 mt-2 z-20 p-2 shadow bg-base-100 rounded-box w-52">
                    {user ? (
                        <>
                            <li><button onClick={handleProfile}>Voir profil</button></li>
                            <li><button onClick={handleAddresses}>Adresses</button></li>
                            <li><button onClick={handleLogout} className="text-red-600">Déconnexion</button></li>
                        </>
                    ) : (
                        <>
                            <li>
                                <button
                                    onClick={() => { setOpen(false); router.push('/login'); }}
                                    className="text-green-700">
                                    Connexion
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => { setOpen(false); router.push('/signup'); }}
                                    className="text-blue-700">
                                    Créer un compte
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            )}
        </div>
    );

}