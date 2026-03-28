# Customer Leads Admin Dashboard Documentation

This document provides a comprehensive overview of the **Customer Leads** management system, covering both its user-facing functionalities and technical implementation.

## Overview
The Customer Leads page is the central hub for administrators to view, search, filter, update, and manage incoming customer inquiries. It was migrated from the legacy `/admin/dashboard` to the new `/admin/customerleads` route for better semantic organization.

---

## Key Functionalities

### 1. Real-time Search & Filtering
- **Multi-field Search**: Admins can search across **Customer Name**, **Location**, and **Message Content** simultaneously.
- **Status Filtration**: A dedicated filter allows viewing leads by their status:
  - **New**: Initial state of a newly submitted lead.
  - **Contacted**: Leads that have been reached out to by the team.
  - **Closed**: Completed leads or archived inquiries.
- **Combined Logic**: Search and filters work together (e.g., search for "Amal" within "Closed" leads).

### 2. Tailored Table Layout
- **Optimized Columns**: Organized to prioritize critical information:
  - `Customer`: Shows Name and Phone Number.
  - `Location`: Full site/delivery address.
  - `Message`: The customer's specific inquiry.
  - `Created At`: Date and time of initial submission.
  - `Status Updated At`: Tracks the exact moment a status was last changed.
  - `Status`: Current lifecycle state.
  - `Action`: Controls for updating or deleting the lead.
- **Expandable Content**: To keep the UI clean, long **Location** or **Message** texts are truncated but can be expanded with a "Click to View" toggle.

### 3. Status Tracking & Updates
- **Instant Updates**: Status changes take effect immediately without a page refresh.
- **Timestamp Persistence**: Every status change is recorded in the database's `updated_at` column, ensuring auditability.

### 4. Data Export (CSV)
- **Filtered Export**: The "Export Data" feature respects the admin's current search and filter settings.
- **Dedicated Phone Column**: Unlike the UI list (which groups Name/Phone), the CSV separates them into distinct columns for easy CRM integration.
- **Excel Friendly**: All fields are quoted to prevent column shifting caused by commas in messages or dates.

### 5. Lead Deletion & Safety
- **Permanent Removal**: Admins can delete obsolete leads.
- **Confirmation Modal**: A safety step requires the admin to confirm deletion via a custom modal, preventing accidental data loss.

### 6. Premium User Feedback (Toast Notifications)
- Replaced browser alerts with custom floating **Toast Notifications**.
- Success and Error messages appear with vibrant colors and animations, auto-dismissing after 3 seconds.

---

## Technical Details

### Frontend Stack
- **Framework**: Next.js 14 (App Router).
- **Styling**: Tailwind CSS (Mobile-first responsive design).
- **Icons**: Lucide React.
- **State Management**: React `useState` and `useEffect` for real-time filtering and modal controls.

### Backend Integration
- **Database**: Supabase (PostgreSQL).
- **Client**: `@supabase/supabase-js`.
- **Table Schema (`leads`)**:
  - `id`: UUID (Primary Key).
  - `customer_name`: Text.
  - `phone`: Text.
  - `location`: Text.
  - `message`: Text (Nullable).
  - `status`: Enum ('new', 'contacted', 'closed').
  - `created_at`: Timestamp with time zone (Default: `now()`).
  - `updated_at`: Timestamp with time zone (Updated via client on status change).

### Critical Logic
- **URL Handling**: Route protection is handled via `src/middleware.ts` and a `checkAuth` helper in the page component.
- **CSV Generation**: Uses a `Blob` and `URL.createObjectURL` approach to generate and download the CSV file client-side.
- **Schema Cache Handling**: The `updateStatus` function includes a robust fallback to handle temporary Supabase schema cache delays after DDL changes.

---

## Maintenance Notes
- **Supabase Columns**: If adding new columns to the `leads` table, remember to refresh the Supabase schema or use the `NOTIFY pgrst, 'reload schema';` command if the API doesn't immediately recognize the change.
- **Responsiveness**: The table is wrapped in an `overflow-x-auto` container to ensure usability on mobile devices.
