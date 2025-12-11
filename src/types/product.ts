export type Product = {
    id: string;
    name: string;
    slug: string;
    description?: string;
    price: number;
    imageUrl: string;
    imagePreview: string;
    stock: number;
    createdAt: string; // ISO date venant de l’API
};
