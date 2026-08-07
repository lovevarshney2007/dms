# DMS Aarohi Project (Unified Monorepo)

This repository contains the complete, production-ready source code for the **DMS Aarohi** initiative, which powers both the Talent Hunt platform and the NGO website via a centralized backend and administration console.

---

## 🏗️ Architecture Overview

The platform has been rebuilt into a highly modular, decoupled **5-tier architecture**:

1. **`/server` (Port `5000`)**: 
   - **Role**: The Single Source of Truth backend API (Node.js/Express).
   - **Responsibilities**: Connects to MongoDB, manages JWT authentication, serves dynamic CMS endpoints, and processes form submissions for *both* the Talent Hunt and the NGO platforms.

2. **`/admin` (Port `5173`)**: 
   - **Role**: The unified CMS Admin Panel (React).
   - **Responsibilities**: A centralized, secure portal for administrators to manage users, events, gallery images, and application settings across all DMS initiatives.

3. **`/client` (Port `5174`)**: 
   - **Role**: The Talent Hunt Website (React).
   - **Responsibilities**: The main portal for contestants to view upcoming events, read success stories, and submit applications.

4. **`/DMS-Homepagee/client` (Port `5175`)**: 
   - **Role**: The NGO Initiative Website (React).
   - **Responsibilities**: Dedicated portal showcasing DMS Aarohi's philanthropic efforts (Blood Donation, Child Education, etc.).

5. **`/dms-landing` (Port `5176`)**: 
   - **Role**: The Master Landing Portal (React + Framer Motion).
   - **Responsibilities**: The root routing layer providing a premium animated landing experience, dynamically redirecting visitors to either the Talent Hunt or NGO applications.

---

## 🚀 Getting Started Locally

Running the entire suite is now incredibly simple thanks to `concurrently`. 

### Prerequisites
- **Node.js** (v18+)
- **MongoDB** (Local instance or Atlas Cluster)

### 1. Environment Setup
Rename the `.env.example` files to `.env` in all directories and provide the appropriate values:
- `server/.env` (Requires `MONGODB_URI` and `JWT_SECRET`)
- `admin/.env`
- `client/.env`
- `DMS-Homepagee/client/.env`
- `dms-landing/.env`

### 2. Install & Launch
Run the following commands in the **root** (`DMS-main`) directory:

```bash
# Install root dependencies and all workspace dependencies concurrently
npm run install:all

# Start all 5 micro-services in a single terminal
npm run dev
```

The terminal will stream logs from all services, and you can access them at their respective ports (`localhost:5000` through `localhost:5176`).

---

## ☁️ Deployment Guide (Vercel & Render)

The architecture is strictly separated, making it perfect for Serverless and PaaS deployments.

### 1. Backend (`/server`) -> Deploy to **Render** or **AWS**
- Connect your repository to Render.
- Set the root directory to `server`.
- Build command: `npm install`
- Start command: `node src/server.js` (or `npm start`)
- Set environment variables: `MONGODB_URI`, `JWT_SECRET`, `PORT` (usually provided by Render), and configure CORS origins if necessary.

### 2. Frontends -> Deploy to **Vercel**
Each React frontend must be deployed as a separate Vercel project to ensure clean independent scaling and caching.
For each project (`admin`, `client`, `DMS-Homepagee/client`, `dms-landing`):
1. Import the repository in Vercel.
2. Under "Root Directory", select the appropriate folder (e.g., `client`).
3. Vercel will automatically detect Vite/React.
4. Add the `VITE_API_URL` environment variable pointing to your deployed Render backend (e.g., `https://api.dmsaarohi.com/api`).
   - *Note: For the NGO client, point it to `https://api.dmsaarohi.com/api/ngo`*.
   - *Note: For the landing portal, configure `VITE_NGO_URL` and `VITE_TALENT_URL` to point to their respective Vercel domains.*
5. Deploy!

---

### Agency Quality Assurance
All modules are fully validated using strict Vite production builds and secure JWT implementation. Forms, CMS logic, and environmental parsing are structurally typed and handled.
