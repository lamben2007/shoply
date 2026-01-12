
# 🛒 **Mini-Projet E-Commerce – Portfolio**

### 🎯 **Objectif**

Créer un mini e-commerce **fullstack**, professionnel, documenté et déployé, afin de démontrer la maîtrise d’un stack moderne :

* **Next.js (App Router)**
* **Prisma v7**
* **PostgreSQL hébergée sur Supabase**
* **Gestion d’état client avec Zustand**
* Déploiement **Vercel**

Le projet doit être utilisable comme **référence de compétences en développement web moderne**.

---

## 🧰 **Technologies utilisées**

| Domaine            | Technologie                   | Rôle                                  |
| ------------------ | ----------------------------- | ------------------------------------- |
| Frontend UI        | Next.js (React), Tailwind CSS | Pages, composants, design responsive  |
| Animations         | Framer Motion *(optionnel)*   | UI raffinée pour portfolio            |
| Backend            | Next.js API Routes            | Accès aux données via REST            |
| Base de données    | Supabase → **PostgreSQL**     | Stockage persistant                   |
| ORM                | **Prisma v7** (Server-only)   | Sécurité, typage, migrations          |
| État global        | **Zustand + DevTools**        | Panier + données produits côté client |
| Déploiement        | Vercel                        | Environnement production              |
| Auth *(bonus)*     | NextAuth.js                   | Inscription / Connexion               |
| Paiement *(bonus)* | Stripe                        | Paiement simulé ou réel               |

📌 **Important** :
➡️ **Plus d’accès direct à Supabase depuis le frontend**
➡️ Toute la data passe par **Prisma dans les API Routes**
➡️ Zustand ne stocke que le panier et le cache des produits côté client

---

## 🗃️ **Base de données**

### Modèles actuels (Prisma Schema)

| Table       | Description                          |
| ----------- | ------------------------------------ |
| `Product`   | Articles du catalogue                |
| `Order`     | Commandes clients                    |
| `OrderItem` | Détails produits liés à une commande |

➡️ Une seule base Supabase sert pour **dev & prod**
⭕ Pas de `_dev` / `_prod` en doublon
✔️ Environnements différenciés uniquement via variables `.env`

🔐 Sécurité :

* SSL obligatoire (`?sslmode=require`)
* RLS activé pour les tables publiques

---

## 🧱 **Architecture du projet**

```
Frontend (Pages Next.js + Client components)
        ⬇️ appels HTTP
API Routes Next.js  (/api/products, /api/orders, …)
        ⬇️ Prisma v7
Database PostgreSQL (Supabase)
```

→ Le serveur gère l'accès aux données
→ Le client ne reçoit que des JSON propres

---

## 📦 **Gestion d’état — Zustand**

Stores séparés (lisibilité + maintenabilité) :

| Store             | Contenu                                |
| ----------------- | -------------------------------------- |
| `useProductStore` | Liste complète en cache, fetch via API |
| `useCartStore`    | Produits ajoutés, quantités, total     |

Zustand DevTools activé → debugging facile

---

## 🖥️ **Fonctionnalités principales**

### 1️⃣ Catalogue produits

* Page dynamique `/products`
* Cartes produit
* Fetch via `/api/products`
* Mise en cache côté client

### 2️⃣ Page produit

* Route dynamique `/products/[slug]`
* Fetch → `GET /api/products/:slug`
* Bouton **Ajouter au panier**

### 3️⃣ Panier (client only)

* Ajouter / supprimer / modifier quantité
* Totaux calculés automatiquement
* Persistance locale (localStorage optionnel)

### 4️⃣ Checkout

* Formulaire : nom, email, adresse
* Création commande via `POST /api/orders`
* Page confirmation commande

---

## 🚀 **Fonctionnalités bonus (si le temps le permet)**

| Feature                       | Intérêt                              |
| ----------------------------- | ------------------------------------ |
| Auth (NextAuth.js)            | Persistance du panier, espace client |
| Stripe                        | Paiement réel ou simulé              |
| Filtrage / recherche produits | UX améliorée                         |
| Gestion stock                 | Réduction stock lors commande        |
| Animations Framer Motion      | Plus pro pour un Portfolio           |

---

## ⚙️ **API — Plan**

| Route                 | Méthode | Usage             |
| --------------------- | ------- | ----------------- |
| `/api/products`       | GET     | Liste produits    |
| `/api/products/:slug` | GET     | Détails produit   |
| `/api/orders`         | POST    | Création commande |

Toutes sécurisées via Prisma
Zéro accès public direct à la base 🔐

---

## 🌍 **Stratégie Dev → Prod**

| Élément                   | Dev                              | Prod             |
| ------------------------- | -------------------------------- | ---------------- |
| Variables d’environnement | `.env.local`                     | Vercel Dashboard |
| DB                        | Même DB mais restrictions IP/SSL | Pareil           |

📌 Tests en local **prod-like** : `NODE_ENV=production next dev`

---


# 🧩 Résumé visuel

```
User
  ⬇️ UI React
Pages Products / Product / Cart / Checkout
  ⬇️ (fetch)
Next.js API Routes
  ⬇️ (Prisma)
PostgreSQL (Supabase)
```

Zustand → Panier & cache produits
Prisma + API → Données sécurisées
Vercel → Prod et build SSR

