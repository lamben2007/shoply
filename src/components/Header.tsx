// Header.tsx
// Composant Header affichant la navigation principale en haut de page
// - Met en surbrillance l'onglet courant
// - Utilise un menu sticky/fixed

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function Header() {
    // Récupère le chemin d'URL courant pour détecter la page active
    const pathname = usePathname();

    // Liste des liens de navigation du header
    // (href = cible de la page, label = affichage humain)
    const links = [
        { href: '/', label: 'Accueil' },
        { href: '/products', label: 'Produits' },
        { href: '/cart', label: 'Panier' },
    ];

    /**
     * Renvoie la className adaptée selon l'état actif du lien
     * - Ajoute surbrillance et couleur si la page est active
     * - Toujours min-width + text-center pour éviter un menu qui bouge lors du changement
     *
     * @param href string : destination du lien
     */
    function getLinkClassName(href: string) {
        // Lien actif :
        // - Accueil : match exact
        // - Autres : match chemin commençant par href (gère /products/slug)
        const isActive = href === '/'
            ? pathname === '/'
            : pathname.startsWith(href);

        return clsx(
            'pb-1 transition-colors border-b-2 font-semibold min-w-[80px] text-center',
            isActive
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent hover:border-blue-300'
        );
    }

    return (
        // Header fixé en haut : fond blanc, ombre légère, pleine largeur
        <header className="px-6 py-4 border-b bg-white shadow-sm fixed top-0 inset-x-0 z-50">
            {/* Menu horizontal centré avec espace entre chaque onglet */}
            <nav className="flex gap-6 max-w-6xl mx-auto items-center">
                {links.map(link => (
                    // NavLink avec style dynamique selon la page courante
                    <Link
                        key={link.href}
                        href={link.href}
                        className={getLinkClassName(link.href)}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </header>
    );
}