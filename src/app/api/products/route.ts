import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ products });
    } catch (error) {
        console.error("API error:", error);
        return new NextResponse("Erreur serveur", { status: 500 });
    }
}
