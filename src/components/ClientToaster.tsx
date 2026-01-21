'use client';

import { Toaster } from 'sonner';

/**
 * Composant de notifications (toasts) côté client.
 *
 * Permet d'afficher des notifications toast partout dans l'application,
 * basé sur le composant `Toaster` de la librairie `sonner`.
 *
 * @returns Le composant de notifications globales
 */
export default function ClientToaster() {
  return <Toaster />;
}