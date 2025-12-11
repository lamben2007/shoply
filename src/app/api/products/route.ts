import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: "desc" },
        });

        // On parse le champ price en float pour chaque produit
        const parsedProducts = products.map(product => ({
            ...product,
            price: product.price !== null ? parseFloat(product.price as unknown as string) : null,
        }));

        return NextResponse.json({ products: parsedProducts });

    } catch (error) {
        console.error("API error:", error);
        return new NextResponse("Erreur serveur", { status: 500 });
    }
}
