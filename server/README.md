# DMS Aarohi - Unified Backend API

This is the central Express.js and MongoDB backend that powers all DMS Aarohi platforms.

## Architecture

This single backend supports:
1. **Talent Hunt Platform**: Routes under `/api/talent/...` (Registrations, Events, etc.)
2. **NGO Platform**: Routes under `/api/ngo/...` (Volunteers, Team, Blood Donors, etc.)
3. **Admin Panel**: Unified admin routes.

## Environment Variables
Create a `.env` file in this directory with the following:
```env
PORT=5051
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/?appName=Dmsaarohi
JWT_SECRET=your_jwt_secret
```

## Running the Server
```bash
npm install
npm run dev
```
