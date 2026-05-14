# Event Registration MERN App

A full-stack event registration application built with MongoDB, Express, React, and Node.js.

## Structure

- `server/` - Express API and MongoDB integration
- `client/` - React application powered by Vite

## Setup

### 1. Configure the server

1. Copy `server/.env.example` to `server/.env`
2. Set `MONGO_URI` to your MongoDB Atlas connection string

### 2. Install dependencies

```powershell
cd server
npm install
cd ..\client
npm install
```

### 3. Run the app

Start the server:

```powershell
cd server
npm run dev
```

Start the client:

```powershell
cd client
npm run dev
```

Open the browser at the URL shown by Vite (usually `http://localhost:3000`).

## Deployment Note

- Do not hardcode the frontend to call `http://localhost:5000` in production. In a deployed browser, `localhost` means the visitor's own machine, not your EC2 server.
- The client now defaults to relative API calls like `/api/registrations`.
- During Vite development, `/api` is proxied to `http://localhost:5000`.
- If your frontend and backend are deployed on different origins, set `VITE_API_BASE_URL` in the client environment to your backend URL, for example `http://3.88.156.74:5000`.

## API

- `POST /api/registrations` - create a registration
- `GET /api/registrations` - list all registrations

## Notes

- The client sends form submissions to the server API.
- The server stores registrations in MongoDB.
- Use a cloud-hosted MongoDB URI such as MongoDB Atlas.
