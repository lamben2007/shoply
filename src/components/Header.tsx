'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import CartIcon from './CartIcon';
import AuthStatus from './AuthStatus';
import packageJson from '../../package.json';

import { useState } from 'react';
import { Menu, X } from 'lucide-react'; 

export default function Header() {

    const [isMenuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Accueil' },
        { href: '/products', label: 'Produits' },
        { href: '/cart', label: 'Panier' },
    ];

    function getLinkClassName(href: string) {
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
        <header className="px-6 py-4 border-b bg-white shadow-sm fixed top-0 inset-x-0 z-50 flex justify-between items-center gap-1.5">
            {/* Logo et titre */}
            <div className="flex items-center gap-6">
                <div className='flex flex-col'>
                    <div className='text-6xl'>SHOPLY</div>
                    <div className='text-xs'>{packageJson.version}</div>
                </div>

                {/* Menu Desktop */}
                <nav className="hidden md:flex gap-6 max-w-6xl">
                    {links.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={getLinkClassName(link.href)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="flex items-center gap-6">
                <AuthStatus />
                <CartIcon />

                {/* Menu Burger Mobile */}
                <button
                    className="md:hidden p-2"
                    aria-label="Ouvrir le menu"
                    onClick={() => setMenuOpen(true)}
                >
                    <Menu size={28} />
                </button>
            </div>

            {/* Overlay du menu mobile */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden flex">
                    <div className="bg-white w-4/5 max-w-xs flex flex-col p-6 pt-10 shadow-xl h-full">
                        <button
                            className="absolute top-4 right-4"
                            aria-label="Fermer le menu"
                            onClick={() => setMenuOpen(false)}
                        >
                            <X size={28} />
                        </button>
                        <nav className="flex flex-col mt-8 gap-4">
                            {links.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={clsx(
                                        getLinkClassName(link.href),
                                        'text-xl'
                                    )}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="flex-1" onClick={() => setMenuOpen(false)} />
                </div>
            )}
        </header>
    );
}