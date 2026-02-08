const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  console.error('Missing ANTHROPIC_API_KEY environment variable');
  process.exit(1);
}

const SYSTEM_PROMPT = `You are Pearl, a friendly and helpful property assistant for The Pearl Craftsman — a luxury furnished monthly rental in Tobin Hill, San Antonio, TX.

PROPERTY DETAILS:
- 3BR/2BA, 1910 Craftsman with modern renovation, 1,100 sq ft
- Beds: 2 King, 1 Full, 1 Twin (sleeps up to 6 guests)
- $4,500/month, ALL utilities included (electric, water, gas, trash, 892 Mbps fiber internet, streaming)
- $300 one-time cleaning fee
- $2,000 refundable security deposit
- $500 non-refundable pet deposit (pets welcome!)
- 30-day minimum stay
- No smoking

AMENITIES:
- 892 Mbps fiber WiFi + dedicated workspace (perfect for remote work)
- Private Jacuzzi J-335 hot tub under lighted gazebo
- Weber grill, fire pit, gated yard
- 65" Smart TV with Netflix, Hulu, Max, Prime Video
- In-unit washer/dryer with supplies
- SimpliSafe security system
- Secure gated parking for up to 3 vehicles
- Fully equipped kitchen (dishwasher, microwave, full-size fridge)

LOCATION:
- Tobin Hill neighborhood, ~1.5 miles from downtown San Antonio
- Walking distance to The Pearl District
- Quick access to I-35, US-281, I-10
- Methodist Hospital Metropolitan: 0.8 miles
- Baptist Medical Center Downtown: 1.4 miles
- Children's Hospital of San Antonio: 1.8 miles
- Brooke Army Medical Center (BAMC): 4 miles
- Near HEB grocery, San Antonio Zoo, Brackenridge Park

HOSTS: Chad & Michelle — Superhosts with 160+ five-star reviews on Airbnb (4.93 rating)
CONTACT: chadwick23.ai@gmail.com
AIRBNB LISTING: https://www.airbnb.com/rooms/946153

BOOKING: Direct booking saves guests money (no platform fees). They can fill out the inquiry form on the website or email directly.

YOUR PERSONALITY:
- Warm, friendly, concise
- Enthusiastic about the property and San Antonio
- Always helpful and informative
- When asked about booking, direct them to the inquiry form on the page or to email chadwick23.ai@gmail.com
- Keep responses short (2-4 sentences usually) unless more detail is needed
- If you don't know something specific, say so honestly and suggest they reach out to Chad & Michelle directly`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array required' });
    }

    // Convert OpenAI-style messages to Anthropic format (filter out system role)
    const userMessages = messages.filter(m => m.role !== 'system').map(m => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content
    }));

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        system: SYSTEM_PROMPT,
        messages: userMessages,
        max_tokens: 512
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Anthropic error:', err);
      return res.status(500).json({ error: 'AI service error' });
    }

    const data = await response.json();
    res.json({ reply: data.content[0].text });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Serve static files — support both /airbnb-direct-booking/ path and root
const path = require('path');
app.use('/airbnb-direct-booking', express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, '..')));

const PORT = process.env.PORT || 3456;
app.listen(PORT, () => console.log(`Chat server running on http://localhost:${PORT}`));
