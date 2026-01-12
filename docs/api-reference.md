
---

# API Documentation (App Router Next.js)

## Authentification
> **NB** : Presque tous les endpoints nécessitent un utilisateur connecté (cookie Supabase).

---

## `/api/profile`

### GET `/api/profile`
- **Description** : Retourne le profil de l'utilisateur courant.
- **Réponse**
  - 200: profile utilisateur (voir ci-dessous)
  - 401: `{ "error": "Non authentifié" }`

```json
{
  "id": "USER_ID",
  "email": "john@doe.com",
  "firstName": "John",
  "lastName": "Doe"
}
```

### POST `/api/profile`
- **Description** : Met à jour le prénom/nom du profil utilisateur courant.
- **Payload attendu**
```json
{
  "firstName": "John",
  "lastName": "Doe"
}
```
- **Réponse**
  - 200: profil modifié (même format que GET)
  - 401: non authentifié
  - 404: si profil absent

---

## `/api/test-db`

### GET `/api/test-db`
- **Description** : Retourne le nombre de produits (utile pour vérif DB).
- **Réponse**
  - 200: `{ "count": 42 }`
  - 500: `{ "error": "message" }`

---

## `/api/products`

### GET `/api/products`
- **Description** : Liste tous les produits.
- **Réponse**
  - 200: `{ "products": [ ... ] }` (tableau d'objets produit)
  - 500: Erreur serveur

**Exemple de réponse :**
```json
{
  "products": [
    {
      "id": "PROD_1",
      "name": "Chaussures",
      "slug": "chaussures",
      "price": 49.9,
      ...
    }
  ]
}
```

---

## `/api/products/[slug]`

### GET `/api/products/[slug]`
- **Description** : Récupère un produit par son slug.
- **Paramètre** : `slug` (dans l'URL)
- **Réponse**
  - 200 : objet produit
  - 404 : `{ "error": "Produit introuvable" }`

---

## `/api/orders`

### GET `/api/orders`
- **Description** : Liste les commandes de l'utilisateur courant.
- **Réponse**
  - 200: tableau de commandes
  - 401: non authentifié

**Exemple de réponse :**
```json
[
  {
    "id": "ORDER1",
    "status": "PENDING",
    "total": 100,
    "shippingId": "ADDR1",
    "billingId": "ADDR2",
    "createdAt": "2024-05-10T22:01:00.000Z",
    "updatedAt": "2024-05-10T22:01:00.000Z",
    "items": [
      {
        "id": "ITEM1",
        "productId": "PROD_1",
        "name": "Chaussures",
        "price": 49.9,
        "quantity": 2,
        "imageUrl": null
      }
    ]
  }
]
```

### POST `/api/orders`
- **Description** : Crée une commande à partir d’un panier.
- **Payload attendu** :
```json
{
  "status": "PENDING",
  "total": 100,
  "shippingId": "ADDR_SHIP",
  "billingId": "ADDR_BILL",
  "items": [
    {
      "productId": "PROD_1",
      "name": "Chaussures",
      "price": 49.9,
      "quantity": 2,
      "imageUrl": "https://cdn..."
    }
  ]
}
```
- **Réponse**
  - 201: commande créée (format identique GET ci-dessus)
  - 400: input invalide (`details`)
  - 401: non authentifié

---

## `/api/orders/[orderId]`

### GET `/api/orders/[orderId]`
- **Description** : Détail d’une commande par son id.
- **Paramètre** : `orderId` (UUID)
- **Réponse**
  - 200: commande (voir exemple ci-dessus)
  - 400: id invalide
  - 404: pas trouvée

---

## `/api/address`

### GET `/api/address`
- **Description** : Liste toutes les adresses de l'utilisateur courant.
- **Réponse**
  - 200: tableau d’objets adresse
  - 401: non authentifié

### POST `/api/address`
- **Description** : Ajoute une adresse à l'utilisateur courant.
- **Payload attendu** :  
  (dépend du schéma `address`, par défaut champs libres)
- **Réponse**
  - 201: adresse créée
  - 401: non authentifié

---

## `/api/address/[id]`

### GET `/api/address/[id]`
- **Description** : Détail d’une adresse (courant, id)
- **Réponse**
  - 200: objet adresse
  - 401: non authentifié
  - 400: id manquant
  - 404: pas trouvée

### PUT `/api/address/[id]`
- **Description** : Modifie une adresse (du user courant).
- **Payload attendu** : champs à mettre à jour
- **Réponse**
  - 200: adresse modifiée
  - 401/400/404: selon auth, id manquant, not found

### DELETE `/api/address/[id]`
- **Description** : Supprime une adresse (user courant).
- **Réponse**
  - 204: succès, pas de contenu
  - 401/400/404: selon auth, id manquant, not found

---

## `/api/address/default-shipping/[id]`

### POST `/api/address/default-shipping/[id]`
- **Description** : Définit l’adresse comme “livraison par défaut” de l'utilisateur courant (désactive l’ancienne).
- **Paramètre** : id (adresse)
- **Réponse**
  - 200: objet adresse mise à jour
  - 400: id manquant
  - 401: non authentifié
  - 403: non autorisé (pas ton adresse)
  - 404: adresse non trouvée

---

# Récapitulatif : Table globale

| Méthode | Endpoint                                 | Description                                          | Auth |
|---------|------------------------------------------|------------------------------------------------------|------|
| GET     | /api/profile                            | Récupère le profil utilisateur courant               | Oui  |
| POST    | /api/profile                            | Modifie le profil utilisateur courant                | Oui  |
| GET     | /api/products                           | Liste tous les produits                              | Non  |
| GET     | /api/products/[slug]                    | Produit par son slug                                 | Non  |
| GET     | /api/test-db                            | Indique le nombre de produits (dev/test)             | Non  |
| GET     | /api/orders                             | Liste des commandes de l'utilisateur                 | Oui  |
| POST    | /api/orders                             | Création de commande                                 | Oui  |
| GET     | /api/orders/[orderId]                   | Détail d'une commande                                | Oui  |
| GET     | /api/address                            | Liste des adresses de l'utilisateur                  | Oui  |
| POST    | /api/address                            | Ajout d'une adresse                                  | Oui  |
| GET     | /api/address/[id]                       | Consultation d'une adresse                           | Oui  |
| PUT     | /api/address/[id]                       | Modification d'une adresse                           | Oui  |
| DELETE  | /api/address/[id]                       | Suppression d'une adresse                            | Oui  |
| POST    | /api/address/default-shipping/[id]      | Définit l'adresse comme par défaut (livraison)       | Oui  |

---

