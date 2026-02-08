// Simple form handler that forwards inquiries to Gmail via gog CLI
// Run: node form-handler.js (listens on port 3457)
// The booking site POSTs form data here, we email it to Chad

const http = require('http');
const { execSync } = require('child_process');

const PORT = 3457;
const TO_EMAIL = 'chadwick23.ai@gmail.com';

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/inquiry') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const { name, email, phone, source, move_in, move_out, guests, pets, message } = data;

        const emailBody = [
          `New Inquiry from The Pearl Craftsman Direct Booking Site`,
          ``,
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone || 'Not provided'}`,
          `How they found us: ${source || 'Not specified'}`,
          ``,
          `Move-in: ${move_in}`,
          `Move-out: ${move_out}`,
          `Guests: ${guests}`,
          `Pets: ${pets || 'No'}`,
          ``,
          `Message:`,
          message || '(No message)',
          ``,
          `---`,
          `Sent from your direct booking site`
        ].join('\n');

        const subject = `🏠 New MTR Inquiry: ${name} (${move_in} → ${move_out})`;

        // Write body to temp file for gog
        const tmpFile = `/tmp/inquiry-${Date.now()}.txt`;
        require('fs').writeFileSync(tmpFile, emailBody);

        // Send via gog
        execSync(`gog gmail send --to "${TO_EMAIL}" --subject "${subject}" --body-file "${tmpFile}"`, {
          timeout: 15000
        });

        // Clean up
        require('fs').unlinkSync(tmpFile);

        // Also notify via Telegram through OpenClaw
        console.log(`✅ Inquiry from ${name} (${email}) — ${move_in} to ${move_out}, ${guests} guests`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, message: 'Inquiry sent!' }));
      } catch (err) {
        console.error('Error processing inquiry:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, message: 'Failed to send inquiry' }));
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`📬 Form handler listening on port ${PORT}`);
});
