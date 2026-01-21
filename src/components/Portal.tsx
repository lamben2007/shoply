import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

/**
 * Composant Portal
 * 
 * Rend ses enfants (`children`) dans le noeud DOM ayant l'id 'modal-root' 
 * via React Portal. Utile pour afficher des éléments comme des modals,
 * des overlays, des popups, etc. en dehors du flux principal de l'application.
 * 
 * Si la fenêtre (`window`) n'est pas définie ou si `#modal-root` n'existe pas,
 * le composant ne rend rien (null).
 * 
 * @param props.children Les éléments React à rendre dans le portail.
 * @returns Un portail React autour de `children`, ou `null` si indisponible.
 */
export default function Portal({ children }: { children: ReactNode }) {
    // S'assure que le code s'exécute côté client uniquement (Next.js/SSR)
    if (typeof window === "undefined") return null;

    // Recherche le noeud DOM cible dans la page
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return null; // Si aucun noeud cible trouvé, retourne null

    // Utilise React Portal pour rendre les enfants en dehors du DOM principal
    return createPortal(children, modalRoot);
}