import type { CreateOrderPayload, OrderResponse } from "@/types/order";

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

export async function getOrderById(id: string): Promise<OrderResponse | null> {
  const res = await fetch(`/api/orders/${id}`);
  if (!res.ok) return null;
  return res.json();
}