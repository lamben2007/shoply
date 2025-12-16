"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";


export default function Home() {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
  }, []);


  if (loading) return <div>Chargement...</div>;

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-3xl font-bold">Bienvenue sur le site e-commerce SHOPLY</h1>

      {/* {user ? (
        <div>
          <p>Connecté en tant que : <strong>{user.email}</strong></p>
        </div>
      ) : (
        <div>
          <p>Vous n’êtes pas connecté.</p>
          <a href="/login">Se connecter</a>
          <p>
            Pas encore de compte ? <a href="/signup">Créer un compte</a>
          </p>
        </div>
      )} */}



    </div>
  );
}



