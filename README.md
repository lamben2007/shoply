# 🛍️ Shoply — Mini e-commerce (Next.js + Prisma + Supabase)

Shoply est une boutique en ligne **full-stack** construite avec **Next.js 16**, **Prisma v7** et **Supabase (PostgreSQL)**.  
Ce projet met en avant mes compétences en développement web moderne : UI responsive, API sécurisée, base de données Cloud et déploiement sur Vercel.

---

## 🚀 Démo en ligne

🔗 Application : https://shoply-bla.vercel.app/

---

## 🧰 Stack Technique

| Catégorie        | Technologies                         |
| ---------------- | ------------------------------------ |
| Frontend         | Next.js 16, TypeScript, Tailwind CSS |
| Backend          | Next.js Route Handlers, Prisma v7    |
| Database         | Supabase (PostgreSQL + RLS activé)   |
| State Management | Zustand (Cart store)                 |
| Infra            | Vercel (prod), `.env.local` (dev)    |

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
 │   ├─ api/                  # Handlers d'API (produits, commandes, profils, adresses...)
 │   ├─ products/             # Pages catalogue produits
 │   │   └─ [slug]/           # Page produit dynamique
 │   ├─ cart/                 # Page panier
 │   ├─ checkout/             # Page commande
 │   ├─ confirmation/         # Page confirmation (commande)
 │   ├─ orders/               # Historique + détail commande
 │   ├─ addresses/            # Gestion des adresses
 │   ├─ login/, signup/       # Authentification
 │   ├─ profile/              # Profil utilisateur
 │   ├─ cgv/                  # Conditions de vente
 │   └─ layout.tsx, page.tsx  # Layout racine, Home
 ├─ components/               # Composants UI (Header, Footer, Cart, ProductCard, etc.)
 ├─ hooks/                    # Hooks React custom
 ├─ lib/                      # Librairies (Prisma client, Supabase, schémas Zod, appels API)
 ├─ store/                    # Stores Zustand (cart, produits)
 ├─ types/                    # Types TypeScript partagés
 └─ utils/                    # Fonctions utilitaires

```
