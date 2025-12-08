import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Shoply',
  description: 'Mini e-commerce fullstack',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <header className="px-6 py-4 border-b bg-white shadow-sm">
          <nav className="flex gap-6">
            <Link href="/">Accueil</Link>
            <Link href="/products">Produits</Link>
            <Link href="/cart">Panier</Link>
          </nav>
        </header>

        <main className="px-6 py-10 max-w-6xl mx-auto">
          {children}
        </main>


      </body>
    </html>
  );
}

