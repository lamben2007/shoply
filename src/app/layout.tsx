import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientToaster from '@/components/ClientToaster';
import Header from '@/components/Header';
import Footer from "@/components/Footer";
import "./globals.css";

// Chargement de la police Geist Sans avec variable CSS personnalisée
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Chargement de la police Geist Mono avec variable CSS personnalisée
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Métadonnées générales de l'application pour Next.js (SEO, titre, description)
export const metadata: Metadata = {
  title: 'Shoply',
  description: 'Mini e-commerce fullstack',
};

/**
 * Layout racine de l'application Next.js.
 *
 * Définit la structure HTML de base pour toutes les pages,
 * applique les polices personnalisées, affiche l'en-tête et le pied de page,
 * ainsi qu'un espace principal entourant les enfants.
 *
 * @param {Readonly<{children: React.ReactNode}>} props Les enfants à afficher dans le layout
 * @returns Le layout général de l'application
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        {/* En-tête du site (navigation principale) */}
        <Header />

        {/* composant de gestion des notifications (toasts) côté client */}
        <ClientToaster />

        <main className="px-6 py-10 max-w-6xl mx-auto my-18">
          {/* Contenu principal de la page courante */}
          {children}
          {/* Racine pour affichage dynamique de modals/portals */}
          <div id="modal-root" />
        </main>

        {/* Pied de page du site */}
        <Footer />

      </body>
    </html>
  );
}
