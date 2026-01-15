"use client";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { User as UserIcon } from "lucide-react";

/**
 * Affiche le bouton (et menu déroulant) de statut de connexion utilisateur.
 * Gère la détection de l'utilisateur courant (via Supabase), la connexion/déconnexion/profil/adresses, et l'ouverture/fermeture du menu.
 *
 * @returns Ce composant affiche soit les actions utilisateur (profil/adresses/déconnexion) si connecté, soit les boutons de connexion/inscription.
 */
export default function AuthStatus() {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        /**
         * À l'initialisation, récupère l'utilisateur courant via Supabase et installe un listener sur le changement d'état d'authentification.
         * Nettoie le listener à la destruction du composant.
         */
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

    useEffect(() => {
        /**
         * Ferme le menu utilisateur si clic détecté en dehors du dropdown.
         */
        if (!open) return;
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    /**
     * Déconnecte l'utilisateur, vide le state et redirige vers /login.
     */
    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        setUser(null);
        setOpen(false);
        router.push("/login");
    };

    /**
     * Ouvre la page profil utilisateur.
     */
    const handleProfile = () => {
        setOpen(false);
        router.push("/profile");
    };

    /**
     * Ouvre la page gestion des adresses utilisateur.
     */
    const handleAddresses = () => {
        setOpen(false);
        router.push("/addresses");
    };

    /**
     * Ouvre la page avec la liste des commandes effectuées par l'utilisateur.
     */
    const handleOrders = () => {
        setOpen(false);
        router.push("/orders");
    };

    if (loading) return null;

    return (
        // <div ref={menuRef} className="dropdown dropdown-end flex items-center gap-2">
        <div ref={menuRef} className="dropdown dropdown-end">

            <div className="flex gap-2 items-center">
                {user && (
                    <span className="hidden md:block text-sm font-medium text-base-content max-w-[140px]" title={user.email ?? undefined}>
                        {user.email}
                    </span>
                )}
                {/* Le bouton qui ouvre le menu */}
                <button
                    type="button"
                    className="btn btn-ghost btn-circle"
                    aria-label={user ? "Profil utilisateur" : "Se connecter"}
                    onClick={() => setOpen((v) => !v)}
                    title={user?.email || undefined}
                >
                    <UserIcon className="w-6 h-6" />
                </button>
            </div>



            {/* Le menu DaisyUI */}
            {open && (
                <ul tabIndex={0} className="dropdown-content menu menu-sm shadow bg-base-100 rounded-box w-52 mt-3 z-20">
                    {user ? (
                        <>
                            <li><button onClick={handleProfile}>Voir profil</button></li>
                            <li><button onClick={handleAddresses}>Adresses</button></li>
                            <li><button onClick={handleOrders}>Commandes</button></li>
                            <li><button onClick={handleLogout} className="text-red-600">Déconnexion</button></li>
                        </>
                    ) : (
                        <>
                            <li>
                                <button onClick={() => { setOpen(false); router.push('/login'); }} className="text-green-700">
                                    Connexion
                                </button>
                            </li>
                            <li>
                                <button onClick={() => { setOpen(false); router.push('/signup'); }} className="text-blue-700">
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