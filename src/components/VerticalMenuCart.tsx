import Link from 'next/link';
import { User, Package } from 'lucide-react';

type MenuItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const menuItems: MenuItem[] = [
  // Définition des éléments du menu (chemin, label, icône associée)
  { href: '/profile', label: 'Profile', icon: <User className="w-5 h-5 mr-3" /> },
  { href: '/orders', label: 'Mes commandes', icon: <Package className="w-5 h-5 mr-3" /> },
];

/**
 * Composant VerticalMenuCart
 * 
 * Menu vertical affiché typiquement dans l'espace utilisateur du site (account/cart). 
 * Affiche des liens vers le profil et l'historique des commandes, accompagnés d'icônes.
 * 
 * @returns Une barre de menu verticale de navigation utilisateur.
 */
const VerticalMenuCart = () => (
  // Menu principal stylisé en vertical
  <nav className="w-56 bg-gray-50 py-8">
    <ul>
      {/* Parcourt chaque élément du menu pour afficher un lien avec icône et texte */}
      {menuItems.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200 transition-colors rounded-lg mb-1"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default VerticalMenuCart;