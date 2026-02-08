(function() {
  const BOT_NAME = 'Pearl';
  const CONTACT_EMAIL = 'chadwick23.ai@gmail.com';

  // Knowledge base — pattern matching with keywords
  const KB = [
    {
      patterns: ['price', 'cost', 'how much', 'rent', 'rate', 'monthly', 'per month', 'afford'],
      answer: `Rent is <strong>$4,500/month</strong> with all utilities included (electric, water, gas, trash, 892 Mbps fiber internet, and streaming services). There's a one-time $300 cleaning fee and a $2,000 refundable security deposit. No hidden fees!`
    },
    {
      patterns: ['minimum stay', 'how long', 'shortest', 'lease term', 'month to month', 'how many months'],
      answer: `The minimum stay is <strong>30 days</strong>. We're happy to accommodate longer stays — many of our guests stay 2-6 months. We can work with your schedule!`
    },
    {
      patterns: ['pet', 'dog', 'cat', 'animal'],
      answer: `Yes, pets are welcome! 🐾 There's a <strong>$500 non-refundable pet deposit</strong>. We love furry guests.`
    },
    {
      patterns: ['parking', 'car', 'garage', 'vehicle', 'drive'],
      answer: `We have <strong>secure gated parking for up to 3 vehicles</strong>. It's included in your stay — no extra charge.`
    },
    {
      patterns: ['wifi', 'internet', 'work from home', 'remote work', 'workspace', 'wfh', 'work remotely', 'mbps'],
      answer: `Absolutely! We have <strong>892 Mbps fiber WiFi</strong> and a dedicated workspace. Perfect for remote work — video calls, uploads, everything runs smooth. Many of our guests work from home here.`
    },
    {
      patterns: ['hospital', 'nurse', 'travel nurse', 'medical', 'methodist', 'baptist', 'healthcare', 'assignment'],
      answer: `Great location for medical professionals! Nearby hospitals:\n• <strong>Methodist Hospital Metropolitan</strong> — 0.8 miles\n• <strong>Baptist Medical Center</strong> — 1.4 miles\n• <strong>Children's Hospital of SA</strong> — 1.8 miles\n• <strong>BAMC</strong> — 4 miles\n• <strong>University Hospital</strong> — 10.4 miles`
    },
    {
      patterns: ['amenit', 'include', 'what comes', 'what\'s in', 'features', 'offer'],
      answer: `The home comes fully loaded:\n• 892 Mbps fiber WiFi + workspace\n• Private Jacuzzi J-335 hot tub\n• 65" Smart TV (Netflix, Hulu, Max, Prime)\n• Full kitchen with dishwasher\n• In-unit washer/dryer with supplies\n• Weber grill & fire pit\n• SimpliSafe security system\n• Gated parking (up to 3 cars)\n\nAll utilities included!`
    },
    {
      patterns: ['hot tub', 'jacuzzi', 'spa', 'tub'],
      answer: `Yes! There's a <strong>private Jacuzzi J-335 hot tub</strong> under a lighted gazebo in the backyard. It's a guest favorite — perfect after a long day. 🛁`
    },
    {
      patterns: ['bedroom', 'bed', 'sleep', 'guest', 'how many people', 'occupancy', 'capacity'],
      answer: `The home has <strong>3 bedrooms</strong> with 4 beds:\n• Master: King bed\n• Second bedroom: King bed\n• Third bedroom: Full + Twin\n\nMax occupancy is <strong>6 guests</strong>.`
    },
    {
      patterns: ['location', 'where', 'neighborhood', 'area', 'tobin', 'pearl', 'downtown', 'address'],
      answer: `We're in <strong>Tobin Hill</strong>, one of San Antonio's best neighborhoods. Walking distance to The Pearl District, less than 5 minutes to Methodist & Baptist hospitals, and quick access to I-35, US-281, and I-10. HEB grocery is nearby too!`
    },
    {
      patterns: ['book', 'reserve', 'inquir', 'available', 'availability', 'schedule', 'move in', 'move-in'],
      answer: `To book or check availability, you can:\n• Fill out the <a href="#inquiry" onclick="document.getElementById('pearl-chat-window').style.display='none';document.getElementById('pearl-chat-bubble').style.display='flex';">inquiry form</a> on this page\n• Email us directly at <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>\n\nWe typically respond within 24 hours!`
    },
    {
      patterns: ['smoking', 'smoke', 'vape'],
      answer: `Sorry, this is a <strong>strictly no-smoking property</strong> (including vaping). This applies indoors and outdoors. 🚭`
    },
    {
      patterns: ['laundry', 'washer', 'dryer', 'wash clothes'],
      answer: `Yes! There's an <strong>in-unit washer and dryer</strong> with laundry supplies included. No trips to the laundromat needed. 🧺`
    },
    {
      patterns: ['kitchen', 'cook', 'food', 'grocery'],
      answer: `The home has a <strong>fully equipped kitchen</strong> with a dishwasher, microwave, full-size fridge, and all the essentials. HEB grocery store is just a short drive away. Many guests cook every night!`
    },
    {
      patterns: ['security', 'safe', 'safety', 'secure', 'alarm'],
      answer: `The property has a <strong>SimpliSafe security system</strong> and <strong>secure gated parking</strong>. Tobin Hill is a quiet, established neighborhood — you'll feel right at home.`
    },
    {
      patterns: ['tv', 'television', 'netflix', 'streaming', 'hulu', 'entertainment'],
      answer: `There's a <strong>65" Smart TV</strong> with Netflix, Hulu, Max (HBO), and Prime Video all included. Cozy up on the couch! 📺`
    },
    {
      patterns: ['checkout', 'check out', 'check-out', 'checkin', 'check in', 'check-in', 'key', 'access'],
      answer: `We offer <strong>self check-in</strong> for your convenience. We'll send you all the details (access codes, WiFi info, house guide) before your arrival. Easy and stress-free!`
    },
    {
      patterns: ['airbnb', 'review', 'rating', 'stars'],
      answer: `We have a <strong>4.93★ rating with 160+ reviews</strong> on Airbnb! Guests love the location, cleanliness, and amenities. Booking direct saves you Airbnb's service fees. 💰`
    },
    {
      patterns: ['host', 'chad', 'michelle', 'who', 'owner'],
      answer: `We're <strong>Chad & Michelle</strong>, Superhosts based in Austin, TX. We've been hosting for years with 160+ five-star reviews. We're responsive, friendly, and want you to have an amazing stay!`
    },
    {
      patterns: ['hello', 'hi', 'hey', 'sup', 'good morning', 'good afternoon', 'good evening', 'howdy'],
      answer: `Hey there! 👋 I'm Pearl, your property assistant. I can answer questions about the home, pricing, amenities, location, and booking. What would you like to know?`
    },
    {
      patterns: ['thank', 'thanks', 'appreciate', 'awesome', 'great', 'perfect'],
      answer: `You're welcome! 😊 If you have any other questions, I'm here. When you're ready to book, just fill out the <a href="#inquiry">inquiry form</a> or email us at <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.`
    },
    {
      patterns: ['deposit', 'refund'],
      answer: `There's a <strong>$2,000 refundable security deposit</strong> (returned after checkout inspection) and a <strong>$500 non-refundable pet deposit</strong> if bringing pets. The $300 cleaning fee is one-time.`
    },
    {
      patterns: ['utility', 'utilities', 'electric', 'water', 'bill', 'gas'],
      answer: `<strong>All utilities are included!</strong> Electric, water, gas, trash, 892 Mbps fiber internet, and streaming services. Your $4,500/month covers everything — no surprise bills.`
    }
  ];

  const FALLBACK = `I'm not sure about that one! For specific questions, you can:\n• Email Chad & Michelle at <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>\n• Fill out the <a href="#inquiry">inquiry form</a>\n\nOr try asking me about pricing, amenities, location, hospitals, pets, or booking!`;

  const SUGGESTIONS = [
    'How much is rent?',
    'What amenities are included?',
    'Tell me about nearby hospitals',
    'Is it good for remote work?',
    'How do I book?'
  ];

  function findAnswer(input) {
    const lower = input.toLowerCase().trim();
    let bestMatch = null;
    let bestScore = 0;

    for (const entry of KB) {
      let score = 0;
      for (const pattern of entry.patterns) {
        if (lower.includes(pattern)) score++;
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    }

    return bestScore > 0 ? bestMatch.answer : FALLBACK;
  }

  // Build DOM
  function init() {
    // Chat bubble
    const bubble = document.createElement('div');
    bubble.id = 'pearl-chat-bubble';
    bubble.innerHTML = '💬';
    bubble.title = 'Chat with Pearl';
    bubble.setAttribute('role', 'button');
    bubble.setAttribute('aria-label', 'Open chat with Pearl, property assistant');
    bubble.tabIndex = 0;

    // Chat window
    const win = document.createElement('div');
    win.id = 'pearl-chat-window';
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', 'Chat with Pearl');
    win.innerHTML = `
      <div class="pearl-chat-header">
        <div class="pearl-chat-header-info">
          <div class="pearl-chat-header-name">Pearl 💬</div>
          <div class="pearl-chat-header-status">Property Assistant</div>
        </div>
        <button class="pearl-chat-close" aria-label="Close chat">&times;</button>
      </div>
      <div class="pearl-chat-messages" id="pearl-chat-messages"></div>
      <div class="pearl-chat-suggestions" id="pearl-chat-suggestions"></div>
      <div class="pearl-chat-input-wrap">
        <input type="text" id="pearl-chat-input" placeholder="Ask me anything about the property..." aria-label="Type your message">
        <button id="pearl-chat-send" aria-label="Send message">→</button>
      </div>
    `;

    document.body.appendChild(bubble);
    document.body.appendChild(win);

    // Events
    bubble.addEventListener('click', () => toggleChat(true));
    bubble.addEventListener('keydown', (e) => { if (e.key === 'Enter') toggleChat(true); });
    win.querySelector('.pearl-chat-close').addEventListener('click', () => toggleChat(false));

    const input = document.getElementById('pearl-chat-input');
    const sendBtn = document.getElementById('pearl-chat-send');

    sendBtn.addEventListener('click', () => sendMessage());
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(); });

    // Welcome message
    setTimeout(() => {
      addMessage('bot', `Hi! I'm Pearl 👋 I can help you with questions about this furnished rental — pricing, amenities, location, hospitals, booking, and more. What would you like to know?`);
      showSuggestions();
    }, 500);
  }

  function toggleChat(open) {
    const bubble = document.getElementById('pearl-chat-bubble');
    const win = document.getElementById('pearl-chat-window');
    if (open) {
      bubble.style.display = 'none';
      win.style.display = 'flex';
      document.getElementById('pearl-chat-input').focus();
    } else {
      win.style.display = 'none';
      bubble.style.display = 'flex';
    }
  }

  function addMessage(role, html) {
    const container = document.getElementById('pearl-chat-messages');
    const msg = document.createElement('div');
    msg.className = 'pearl-msg pearl-msg-' + role;
    msg.innerHTML = html;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
  }

  function showSuggestions() {
    const container = document.getElementById('pearl-chat-suggestions');
    container.innerHTML = '';
    SUGGESTIONS.forEach(text => {
      const btn = document.createElement('button');
      btn.className = 'pearl-suggestion';
      btn.textContent = text;
      btn.addEventListener('click', () => {
        document.getElementById('pearl-chat-input').value = text;
        sendMessage();
      });
      container.appendChild(btn);
    });
  }

  function hideSuggestions() {
    document.getElementById('pearl-chat-suggestions').innerHTML = '';
  }

  function sendMessage() {
    const input = document.getElementById('pearl-chat-input');
    const text = input.value.trim();
    if (!text) return;

    addMessage('user', escapeHtml(text));
    input.value = '';
    hideSuggestions();

    // Simulate brief "typing" delay
    setTimeout(() => {
      const answer = findAnswer(text);
      addMessage('bot', answer);
    }, 300 + Math.random() * 400);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
