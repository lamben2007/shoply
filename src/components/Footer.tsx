import React from "react";
import Image from "next/image";

/**
 * Composant d'affichage du pied de page du site.
 * ---
 * Ce footer inclut :
 * - Liens d'information (À propos, Contact, etc.)
 * - Informations de service client (email et téléphone)
 * - Liens vers les réseaux sociaux
 * - Icônes des moyens de paiement acceptés
 * 
 * Affiche aussi une mention légale ainsi qu'une note indiquant 
 * le caractère fictif de la boutique.
 * 
 * @component
 */
const Footer = () => (
  <footer className="bg-gray-800 text-gray-100 mt-8">
    {/* Grille principale du footer */}
    <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {/* Section des liens d'information */}
      <div>
        <h4 className="text-lg font-semibold mb-3">Informations</h4>
        <ul className="space-y-2">
          <li>
            <a href="#" className="hover:underline">À propos</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Contact</a>
          </li>
          <li>
            <a href="#" className="hover:underline">FAQ</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Livraison & Retours</a>
          </li>
        </ul>
      </div>
      {/* Section Service Client */}
      <div>
        <h4 className="text-lg font-semibold mb-3">Service client</h4>
        <p className="text-sm">Email : support@shoply.com</p>
        <p className="text-sm">Tél : 01 23 45 67 89</p>
      </div>
      {/* Section Réseaux Sociaux */}
      <div>
        <h4 className="text-lg font-semibold mb-3">Suivez-nous</h4>
        <div className="flex space-x-4 mt-2">
          {/* Liens sociauix */}
          <a href="#" className="hover:text-blue-400">Facebook</a>
          <a href="#" className="hover:text-pink-400">Instagram</a>
          <a href="#" className="hover:text-blue-300">Twitter</a>
        </div>
      </div>
      {/* Section Paiements acceptés */}
      <div>
        <h4 className="text-lg font-semibold mb-3">Paiements acceptés</h4>
        <div className="flex space-x-3">
          {/* Icône Visa */}
          <span className="bg-white rounded p-1 relative w-12 h-6">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
              alt="Visa"
              fill
              sizes="48px"
              className="object-contain"
            />
          </span>
          {/* Icône Mastercard */}
          <span className="bg-white rounded p-1 relative w-12 h-6">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
              alt="Mastercard"
              fill
              sizes="48px"
              className="object-contain"
            />
          </span>
          {/* Icône Paypal */}
          <span className="bg-white rounded p-1 relative w-12 h-6">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
              alt="Paypal"
              fill
              sizes="48px"
              className="object-contain"
            />
          </span>
        </div>
      </div>
    </div>
    {/* Mentions légales et liens supplémentaires */}
    <div className="border-t border-gray-700 py-4 text-center text-sm">
      &copy; 2025 Shoply. Tous droits réservés |{" "}
      <a href="#" className="underline">Mentions légales</a> |{" "}
      <a href="#" className="underline">CGV</a> |{" "}
      <a href="#" className="underline">Cookies</a>
    </div>

    {/* Message d'avertissement (site fictif) */}
    <div className="bg-gray-900 py-2">
      <p className="text-xs text-gray-400 text-center">
        Ce site s&apos;appelle <span className="font-bold">Shoply</span>. Il s&apos;agit d&apos;une boutique fictive réalisée pour un portfolio. Aucune commande ne sera traitée, les données sont factices.
      </p>
    </div>
  </footer>
);

export default Footer;