# L'IA au quotidien — boutique (Vercel + Stripe)

Page de vente + paiement Stripe + ebook protégé. Le contenu de l'ebook n'est jamais
servi publiquement : il vit dans `ebook-content.json` et n'est renvoyé par la fonction
`/api/unlock` qu'après confirmation du paiement auprès de Stripe.

## Structure

```
public/index.html      → page de vente (bouton « Débloquer l'accès »)
public/acces.html      → page d'arrivée après paiement (vérifie puis affiche l'ebook)
api/checkout.js        → crée la session de paiement Stripe
api/unlock.js          → vérifie le paiement et sert l'ebook
ebook-content.json     → l'ebook (lu UNIQUEMENT côté serveur)
package.json           → dépendance Stripe
```

## Déploiement (≈ 15 min)

### 1. Compte Stripe
- Crée un compte sur stripe.com.
- Récupère ta **clé secrète** dans Développeurs → Clés API.
  - Commence avec la clé **test** (`sk_test_...`) pour tout vérifier sans vrai paiement.

### 2. Mettre le projet sur GitHub
```bash
git init
git add .
git commit -m "boutique IA au quotidien"
# crée un dépôt sur github.com puis :
git remote add origin <url-de-ton-depot>
git push -u origin main
```

### 3. Déployer sur Vercel
- Va sur vercel.com → **Add New → Project** → importe ton dépôt GitHub.
- Avant de déployer, ajoute la variable d'environnement :
  - `STRIPE_SECRET_KEY` = ta clé secrète Stripe
- (Optionnel) :
  - `PRICE_CENTS` = prix en centimes (défaut `1900` = 19,00 €)
  - `CURRENCY` = devise (défaut `eur`)
- Clique **Deploy**.

### 4. Tester
- Ouvre l'URL Vercel, clique « Débloquer l'accès ».
- Sur la page Stripe, utilise la carte de test : `4242 4242 4242 4242`, date future, n'importe quel CVC.
- Tu dois être redirigé vers la page d'accès, et l'ebook s'affiche. ✅

### 5. Passer en vrai
- Quand tout marche : remplace `STRIPE_SECRET_KEY` par ta clé **live** (`sk_live_...`)
  dans Vercel (Settings → Environment Variables), puis redéploie.

## Modifier le prix / le contenu
- **Prix** : change la variable `PRICE_CENTS` dans Vercel.
- **Contenu de l'ebook** : édite `ebook-content.json` (ou régénère-le depuis ton HTML),
  puis redéploie.

## Note honnête sur la protection
Ce système vérifie un vrai paiement avant d'afficher l'ebook : impossible d'y accéder
sans avoir payé. En revanche, un acheteur pourrait techniquement partager son lien
d'accès (`/acces.html?session_id=...`). Pour un ebook à petit prix, c'est le standard
du marché et largement suffisant. Si un jour tu veux durcir : comptes clients,
liens à usage unique, ou filigrane personnalisé par acheteur.
