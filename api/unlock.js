// api/unlock.js — vérifie le paiement auprès de Stripe, puis sert l'ebook.
// Le contenu n'est jamais exposé publiquement : il vit dans ebook-content.json,
// lu uniquement côté serveur après confirmation du paiement.
const Stripe = require('stripe');
const ebook = require('../ebook-content.json');

module.exports = async (req, res) => {
  try {
    const sessionId = req.query.session_id;
    if (!sessionId) {
      res.status(400).send('Accès réservé : aucun paiement associé.');
      return;
    }
    if (!process.env.STRIPE_SECRET_KEY) {
      res.status(500).send('Configuration incomplète (clé Stripe manquante).');
      return;
    }

    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session || session.payment_status !== 'paid') {
      res.status(402).send('Paiement non confirmé.');
      return;
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).send(ebook.html);
  } catch (err) {
    res.status(500).send('Erreur de vérification : ' + err.message);
  }
};
