# DMS Aarohi — Official Website

> **DMS Aarohi** is the official web platform for Delhi Music Society's flagship talent-discovery competition — *Voice of Delhi NCR*. The platform handles everything from public event pages and student registrations to a full-featured admin CMS for managing all site content.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Frontend (Client)](#frontend-client)
  - [Pages & Routes](#pages--routes)
  - [Key Components](#key-components)
- [Backend (Server)](#backend-server)
  - [API Reference](#api-reference)
  - [Data Models](#data-models)
- [Admin Panel](#admin-panel)
  - [Login](#login)
  - [Modules](#modules)
- [Deployment](#deployment)
- [Environment Setup Reference](#environment-setup-reference)

---

## Overview

The project is a full-stack **monorepo** with two workspaces:

| Workspace | Path | Purpose |
|-----------|------|---------|
| `client`  | `./client` | React + Vite SPA — public-facing website |
| `server`  | `./server` | Node.js + Express REST API + MongoDB |

Key features:
- Public website with animated pages (Home, About, Shows, Gallery, Contact, Voice of Delhi NCR competition)
- Student registration forms (Talent Show, Join Us, Contact, Donation, NGO Contact)
- Full **Admin CMS Panel** — manage Competitions, Seasons, Gallery, Videos, Patrons, Sponsors, Testimonials, Success Stories, Website Settings
- Admin can view & update status on **registered students** and **contact queries**
- JWT-secured admin authentication
- MongoDB persistence for all submissions and content

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19 | UI framework |
| Vite | 7 | Build tool & dev server |
| React Router DOM | 7 | Client-side routing |
| Framer Motion | 12 | Animations |
| Tailwind CSS | 4 | Utility-first styling |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 18+ | Runtime |
| Express | 4 | HTTP server & routing |
| Mongoose | 9 | MongoDB ODM |
| dotenv | 17 | Environment config |
| cors | 2 | Cross-origin requests |

### Database
- **MongoDB Atlas** — cloud-hosted MongoDB cluster

---

## Project Structure

```
DMS-main/
├── client/                        # Frontend (React + Vite)
│   ├── public/                    # Static assets & legacy images
│   ├── src/
│   │   ├── assets/                # Fonts, icons, local images
│   │   ├── components/
│   │   │   ├── common/            # Shared UI components
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── MusicNavbar.jsx
│   │   │   │   ├── PageShell.jsx
│   │   │   │   ├── LogoLoader.jsx
│   │   │   │   ├── ScrollReveal.jsx
│   │   │   │   ├── SectionHeading.jsx
│   │   │   │   ├── FormNotice.jsx
│   │   │   │   └── TeamSliderRow.jsx
│   │   │   ├── forms/             # Reusable form components
│   │   │   └── sections/          # Page section components
│   │   ├── data/                  # Static data / mock content
│   │   ├── lib/
│   │   │   ├── api.js             # Fetch helpers (public + admin)
│   │   │   ├── formStyles.js      # Shared input class helpers
│   │   │   └── eventDates.js      # Event date utilities
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── GalleryPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── VoiceOfDelhiNCRPage.jsx
│   │   │   ├── PrivacyPolicyPage.jsx
│   │   │   ├── TermsOfServicePage.jsx
│   │   │   ├── SplashPage.jsx
│   │   │   ├── musicSociety/
│   │   │   │   ├── MusicSocietyLayout.jsx
│   │   │   │   ├── MusicSocietyOverviewPage.jsx  (About)
│   │   │   │   ├── MusicSocietyShowsPage.jsx     (Shows)
│   │   │   │   ├── MusicSocietyTalentsPage.jsx   (Success Stories)
│   │   │   │   ├── MusicSocietyJoinUsPage.jsx    (Register)
│   │   │   │   ├── MusicSocietyEventsPage.jsx
│   │   │   │   └── MusicSocietyMainPage.jsx
│   │   │   └── admin/
│   │   │       ├── AdminLoginPage.jsx
│   │   │       ├── AdminGuard.jsx
│   │   │       └── AdminPage.jsx                 # Full CMS admin panel
│   │   ├── styles/                # Additional CSS modules
│   │   ├── App.jsx                # Router setup
│   │   ├── index.css              # Global styles
│   │   └── main.jsx               # Entry point + splash loader
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── server/                        # Backend (Node.js + Express)
    ├── src/
    │   ├── config/
    │   │   └── env.js             # Validated env config
    │   ├── controllers/
    │   │   ├── adminController.js          # Login handler
    │   │   ├── adminDashboardController.js # Dashboard, registrations, queries
    │   │   ├── contentController.js        # CMS content CRUD
    │   │   ├── eventController.js          # Event CRUD
    │   │   ├── submissionController.js     # Form submissions
    │   │   └── healthController.js
    │   ├── middleware/
    │   │   ├── adminAuth.js        # JWT Bearer token guard
    │   │   ├── asyncHandler.js     # Async error wrapper
    │   │   ├── errorHandler.js     # Global error handler
    │   │   ├── notFoundHandler.js
    │   │   └── validateBody.js     # Request body validator
    │   ├── models/
    │   │   ├── ContentBlock.js     # Generic CMS content model
    │   │   ├── Event.js            # Events model
    │   │   └── Submission.js       # All form submissions
    │   ├── routes/
    │   │   ├── adminRoutes.js      # /api/admin/* routes
    │   │   ├── submissionRoutes.js # /api/forms/* routes
    │   │   └── healthRoutes.js
    │   ├── services/
    │   │   ├── contentService.js
    │   │   ├── eventService.js
    │   │   └── submissionService.js
    │   ├── utils/
    │   │   ├── adminToken.js       # JWT sign/verify helpers
    │   │   └── createHttpError.js
    │   ├── validators/
    │   │   ├── eventValidators.js
    │   │   └── submissionValidators.js
    │   ├── app.js                  # Express app setup
    │   └── server.js               # HTTP server entry
    ├── .env                        # Environment variables (not committed)
    └── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- A **MongoDB Atlas** cluster (or local MongoDB)

### Environment Variables

Create a `.env` file inside the `server/` directory:

```env
PORT=5051
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
MONGODB_DB_NAME=dms_aarohi
ADMIN_EMAIL=your-admin@email.com
ADMIN_PASSWORD=your-secure-password
```

Create a `.env` file inside the `client/` directory:

```env
VITE_API_URL=http://localhost:5051
```

> **Note:** For production, set `VITE_API_URL` to your deployed backend URL.

### Installation

Install dependencies for both workspaces:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Running Locally

Open **two terminals** and run each concurrently:

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
# Server starts at http://localhost:5051
# Watches for file changes automatically
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
# Client starts at http://localhost:5174
```

Then open your browser at **http://localhost:5174**

---

## Frontend (Client)

### Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | `HomePage` | Hero, about section, events carousel, gallery preview |
| `/about` | `MusicSocietyOverviewPage` | About DMS, team, mission |
| `/shows` | `MusicSocietyShowsPage` | Past and upcoming shows |
| `/voice-of-delhi-ncr` | `VoiceOfDelhiNCRPage` | Competition info, seasons, registration |
| `/voice-of-delhi-ncr/:season` | Same page | Filtered by season |
| `/success-stories` | `MusicSocietyTalentsPage` | Alumni and winner stories |
| `/gallery` | `GalleryPage` | Photo gallery |
| `/contact` | `ContactPage` | Contact form + info |
| `/register` | `MusicSocietyJoinUsPage` | Student registration form |
| `/privacy` | `PrivacyPolicyPage` | Privacy policy |
| `/terms` | `TermsOfServicePage` | Terms of service |
| `/admin/login` | `AdminLoginPage` | Admin sign-in |
| `/admin` | `AdminPage` | Full CMS admin panel (protected) |

### Key Components

| Component | Description |
|-----------|-------------|
| `MusicNavbar` | Sticky top navigation with mobile hamburger |
| `Footer` | Site footer with links and social icons |
| `PageShell` | Layout wrapper with navbar + footer |
| `LogoLoader` | Full-screen splash loader (shown once per session) |
| `ScrollReveal` | Intersection Observer animation wrapper |
| `FormNotice` | Success/error notice for forms |
| `SectionHeading` | Reusable styled section heading |

### API Helpers (`src/lib/api.js`)

| Function | Description |
|----------|-------------|
| `submitForm(endpoint, payload)` | POST to public form endpoints |
| `getJson(endpoint)` | GET public data |
| `postJson(endpoint, payload)` | POST without auth |
| `getAdmin(endpoint)` | Authenticated GET (admin) |
| `postAdmin(endpoint, payload)` | Authenticated POST (admin) |
| `putAdmin(endpoint, payload)` | Authenticated PUT (admin) |
| `deleteAdmin(endpoint)` | Authenticated DELETE (admin) |
| `setAdminToken(token)` | Save JWT to localStorage |
| `clearAdminToken()` | Remove JWT from localStorage |

---

## Backend (Server)

### API Reference

#### Public Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/events` | List all published events |
| POST | `/api/forms/contact` | Submit contact form |
| POST | `/api/forms/join-us` | Submit Join Us / membership form |
| POST | `/api/forms/talent-show` | Submit Talent Show registration |
| POST | `/api/forms/donation` | Submit donation form |
| POST | `/api/forms/ngo-contact` | Submit NGO contact form |

#### Admin Endpoints (requires `Authorization: Bearer <token>`)

**Authentication**

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/admin/login` | Login → returns JWT token |

**Dashboard**

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/admin/dashboard` | Aggregate stats for all modules |

**Events**

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/admin/events` | List all events |
| POST | `/api/admin/events` | Create a new event |
| PUT | `/api/admin/events/:id` | Update event |
| DELETE | `/api/admin/events/:id` | Delete event |

**Registrations (Students)**

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/admin/registrations` | List all student registrations (supports `?formType`, `?status`, `?search`, `?page`, `?limit`) |
| PUT | `/api/admin/registrations/:id/status` | Update registration status (`pending` / `shortlisted` / `approved` / `rejected`) |

**Contact Queries**

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/admin/contact-queries` | List contact form submissions (supports `?status`, `?page`, `?limit`) |
| PUT | `/api/admin/contact-queries/:id/status` | Update query status (`pending` / `replied` / `resolved`) |

**Reports (legacy)**

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/admin/reports/singing` | All join-us + talent-show submissions |
| GET | `/api/admin/reports/ngo` | All ngo-contact submissions |
| GET | `/api/admin/reports/all` | All submissions |

**CMS Content**

Supported `type` values: `competition`, `season`, `qualified-contestant`, `success-story`, `gallery`, `video`, `patron`, `sponsor`, `testimonial`, `website-setting`

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/admin/content/:type` | List all items of a type |
| POST | `/api/admin/content/:type` | Create new item |
| PUT | `/api/admin/content/:id` | Update item by ID |
| DELETE | `/api/admin/content/:id` | Delete item by ID |

---

### Data Models

#### `Submission`
Stores all public form submissions.

| Field | Type | Values |
|-------|------|--------|
| `formType` | String | `contact`, `join-us`, `donation`, `ngo-contact`, `talent-show` |
| `name` | String | Required |
| `email` | String | Required (except donation) |
| `phone` | String | Required |
| `stageName` | String | Optional |
| `gender`, `age`, `city` | String | Optional |
| `talentCategory` | String | For talent/join-us |
| `languagePreference` | String | For talent/join-us |
| `videoLink` | String | Submission video URL |
| `message`, `subject` | String | Contact forms |
| `helpType` | String | NGO contact |
| `amount`, `purpose` | String | Donation |
| `status` | String | `pending`, `approved`, `rejected`, `shortlisted`, `replied`, `resolved` |
| `createdAt`, `updatedAt` | Date | Auto timestamps |

#### `Event`
Stores admin-created events.

| Field | Type | Notes |
|-------|------|-------|
| `title` | String | Required |
| `description` | String | Required |
| `eventDate` | Date | Required |
| `eventLocation` | String | Required |
| `posterImage` | String | Base64 or URL |
| `registrationDeadline` | Date | Required |
| `eventType` | String | `Competition`, `Concert`, `Workshop` |
| `liveLink` | String | Optional YouTube stream URL |

#### `ContentBlock`
Generic CMS model for all admin-managed content.

| Field | Type | Used By |
|-------|------|---------|
| `type` | String | All (enum of 10 values) |
| `title`, `subtitle` | String | Competitions, Seasons, Videos |
| `name`, `role`, `organization` | String | Patrons, Sponsors, Stories |
| `description`, `quote` | String | Most types |
| `imageUrl`, `videoUrl`, `link` | String | Gallery, Videos, Sponsors |
| `settingKey`, `settingValue` | String | Website Settings |
| `season`, `year`, `rank` | String/Number | Seasons, Contestants |
| `order` | Number | Display ordering |
| `active` | Boolean | Show/hide toggle |
| `tags` | [String] | Gallery tagging |
| `meta` | Mixed | Flexible extra data |

---

## Admin Panel

### Login

Navigate to `/admin/login` and enter your admin credentials defined in `server/.env`:

```
Email:    ADMIN_EMAIL value
Password: ADMIN_PASSWORD value
```

A JWT token is stored in `localStorage` and sent as `Authorization: Bearer <token>` on every admin API request.

### Modules

| Module | What you can do |
|--------|----------------|
| **Dashboard** | View live stats — total registrations, queries, events, and all content counts |
| **Competitions** | Create, edit, delete competition entries with title, description, year, image |
| **Seasons** | Manage season records (title, year, banner image, tagline) |
| **Qualified Contestants** | Browse all registered students (talent-show + join-us), search by name/email/phone/city, filter by type or status, mark as Shortlisted / Approved / Rejected, download CSV |
| **Success Stories** | Add winner and alumni stories with photo, achievement, season |
| **Gallery** | Manage gallery image URLs with captions and tags |
| **Videos** | Add YouTube video URLs with title and description |
| **Patrons** | Add patrons (name, role, organisation, photo, bio) |
| **Sponsors** | Add sponsors (name, tier, logo, website link) |
| **Testimonials** | Add testimonial quotes with name, role, and photo |
| **Contact Queries** | View all contact form messages, mark as Replied or Resolved |
| **Website Settings** | Edit global settings: site title, tagline, contact info, social links, footer text, registration toggle |

---

## Deployment

### Backend (e.g., Railway / Render / AWS)

1. Set all environment variables from `server/.env` in your hosting dashboard
2. Build command: *(none — Node.js runs directly)*
3. Start command: `node src/server.js`
4. Make sure MongoDB Atlas IP whitelist allows connections from your server

### Frontend (e.g., Vercel)

1. Set `VITE_API_URL` to your deployed backend URL
2. Build command: `npm run build`
3. Output directory: `dist`
4. The `vercel.json` in `client/` handles SPA routing rewrites

---

## Environment Setup Reference

### `server/.env`

```env
PORT=5051
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<db>?retryWrites=true&w=majority
MONGODB_DB_NAME=dms_aarohi
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your_secure_password_here
```

### `client/.env`

```env
VITE_API_URL=http://localhost:5051
```

> In production, replace `http://localhost:5051` with your actual deployed backend URL.

---

## Scripts

### Server

```bash
npm run dev    # Start with --watch (auto-restart on changes)
npm run start  # Production start
```

### Client

```bash
npm run dev      # Vite dev server (http://localhost:5174)
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
npm run lint     # ESLint check
```

---

## License

All rights reserved © DMS Aarohi / Delhi Music Society.
