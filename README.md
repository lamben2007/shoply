# 🛍️ Shoply — Mini e-commerce (Next.js + Prisma + Supabase)

Shoply est une boutique en ligne **full-stack** construite avec **Next.js 16**, **Prisma v7** et **Supabase (PostgreSQL)**.  
Ce projet met en avant mes compétences en développement web moderne : UI responsive, API sécurisée, base de données Cloud et déploiement sur Vercel.

---

## 🚀 Démo en ligne

🔗 Application : https://shoply-bla.vercel.app/ 

---

## 🧰 Stack Technique

| Catégorie | Technologies |
|----------|--------------|
| Frontend | Next.js 16, TypeScript, Tailwind CSS |
| Backend | Next.js Route Handlers, Prisma v7 |
| Database | Supabase (PostgreSQL + RLS activé) |
| State Management | Zustand (Cart store) |
| Infra | Vercel (prod), `.env.local` (dev) |

---

## ✨ Fonctionnalités

- 🛒 Catalogue des produits (fetch côté serveur via Prisma)
- 🔍 Page produit dynamique `/products/[slug]`
- 🧺 Panier client avec Zustand
- 🧾 Validation de commande (mock checkout)
- 📱 Design responsive (mobile → desktop)
- ⚡ Prérendu côté serveur (SEO optimisé)

---

### 🧩 Fonctionnalités bonus (roadmap)

- 🔐 Authentification utilisateur (NextAuth.js)
- 🎯 Recherche & filtres produits
- 🧮 Gestion du stock en temps réel
- 💳 Paiement Stripe (mode test)
- ✨ Animations Framer Motion

---

## 📁 Structure du projet

```bash
src/
 ├─ app/
 │   ├─ api/ ➜ Back-end (route handlers)
 │   ├─ products/ ➜ Pages catalogue
 │   ├─ cart/ ➜ Page panier
 │   └─ checkout/ ➜ Étape commande
 ├─ lib/
 │   └─ prisma.ts ➜ instance Prisma Client
 ├─ store/
 │   └─ cartStore.ts ➜ Zustand
 └─ components/
     ├─ ProductCardClient.tsx
     └─ ProductDetailsClient.tsx
