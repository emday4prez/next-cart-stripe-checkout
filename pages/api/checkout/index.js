const stripe = require('stripe')(process.env.STRIPE_SECRET_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { items } = req.body;

      let lineItems = [];

      items.forEach((item) => {
        lineItems.push({
          price: item.id,
          quantity: item.quantity,
        });
      });

      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
      });
      res.status(200).json({ url: session.url });
    } catch (err) {
      console.log('There was an error creating the checkout session');
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
