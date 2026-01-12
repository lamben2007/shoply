
### **Page de Validation de Commande (“Checkout”)**

#### **Objectifs**
- Permettre au client de finaliser son achat de manière fluide, sécurisée et intuitive.
- Collecter les informations nécessaires pour la livraison et le paiement.
- Fournir un récapitulatif complet de la commande avant validation définitive.

#### **Contenus/sections de la page**
1. **Adresse de livraison**
   - Affichage de l’adresse par défaut du client.
   - Possibilité de modifier ou d’ajouter une nouvelle adresse.

2. **Mode de livraison**
   - Liste des options disponibles (ex : standard, express, point relais).
   - Affichage des coûts et délais associés à chaque mode.

3. **Mode de paiement**
   - Liste des méthodes de paiement prises en charge (carte bancaire, PayPal, etc.).
   - Saisie des informations nécessaires, assurant la sécurité des données.

4. **Résumé de la commande**
   - Détail des articles : noms, quantités, prix unitaires.
   - Affichage du sous-total, des frais de livraison, éventuelles remises, et du montant total TTC.

5. **Champ code promo** (optionnel)
   - Permettre la saisie d’un code de réduction si applicable.

6. **Validation des Conditions Générales de Vente**
   - Case à cocher obligatoire “J’accepte les CGV”.

7. **Bouton de confirmation**
   - Bouton parfaitement visible pour passer la commande.
   - Validation des données et indication visuelle lors du traitement (loader).

8. **Gestion des erreurs**
   - Affichage d’erreur en cas de champ non renseigné, adresse invalide, problème de paiement, etc.

9. **Redirection et confirmation**
   - Après succès : redirection vers une page de confirmation (“Merci pour votre commande” avec récapitulatif et numéro de commande).

#### **Contraintes de conception**
- Adaptée mobile et desktop (responsive).
- Navigation fluide entre le panier et la page de checkout.
- Séparation claire entre chaque section (ex : sections, accordéons, ou étapes).
- Respect des normes RGPD pour collecte des informations personnelles.
- Interface claire, rassurante, sans surcharge de saisie.

---

 ### Maquette textuelle

+-------------------------------------------------------------+
| [Logo Site]                                    [Lien Panier] |
+-------------------------------------------------------------+

# Validation de votre commande

---------------------------------------------------------------
## 1. Adresse de livraison

[Adresse affichée]  
*Modifier* | *Ajouter une nouvelle adresse*

---------------------------------------------------------------
## 2. Mode de livraison

- ( ) Standard - 4,90€ - Livré sous 3 à 5 jours  
- ( ) Express  - 9,90€ - Livré sous 1 à 2 jours  
- ( ) Point relais - 3,50€ - Choisir un relais  

---------------------------------------------------------------
## 3. Mode de paiement

- ( ) Carte bancaire  *(Formulaire sécurisé)*  
- ( ) PayPal          *(Bouton de connexion PayPal)*  

---------------------------------------------------------------
## 4. Résumé de la commande

| Article        | Qté | Prix  | Total |
|:--------------:|:---:|:-----:|:-----:|
| Nom produit 1  |  2  | 19 €  | 38 €  |
| Nom produit 2  |  1  | 12 €  | 12 €  |

**Sous-total :** 50 €  
**Frais de livraison :** 4,90 €  
**Code promo :** `[Entrer un code]` `[Valider]`  
**Remise :** -5 €  
**TOTAL À PAYER :** **49,90 €**

---------------------------------------------------------------
## 5. Validation et confirmation

- [ ] J’accepte les Conditions Générales de Vente (CGV)

---------------------------------------------------------------
**[CONFIRMER ET PAYER]**

---

### Feedback utilisateur

- Loader/indicateur lors du traitement
- En cas de succès : redirection vers “Merci pour votre commande” avec :
    - Numéro de commande
    - Récapitulatif
    - Boutons retour accueil/comptes/commandes
- En cas d’erreur : messages d’erreur explicites

---

*Footer : mentions légales, contact, CGV, etc.*