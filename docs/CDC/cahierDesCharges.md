
# **Mini projet e-commerce – Portfolio**

### **Objectif**

Créer un mini e-commerce **fullstack** avec **Next.js** et **Supabase**, entièrement fonctionnel et déployable sur **Vercel**, pour démontrer mes compétences en développement web moderne, du **frontend au backend**, en passant par la **gestion de base de données cloud**.

---

### **Technologies utilisées**

* **Frontend** : Next.js (React), Tailwind CSS pour le design, Framer Motion pour les animations (optionnel)
* **Backend** : Next.js API routes + Supabase (PostgreSQL)
* **Base de données** : Supabase Free (un seul projet pour dev et prod)

  * Tables séparées : `products_dev` et `products_prod`
* **Déploiement** : Vercel (plan gratuit)
* **Gestion d’état** : React Context ou Zustand (panier)
* **Authentification (optionnelle)** : NextAuth.js avec Supabase

---

### **Fonctionnalités principales**

1. **Catalogue de produits**

   * Affichage d’une liste de produits avec image, nom, prix et description courte
   * Page produit détaillée (page dynamique `[id].js` ou `[slug].js`)

2. **Panier**

   * Ajouter, supprimer ou modifier la quantité des produits
   * Affichage du total en temps réel

3. **Checkout simulé**

   * Formulaire de commande (nom, email, adresse)
   * Confirmation de commande après validation

4. **Navigation et UI**

   * Header : Accueil, Produits, Panier
   * Footer : informations de contact
   * Design responsive (mobile / desktop)

---

### **Fonctionnalités avancées / bonus**

* Filtrage et recherche de produits
* Gestion simulée du stock et des disponibilités
* Authentification utilisateur avec NextAuth.js
* Intégration Stripe pour paiement simulé (optionnelle)
* Animations UI (hover, transitions, etc.)

---

### **Architecture et organisation**

* **Tables Supabase** :

  * `products_dev` / `products_prod` → produits
  * `cart` → panier utilisateur (temporaire ou persisté)
  * `orders` → commandes
  * `users` → comptes utilisateurs (si auth)

* **API routes Next.js** : CRUD pour produits, panier et commandes

* **Variables d’environnement** : `.env.local` pour dev, Vercel dashboard pour prod

---

### **Stratégie Dev → Prod**

* Développement sur Supabase Free avec tables `*_dev`
* Déploiement sur Vercel : production utilise les tables `*_prod`
* Même code pour dev et prod, seules les tables changent (ou via variables d’environnement)

---

### **Pertinence pour un portfolio**

* Montre la capacité à gérer un projet **fullstack moderne**
* Démonstration concrète de compétences : Next.js, API routes, base de données cloud, gestion d’état et déploiement
* Projet interactif et visuellement présentable
* Facilement démontrable à un recruteur via un lien Vercel, screenshots ou vidéo

