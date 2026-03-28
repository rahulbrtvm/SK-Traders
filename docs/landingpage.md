# SK Traders Landing Page Documentation

This document provides a technical overview of the modernized SK Traders landing page, covering its architecture, components, and key functionalities.

## 1. Overview
The landing page is designed to showcase SK Traders' premium interlocking tiles and construction services. It prioritizes high-impact visual storytelling, fast lead generation, and seamless mobile responsiveness.

---

## 2. Core Sections

### A. Hero Carousel (`Hero.tsx`)
**Purpose**: Immediate brand impact and service highlights.
- **Content**: 3 Dynamic slides (Interlocking Tiles, Waterproofing, Professional Construction).
- **Functionality**:
    - **Auto-play**: Cycles every 5 seconds.
    - **Manual Navigation**: Interactive dots for direct slide selection.
- **Technical Details**:
    - Uses React state for active index management.
    - **Responsiveness**: Implemented a "stacking" logic for mobile/tablet where text and images occupy clear, non-overlapping zones.
    - **Media**: Optimized images stored in `public/images/`.

### B. Premier Services (`Services.tsx`)
**Purpose**: Detailed showcase of the three pillars of the business.
- **Content**: Three interactive cards: **Interlocks**, **Waterproofing**, and **Construction**.
- **Functionality**:
    - Hover-induced scale and shadow effects.
    - Custom branding icons for each service.
    - "Get More info" CTAs leading to the contact section.
- **Technical Details**:
    - Built using a reusable card component pattern.
    - High-contrast typography for maximum readability.

### C. Collection / Products (`Collection.tsx`)
**Purpose**: Visual gallery of the product range.
- **Content**: Grid of product images with category labels.
- **Technical Details**: Uses Tailwind grid layouts with responsive column counts.

### D. Contact & Socials (`ContactForm.tsx` & Footer)
**Purpose**: Lead capture and social engagement.
- **Functionality**:
    - **Lead Form**: Direct integration with Supabase for storing customer inquiries.
    - **Social Links**: Premium-styled buttons for Instagram, Facebook, and Google Maps.
    - **Direct Support**: Quick-action buttons for Phone and WhatsApp.
- **Technical Details**:
    - Client-side validation for form fields.
    - Custom WhatsApp SVG branding for instant recognition.

---

## 3. Navigation System (`Header.tsx`)

### Active Scroll Highlighting
- **Technical**: Uses the `IntersectionObserver` API to track which section (`#services`, `#products`, `#contact`) is currently in the viewport.
- **Visual**: Automatically underlines/highlights the corresponding link in the header as the user scrolls.

### Mobile Sidebar Menu
- **Design**: Full-screen, 100% opaque solid black (`#000000`) overlay to prevent background bleed.
- **Accessibility**: 
    - Large, centered navigation buttons.
    - High-contrast yellow (`primary`) active states.
    - Direct "Call" action button and simplified Admin icon.
- **Technical**: Uses a state-controlled fixed drawer with smooth CSS transitions.

---

## 4. Technical Stack
- **Framework**: Next.js 14 (App Router).
- **Styling**: Tailwind CSS (v4) with custom theme tokens (`--primary: #E1AD01`).
- **Icons**: Lucide React + Custom SVGs for branding.
- **Database**: Supabase (PostgreSQL) for lead management.
- **Deployment**: Optimized for low-latency delivery of image-heavy assets.

---

## 5. Maintenance Notes
- **Updating Images**: Replace files in `public/images/` with identical filenames to update the carousel without code changes.
- **Navigation Links**: Manage the `navLinks` array in `Header.tsx` to add or reorder items globally.
