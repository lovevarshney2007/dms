# DMS Aarohi Project (Monorepo)

This repository contains the core services and frontends for the DMS Aarohi initiative, which includes the Talent Hunt platform and the unified Backend/Admin systems.

## Project Structure

This monorepo is divided into the following key directories:

- **`/server`**: The unified Express.js Backend API and MongoDB database connection. This serves BOTH the Talent Hunt platform and the NGO initiative.
- **`/admin`**: The unified React Admin Panel. This acts as a centralized portal for the administrators. It contains a Talent Hunt Console and a dedicated NGO Admin Console.
- **`/client`**: The React frontend for the **Talent Hunt** website.
- **`/dms-landing`**: The main entry portal (Landing Page) that connects visitors to either the Talent Hunt platform or the NGO website.

> **Note:** The frontend for the NGO website is maintained in a separate repository/directory (`DMS-Homepagee`).

## Getting Started Locally

To run the entire suite locally, you will need multiple terminals.

1. **Backend Server**:
   ```bash
   cd server
   npm install
   npm run dev
   ```

2. **Admin Panel**:
   ```bash
   cd admin
   npm install
   npm run dev
   ```

3. **Talent Hunt Frontend**:
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Landing Page Portal**:
   ```bash
   cd dms-landing
   npm install
   npm run dev
   ```

## Deployment

- **Backend**: Hosted on Render/Vercel (requires `MONGODB_URI`).
- **Admin**: Hosted on Vercel.
- **Client (Talent Hunt)**: Hosted on Vercel.
- **Landing Page**: Hosted on Vercel.
