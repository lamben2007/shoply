// app/products/page.tsx
export const dynamic = "force-dynamic";

import prisma from '@/lib/prisma'
import ProductCardClient from './ProductCardClient';


export default async function ProductsPage() {



    // console.log("DB_URL", process.env.DATABASE_URL);



    // Récupérer les produits hors du JSX
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
    });


    // Si aucun produit
    if (!products || products.length === 0) {
        return <p className="text-red-500">Aucun produit trouvé</p>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8">Nos Produits</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {products.map((product) => (
                    <ProductCardClient key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
