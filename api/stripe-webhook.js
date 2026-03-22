/**
 * Stripe webhook handler
 * POST /api/stripe-webhook
 *
 * Listens for successful deposit payments and sends a Telegram alert.
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const https = require('https');
const { execSync } = require('child_process');

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const TELEGRAM_CHAT_ID = '8596640145';

async function sendTelegram(text) {
  try {
    execSync(
      `openclaw message send --channel telegram --target ${TELEGRAM_CHAT_ID} --message ${JSON.stringify(text)}`,
      { encoding: 'utf-8', stdio: 'pipe' }
    );
  } catch (err) {
    console.error('Telegram send failed:', err.message);
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end('Method not allowed');
  }

  const sig = req.headers['stripe-signature'];

  // Read raw body for signature verification
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  const rawBody = Buffer.concat(chunks);

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`Stripe event: ${event.type}`);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const amount = (session.amount_total / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    const guestEmail = session.customer_email || 'unknown';
    const moveIn = session.metadata?.move_in_date || 'not specified';
    const months = session.metadata?.months || 'not specified';
    const guestName = session.metadata?.guest_name || 'unknown';

    const msg = `💰 *Deposit Received — The Pearl Craftsman*

*Amount:* ${amount}
*Guest:* ${guestName}
*Email:* ${guestEmail}
*Move-in:* ${moveIn}
*Duration:* ${months} month(s)
*Session ID:* ${session.id}

Follow up with a lease agreement!`;

    await sendTelegram(msg);
    console.log('Telegram alert sent for deposit payment');
  }

  res.status(200).json({ received: true });
};
