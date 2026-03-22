/**
 * Vercel serverless function — fetches Airbnb iCal and returns blocked dates as JSON.
 * GET /api/availability
 *
 * Returns: { blockedDates: ["2026-03-19", "2026-03-20", ...] }
 * Cached for 1 hour via Vercel edge cache.
 */

const https = require('https');

const ICAL_URL = process.env.AIRBNB_ICAL_URL ||
  'https://www.airbnb.com/calendar/ical/53517451.ics?t=7b23033ca21c49f799203933aa267a70';

function fetchIcal(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function parseIcal(ical) {
  const blockedDates = new Set();
  const events = ical.split('BEGIN:VEVENT');

  for (const event of events.slice(1)) {
    const startMatch = event.match(/DTSTART(?:;VALUE=DATE)?:(\d{8})/);
    const endMatch = event.match(/DTEND(?:;VALUE=DATE)?:(\d{8})/);

    if (!startMatch || !endMatch) continue;

    const start = parseDate(startMatch[1]);
    const end = parseDate(endMatch[1]);

    // Add every date in the range (end is exclusive in iCal)
    const cur = new Date(start);
    while (cur < end) {
      blockedDates.add(cur.toISOString().split('T')[0]);
      cur.setDate(cur.getDate() + 1);
    }
  }

  return Array.from(blockedDates).sort();
}

function parseDate(str) {
  // YYYYMMDD → Date
  const y = str.slice(0, 4);
  const m = str.slice(4, 6);
  const d = str.slice(6, 8);
  return new Date(`${y}-${m}-${d}T00:00:00Z`);
}

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=600');

  try {
    const ical = await fetchIcal(ICAL_URL);
    const blockedDates = parseIcal(ical);
    return res.status(200).json({ blockedDates, updatedAt: new Date().toISOString() });
  } catch (err) {
    console.error('iCal fetch failed:', err.message);
    return res.status(500).json({ error: 'Could not fetch availability', blockedDates: [] });
  }
};
