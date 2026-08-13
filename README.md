# Marshall Automotive LLC — Astro + Decap CMS

Mock-up marketing site for Marshall Automotive LLC (4235 Lebanon Pike, Hermitage, TN 37076).
Static Astro build, no backend, no email routing, no database.

## Commands

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview
```

Re-generate the WebP assets from the source `../Images` folder (already done once):

```bash
node scripts/convert-images.mjs
```

## Structure

```
public/
  admin/          Decap CMS (index.html + config.yml)
  images/         WebP assets (hero-bg, engine-work, ss-grille, logo)
src/
  data/           settings.json, home.json, about.json, services.json, contact.json
  content/
    reviews/      one JSON file per testimonial
    faqs/         one JSON file per question
  components/     Header, Footer, Icon, Hex, Testimonials, CtaBand, FaqList, ReviewCard, BookingForm
  layouts/        BaseLayout.astro
  pages/          index, services, about, reviews, contact, booking, thanks
  styles/         global.css (all site styling)
```

## Pages

| Route       | Purpose                                             |
| ----------- | --------------------------------------------------- |
| `/`         | Home — hero, features, services, about, reviews, CTA |
| `/services` | Full service list + FAQ                             |
| `/reviews`  | Yelp 4.8 / BBB 5-star badges + all testimonials     |
| `/about`    | Story, values, hours, location                      |
| `/contact`  | Contact details, hours, map, full FAQ               |
| `/booking`  | Appointment / drop-off request form                 |
| `/thanks`   | Post-submit landing page                            |

## Tap-to-call

`settings.phone_link` (`tel:+16157321894`) drives the header call button, the footer,
the CTA band, and a fixed bottom call bar that appears on screens under 820px.

## The booking form

`src/components/BookingForm.astro` carries `data-netlify="true"`, a `form-name` hidden
input, and a honeypot — the Netlify plumbing is prepped but nothing is wired to email or
a database. Submissions go to `/thanks`, which says plainly that this is a demo.

## Decap CMS

Admin panel: `/admin/`.

- Backend: `git-gateway` on `unit6854/Marshall-Automotive`, branch `main`.
- Netlify Identity widget is loaded in `public/admin/index.html`; invite the owner from
  the Netlify dashboard (Identity → Invite users) and enable Git Gateway there.
- Collections: **Global Settings** (phone/address/hours/social), **Pages** (Home, About,
  Services, Contact), **Reviews / Testimonials**, **FAQs**.
- Uploaded images land in `public/images` and are referenced as `/images/...`.

### Editing content locally (no login)

`config.yml` has `local_backend: true`. In two terminals:

```bash
npx decap-server
```

```bash
npm run dev
```

Then open <http://localhost:4321/admin/>. Set `local_backend: false` before going live.

## Notes

- Every image on the site is WebP at quality 100 (the logo is lossless WebP). Sources live
  in `../Images` and `../Images/Thumbs`; run `node scripts/convert-images.mjs` to rebuild.
- Service card thumbnails are cropped to the card ratio at 800x664 (2x for the ~280px
  card) and share one dark grayscale treatment in CSS so the set reads consistently.
  Swap any of them in the CMS under `Pages → Services Page → Thumbnail Image`.
- The contact page embeds a Google Maps iframe; remove it if any third-party request is
  unwanted for the pitch.
