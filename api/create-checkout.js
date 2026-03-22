/**
 * Vercel serverless function — creates a Stripe Checkout session for the deposit.
 * POST /api/create-checkout
 * Body: { moveInDate, months, guestName, guestEmail }
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const DEPOSIT_AMOUNT = 150000; // $1,500.00 in cents
const PROPERTY_NAME = 'The Pearl Craftsman — Tobin Hill, San Antonio';
const SUCCESS_URL = process.env.SITE_URL
  ? `${process.env.SITE_URL}/?deposit=success`
  : 'https://thepearlcraftsman.com/?deposit=success';
const CANCEL_URL = process.env.SITE_URL
  ? `${process.env.SITE_URL}/?deposit=cancel`
  : 'https://thepearlcraftsman.com/?deposit=cancel';

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { moveInDate, months, guestName, guestEmail } = req.body || {};

  try {
    const description = [
      moveInDate ? `Move-in: ${moveInDate}` : null,
      months ? `${months} month${months > 1 ? 's' : ''}` : null,
    ]
      .filter(Boolean)
      .join(' · ');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Security Deposit — ${PROPERTY_NAME}`,
              description: description || 'Refundable security deposit for furnished monthly rental',
              images: ['https://thepearlcraftsman.com/photos/photo-01.jpg'],
            },
            unit_amount: DEPOSIT_AMOUNT,
          },
          quantity: 1,
        },
      ],
      customer_email: guestEmail || undefined,
      metadata: {
        guest_name: guestName || '',
        move_in_date: moveInDate || '',
        months: months ? String(months) : '',
        property: 'pearl-craftsman-san-antonio',
      },
      success_url: SUCCESS_URL,
      cancel_url: CANCEL_URL,
    });

    return res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error('Stripe error:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
