// src/lib/utils/images.ts

export function getProductImg_old(url: string, size: "thumb" | "full"): string {
    
    if (!url) return "/placeholder.webp"; // sécurité

    if (size === "thumb") {
        return `${url}?width=400&quality=70`;
    }

    return `${url}?width=1200&quality=80`;
}
