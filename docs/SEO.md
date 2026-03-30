# SK Traders SEO Documentation

This document provides a comprehensive overview of the SEO (Search Engine Optimization) implementation for the SK Traders landing page.

---

## 1. Metadata Configuration
Located in: `src/app/layout.tsx`

### Title Tag & Meta Description
We've implemented **"Option 3"**, which is optimized for local search results in Trivandrum and highlights all three core services.

| Parameter | Value | Rationale |
| :--- | :--- | :--- |
| **Title Tag** | `SK Traders Trivandrum \| Tiles, Waterproofing & Construction` | Includes localized keywords and service categories within the 60-character limit. |
| **Meta Description** | `The leading choice in Trivandrum for premium interlocking tiles, durable waterproofing, and professional construction services. Quality you can trust from SK Traders.` | Compelling, clear, and contains all secondary keywords. |

### Advanced Metadata
- **Keywords**: `["Interlocking Tiles Trivandrum", "Waterproofing Services Kerala", "House Construction Trivandrum", "Tile Supplier Kerala", "SK Traders"]`
- **Theme Color**: `#E1AD01` (Sets the browser address bar color to matches the brand gold).
- **Authors**: `[{ name: "SK Traders" }]`
- **Canonical URL**: `https://sktraders.com` (Ensures Google knows the preferred URL for the site).

---

## 2. Social Media & Sharing (OpenGraph)
> [!IMPORTANT]
> This ensures that when the site URL is shared on **WhatsApp**, **Facebook**, or **Twitter**, it appears with a professional preview image and clear text.

- **OpenGraph Image**: Set to `/logo.png`.
- **Twitter Card**: `summary_large_image` (Shows a larger preview image on X/Twitter).
- **Preview Title**: Same as the expert-level Title Tag.
- **Locale**: `en_IN` (English, India).

---

## 3. Search Engine Crawling Files
Located in: `public/`

### Robots.txt
- **URL**: `public/robots.txt`
- **Status**: **Enabled**
- **Function**: Tells Google's "bots" to index all public pages but **ignore** the private admin dashboard (`/admin`), preserving your login security in search results.

### Sitemap.xml
- **URL**: `public/sitemap.xml`
- **Status**: **Enabled**
- **Function**: A "roadmap" that helps Google find and index your latest services faster by providing a clear structure of the site's URLs.

---

## 4. Mobile SEO Optimization
- **Viewport Config**: `width=device-width, initial-scale=1` (Ensures perfect scaling on iPhones and Android devices).
- **Favicons**: Integrated `/logo.png` for both standard browsers and Apple touch devices.

---

## 5. Maintenance Guide
To update your SEO in the future:
1.  Open `src/app/layout.tsx`.
2.  Locate the `export const metadata: Metadata = { ... };` block.
3.  Modify the `title` or `description` fields.
4.  If your domain name changes, update the `canonical` URL and the `openGraph.url` fields.
