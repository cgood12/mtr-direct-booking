# San Antonio Direct Booking Site

Direct booking landing page for Chad's San Antonio Airbnb property.

## Property Details
- **Airbnb ID:** 53517451
- **Type:** 3BR / 2BA / 4 Beds
- **Rating:** 4.93★ (Superhost)
- **Location:** San Antonio, TX
- **Near:** Lackland AFB, Fort Sam Houston, Downtown

## Why Direct Booking?

- Airbnb takes 3% from hosts + charges guests 14-20% in fees
- Direct booking saves guests 10-20% while increasing host profit
- Builds customer relationship for repeat bookings
- No platform dependency

## Target Audiences

1. **Military Personnel** - PCS moves, TDY, training at nearby bases
2. **Medical Travelers** - Visiting nearby hospitals
3. **Business Travelers** - Downtown access, quiet workspace
4. **Families** - SeaWorld, Six Flags, River Walk

## Pricing Strategy

| Length | Rate | Discount |
|--------|------|----------|
| Nightly | $159/night | Base rate |
| Weekly (7+) | $143/night | 10% off |
| Monthly (30+) | $127/night | 20% off |
| Military/First Responder | Additional 5% off | With valid ID |

**Cleaning Fee:** $75 (flat)
**Minimum Stay:** 2 nights

## Setup Steps

1. **Form Handling:** Replace `YOUR_FORM_ID` in the HTML with a Formspree ID
   - Go to formspree.io
   - Create free account
   - Create new form
   - Copy form ID into action URL

2. **Phone Number:** Update the contact phone number in footer

3. **Images:** 
   - Current images are Unsplash placeholders
   - Replace with actual property photos
   - Host photos on Imgur, Cloudinary, or similar

4. **Domain (Optional):**
   - Register domain like `sanantoniostays.com`
   - Point to hosting or use Cloudflare Pages

## Deployment

Currently served via:
```
https://chads-mac-mini.tail79bf4f.ts.net/airbnb-direct-booking/
```

For production:
- Vercel: `vercel --prod`
- Netlify: drag & drop
- Cloudflare Pages: connect to Git

## Marketing Ideas

### For Military Audiences
- Post in military spouse Facebook groups
- List on AHRN (Automated Housing Referral Network)
- Contact Lackland housing office for referral list
- Military travel forums

### For Medical Travelers
- Contact hospital social workers
- Medical travel coordinator websites
- Insurance housing networks

### For Direct Traffic
- Google Business Profile (service-area business)
- Facebook page with booking link
- Respond to Airbnb inquiries with direct booking offer (careful - ToS)

## Analytics

Add Google Analytics or Plausible for tracking:
```html
<!-- Add before </head> -->
<script defer data-domain="your-domain.com" src="https://plausible.io/js/script.js"></script>
```

## Availability Sync

To avoid double-bookings:
1. Use a shared calendar (Google/iCal)
2. Block dates in Airbnb when direct booked
3. Consider channel manager if scaling (Hospitable, OwnerRez)

## Revenue Projection

| Scenario | Occupancy | Monthly Revenue | Annual |
|----------|-----------|-----------------|--------|
| Conservative | 50% | $2,385 | $28,620 |
| Moderate | 65% | $3,100 | $37,200 |
| Optimistic | 80% | $3,816 | $45,792 |

*Assumes $159/night avg, 30 days/month, minus cleaning*

## TODO

- [ ] Set up Formspree form
- [ ] Update phone number
- [ ] Replace placeholder images with real photos
- [ ] Test booking flow
- [ ] Set up calendar sync
- [ ] Add analytics
- [ ] Marketing push to military channels

---

Built by Gus 🪐 | Feb 2026
