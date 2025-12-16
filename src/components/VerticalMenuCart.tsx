import Link from 'next/link';
import { User, Heart, ShoppingCart, CreditCard, Package } from 'lucide-react';

type MenuItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const menuItems: MenuItem[] = [
  { href: '/profile', label: 'Profile', icon: <User className="w-5 h-5 mr-3" /> },
  { href: '/favoris', label: 'Favoris', icon: <Heart className="w-5 h-5 mr-3" /> },
  { href: '/cart', label: 'Chariot', icon: <ShoppingCart className="w-5 h-5 mr-3" /> },
  { href: '/paiement', label: 'Paiement', icon: <CreditCard className="w-5 h-5 mr-3" /> },
  { href: '/commandes', label: 'Mes commandes', icon: <Package className="w-5 h-5 mr-3" /> },
];

const VerticalMenuCart = () => (

  <nav className="w-56 bg-gray-50 py-8">
    <ul>
      {menuItems.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200 transition-colors rounded-lg mb-1">
            {item.icon}
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  </nav>

);

export default VerticalMenuCart;