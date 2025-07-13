// api/create-checkout-session.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * @param {import('@vercel/node').VercelRequest} req
 * @param {import('@vercel/node').VercelResponse} res
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { planType } = req.body;

    const amountMap = {
      pro: 800,   // $8.00
      team: 2500  // $25.00
    };

    const price = amountMap[planType];
    if (!price) {
      return res.status(400).json({ error: 'Invalid plan type' });
    }

    const origin = req.headers.origin || process.env.FRONTEND_URL;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: price,
            product_data: {
              name: `AutoForm AI ${planType} Plan`,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/form-builder`,
      cancel_url: `${origin}/`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('❌ Stripe error:', err.message);
    return res.status(500).json({ error: 'Stripe session creation failed', details: err.message });
  }
}
