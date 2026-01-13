'use client';

import AddressManager from '@/components/AddressManager';

/**
 * Page d'affichage et de gestion des adresses utilisateur.
 * Utilise le composant AddressManager pour permettre à l'utilisateur de consulter,
 * ajouter, modifier ou supprimer ses adresses. Doit être utilisé côté client (Next.js).
 *
 * @component
 * @returns Page de gestion des adresses utilisateur.
 */
export default function AddressesPage() {
  return (
    <AddressManager />
  )
}