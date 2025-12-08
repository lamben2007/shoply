// src/app/api/test-db/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        // On compte le nombre de produits dans la table
        const count = await prisma.product.count();
        return NextResponse.json({ count });
    } catch (e: unknown) {
        console.error(e);
        const message = e instanceof Error ? e.message : String(e);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
