// api/checkout.js — crée une session de paiement Stripe Checkout
const Stripe = require('stripe');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Méthode non autorisée' });
    return;
  }
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      res.status(500).json({ error: 'Clé Stripe manquante (variable STRIPE_SECRET_KEY).' });
      return;
    }
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const origin = req.headers.origin || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: process.env.CURRENCY || 'eur',
            product_data: {
              name: "L'IA au quotidien — Guide interactif",
              description: 'Accès complet au guide : 8 chapitres + 12 prompts à copier-coller.',
            },
            unit_amount: parseInt(process.env.PRICE_CENTS || '1900', 10), // 1900 = 19,00 €
          },
          quantity: 1,
        },
      ],
      // Après paiement, Stripe renvoie vers la page d'accès avec l'identifiant de session.
      success_url: `${origin}/acces.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/index.html`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
