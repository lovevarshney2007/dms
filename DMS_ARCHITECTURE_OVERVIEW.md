# DMS (Delhi Music Society) - Full Architecture Overview

This document provides a deep-dive architectural overview of the DMS (Delhi Music Society) project. It is intended to give AI models (like ChatGPT) or new developers a complete understanding of the project's structure, technology stack, data flow, and components.

## 1. Project Overview & Monorepo Structure

The DMS project is a comprehensive web platform for a music society, managing talent shows (like "Voice of Delhi NCR"), an NGO aspect, event galleries, sponsor requests, and user registrations.

It is structured as a **Monorepo** managed with `concurrently` to run multiple services simultaneously.

### Top-Level Directories:
*   **`client/`**: The main public-facing frontend for the music society (React + Vite).
*   **`server/`**: The central Node.js/Express backend API that serves all frontends.
*   **`admin/`**: The internal dashboard for staff to manage content, submissions, and users (React + Vite).
*   **`DMS-Homepagee/`**: Another frontend, likely a dedicated portal or older version for the NGO aspect.
*   **`dms-landing/`**: A dedicated landing page frontend.

### Root `package.json` Scripts
The root directory orchestrates the development environment:
*   `npm run dev`: Uses `concurrently` to start all 5 services simultaneously.
*   `npm run install:all`: Installs dependencies for all sub-projects.

---

## 2. Technology Stack

*   **Frontend (client, admin, etc.)**:
    *   React.js with Vite as the bundler.
    *   Tailwind CSS for styling (especially in `admin`, standard CSS in `client`).
    *   React Router for navigation.
*   **Backend (server)**:
    *   Node.js with Express.js.
    *   MongoDB with Mongoose (ODM) for the database.
*   **Authentication & State**:
    *   JWT (JSON Web Tokens) for API authentication (assumed based on standard MERN stack practices).
    *   React Context API or standard hooks for state management.

---

## 3. Backend Architecture (`server/`)

The backend follows a standard MVC-like architecture (Model-Route-Controller).

*   **`server/src/models/`** (Database Schema):
    *   `Registration.js` & `Submission.js`: Manages user registrations and talent show submissions.
    *   `Event.js`: Standard events.
    *   `NgoEvent.js`, `NgoBloodDonor.js`, `NgoTeamMember.js`, `NgoHeroSlide.js`, `NgoInitiativeContent.js`: Dedicated schemas for the NGO branch of the society.
    *   `SponsorRequest.js`: Manages incoming sponsorship requests.
    *   `ContactQuery.js`: Stores user messages from contact forms.
    *   `ContentBlock.js`: Dynamic CMS content for the frontend.

*   **`server/src/routes/`** (API Endpoints):
    *   `adminRoutes.js`: Protected routes for the `admin` dashboard to perform CRUD operations.
    *   `ngoPublicRoutes.js`: Public endpoints serving data to the NGO portal.
    *   `submissionRoutes.js`: Endpoints for handling user submissions for shows.
    *   `uploadRoutes.js`: Handles file uploads (images, audio/video for submissions).
    *   `healthRoutes.js`: System health checks.

*   **Scripts in `server/` root**:
    Contains various database seeding and migration scripts (e.g., `migrate.js`, `seed_ngo_data.cjs`, `fix_shows.js`), indicating a system that has evolved and requires data normalization.

---

## 4. Frontend Architecture (`client/`)

The main public portal for visitors, participants, and sponsors.

*   **`client/src/pages/`**:
    *   `HomePage.jsx`: The main landing experience.
    *   `VoiceOfDelhiNCRPage.jsx`: A dedicated page for their flagship talent show.
    *   `BecomeASponsorPage.jsx`: For businesses looking to sponsor.
    *   `ContactPage.jsx`, `GalleryPage.jsx`: Standard informational pages.
    *   `musicSociety/`: Contains pages specific to the music society's core operations.
*   **Forms (`client/src/components/forms/`)**: Includes `JoinUsForm.jsx` for user registration.
*   **Routing**: Defined in `App.jsx`, mapping URLs to the page components.

---

## 5. Admin Panel Architecture (`admin/`)

The CMS (Content Management System) and dashboard for DMS staff.

*   **`admin/src/pages/`**:
    *   `DashboardPage.jsx`: High-level analytics and overview.
    *   `LoginPage.jsx`: Authentication entry point for staff.
    *   `ContentBlocksPage.jsx`: UI to edit the dynamic content on the main website (mapping to `ContentBlock.js` model).
    *   `SettingsPage.jsx`: System configurations.
    *   `ngo/` & `talent/`: Sub-folders indicating dedicated dashboard sections for managing NGO activities vs. Talent Show activities.

---

## 6. Key Workflows & Data Flow

1.  **Talent Show Registration**:
    *   User visits `client` -> navigates to `VoiceOfDelhiNCRPage.jsx` -> fills out a form.
    *   Data is sent to `server/src/routes/submissionRoutes.js`.
    *   File uploads (audio/video) are handled by `uploadRoutes.js`.
    *   Data is saved in `Submission.js` and `Registration.js` MongoDB collections.
2.  **Content Management (CMS)**:
    *   Staff logs into `admin`.
    *   Navigates to `ContentBlocksPage.jsx`.
    *   Sends PUT/POST requests to `server/src/routes/adminRoutes.js`.
    *   Updates `ContentBlock.js` documents in MongoDB.
    *   The `client` dynamically fetches these blocks to render the homepage and other pages.
3.  **NGO Management**:
    *   Distinct models (`Ngo*`) and routes (`ngoPublicRoutes.js`) separate the NGO functionality from the core Music Society functionality, allowing independent operation while sharing the same backend infrastructure.

## Prompting ChatGPT with this file
When giving this file to ChatGPT, you can say:
> "Here is the complete architectural overview of my project, DMS (Delhi Music Society). Read this to understand the monorepo structure, MERN stack, and component flow. I will ask you questions or request code changes based on this architecture."
