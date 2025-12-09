import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = Promise<{ slug: string }>;

export async function GET(request: Request, segmentData: { params: Params }) {

    const params = await segmentData.params;
    const slug = params.slug;

    try {
        const product = await prisma.product.findUnique({
            where: { slug: slug },
        });

        if (!product) {
            return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
        }

        return NextResponse.json({ product });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Erreur inconnue";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}