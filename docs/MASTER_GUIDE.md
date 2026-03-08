# SK Traders Project: Master Guide 🏗️✨

This document provides a complete overview of your website, how it works, and how to maintain it in the future.

---

## 🚀 1. Technology Stack
Your website is built using modern, high-performance tools:
- **Next.js 14 (App Router)**: The "brain" of the website that handles page loading and speed.
- **Tailwind CSS**: Used for all styling (colors, layout, spacing).
- **Supabase**: Your database and backend. It stores customer inquiries and handles admin logins.
- **Lucide React**: The library providing all the clean, modern icons across the site.

---

## 📂 2. Project Structure
- **/src/app**: Contains the pages of your site (Home, Admin Login, Admin Dashboard).
- **/src/components/sections**: The building blocks of your homepage (Hero, Products, Contact Form).
- **/src/lib/supabase.ts**: The connection bridge between your website and Supabase.
- **/public**: This is your "store cupboard". All images, icons, and your logo are kept here.
- **/public/images**: Your showcase project photos.

---

## 💻 3. Local Development (Running on your computer)
To start the website locally for testing:
1. Open your terminal in the IDE.
2. Run command: `npm run dev`
3. Visit: `http://localhost:3000`

---

## 🛠️ 4. Managing Content & Assets
### Updating Images
- Your main logo is at `public/logo.png`.
- Project photos are in `public/images/`.
- If you want to change an image, simply replace the file with a new one using the **same name**.

### Managing Leads
- Customer inquiries go to your **Admin Dashboard**.
- You can access it at `/admin/dashboard` using your Supabase credentials.
- These records are stored in the `leads` table in your Supabase Dashboard.

---

## 🌐 5. Deployment Workflow (Making changes live)
Your site is hosted for free using **Vercel** and **GitHub**.

### How to update the live website:
1. Make your changes in the code or replace images.
2. In the terminal, run these 3 "Magic Commands":
   ```bash
   git add .
   git commit -m "Update website content"
   git push
   ```
3. **Vercel** will see the push and automatically update your live website (`sk-traders.vercel.app`) within 60 seconds.

---

## 🔐 6. Crucial Settings
- Your private Supabase keys are stored in `.env.local`. **Never share this file** or upload it to public places.
- On Vercel, these keys are added in the **Settings > Environment Variables** section.

---

**Prepared for SK Traders** by your AI Assistant. 
*Keep this guide safe for future reference!*
