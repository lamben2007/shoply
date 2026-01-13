import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({ children }: { children: ReactNode }) {
    if (typeof window === "undefined") return null;
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return null;
    return createPortal(children, modalRoot);
}