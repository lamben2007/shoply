"use client";



export default function Home() {

  //
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-3xl font-bold mb-4 text-center">Bienvenue sur le site e-commerce SHOPLY</h1>
      <p className="mb-4 text-lg text-center max-w-xl">
        Ce site e-commerce a été réalisé dans le cadre d’un projet de démonstration afin de présenter mes compétences.
      </p>
      <p className="mb-4 text-center max-w-xl">
        Vous pouvez créer votre propre compte test, ou utiliser le compte utilisateur public pour explorer le site.
      </p>
      <div className="bg-white dark:bg-zinc-900 rounded p-4 shadow max-w-sm mb-4">
        <h2 className="font-semibold mb-2">Compte utilisateur test :</h2>
        <ul className="text-sm">
          <li>
            <span className="font-medium">Login&nbsp;:</span> test@shoply.fr
          </li>
          <li>
            <span className="font-medium">Mot de passe&nbsp;:</span> shoply
          </li>
        </ul>
      </div>
      <span className="text-xs text-zinc-500 text-center">Merci pour votre visite et bon test !</span>
    </div>
  );
}

