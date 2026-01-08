import type { CreateOrderPayload, OrderResponse } from "@/types/order";

/**
 * Crée une nouvelle commande côté API.
 *
 * Envoie une requête POST avec le payload de commande et retourne la commande créée.
 *
 * @param payload - Les informations nécessaires à la création de la commande
 * @returns L'objet commande retourné par l'API
 * @throws {Error} Si la création échoue côté serveur ou réseau
 */
export async function createOrder(payload: CreateOrderPayload): Promise<OrderResponse> {

    const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors de la création de la commande');
    }

    const data = await response.json() as OrderResponse;
    return data;
}

/**
 * Récupère une commande par son identifiant.
 *
 * @param id - L'identifiant de la commande à récupérer
 * @returns L'objet commande ou une erreur si la récupération échoue.
 * @throws {Error} Si la commande n'est pas trouvée ou une erreur réseau survient.
 */
export async function getOrderById(id: string): Promise<OrderResponse> {
    
    const response = await fetch(`/api/orders/${id}`);
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors de la récupération de la commande');
    }

    const data = await response.json() as OrderResponse;
    return data;
}

/**
 * Récupère la liste des commandes du client courant.
 *
 * @returns Un tableau de commandes ou une erreur si la récupération échoue.
 */
export async function getOrders(): Promise<OrderResponse[]> {
    const response = await fetch('/api/orders');
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors de la récupération des commandes');
    }

    const data = await response.json() as OrderResponse[];
    return data;
}