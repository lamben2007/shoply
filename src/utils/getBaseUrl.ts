// À utiliser côté server uniquement !

export function getBaseUrl() {
  if (typeof window !== "undefined") return "";           // Client : chemins relatifs
  
  if (process.env.NEXT_PUBLIC_BASE_URL)
    return process.env.NEXT_PUBLIC_BASE_URL;              // Perso/env local/dev

  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}`;           // Vercel preview/prod

  return "http://localhost:3000";                         // Local dev server par défaut
}