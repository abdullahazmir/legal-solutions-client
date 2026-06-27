# Legal Solutions

A full-stack web platform that connects clients with verified lawyers. Clients can browse lawyer profiles, submit consultation requests, and manage their cases. Lawyers can create and manage their law firms. Admins oversee the entire platform including users, subscriptions, and law firm approvals.

---

## Features

### Client
- Browse and search lawyer profiles by specialization, location, and language
- View detailed lawyer profiles including fees, experience, and availability
- Submit consultation (hire) requests to lawyers
- Save lawyer profiles for later
- View and manage submitted applications
- Subscribe to plans for extended access

### Lawyer
- Create and manage a law firm profile
- Accept or review incoming client applications
- Manage availability status

### Admin
- View and manage all users
- Assign and update user roles (client, lawyer, admin)
- Ban and unban users (revokes all active sessions)
- Approve or reject law firm registrations
- Manage subscriptions and plans

### General
- Google OAuth and email/password authentication (via Better Auth)
- Protected routes with role-based access control
- Unauthorized (401) and Forbidden (403) error pages
- Stripe payment integration for plan subscriptions
- Responsive dark UI

---

## Tech Stack

### Frontend
- [Next.js 15](https://nextjs.org/) — App Router, server and client components
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling
- [HeroUI](https://heroui.com/) — component library
- [Framer Motion](https://www.framer.com/motion/) — animations
- [Better Auth](https://better-auth.com/) — authentication
- [Stripe.js](https://stripe.com/docs/js) — payment processing

### Backend
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) — REST API
- [MongoDB](https://www.mongodb.com/) + [MongoDB Node Driver](https://www.mongodb.com/docs/drivers/node/) — database
- Custom session-based token authentication middleware
- Role-based middleware: `verifyToken`, `verifyAdmin`, `verifyLawyer`, `verifyClient`

---

## Project Structure

```
legal-solutions-client/       # Next.js frontend
├── src/
│   ├── app/                  # App Router pages
│   │   ├── auth/             # Sign in / sign up
│   │   ├── cases/            # Lawyer listings and detail pages
│   │   ├── dashboard/        # Role-based dashboards
│   │   │   ├── admin/        # Admin panel
│   │   │   ├── client/       # Client dashboard
│   │   │   └── lawyer/       # Lawyer dashboard
│   │   ├── plans/            # Subscription plans and success page
│   │   ├── unauthorized/     # 401 page
│   │   └── forbidden/        # 403 page
│   ├── components/           # Reusable UI components
│   ├── lib/
│   │   ├── auth.js           # Better Auth config
│   │   ├── core/
│   │   │   ├── server.js     # serverFetch, serverMutation, protectedFetch
│   │   │   └── session.js    # getUserSession, getUserToken, requireRole
│   │   └── api/              # Feature-specific API helpers

legal-solutions-server/       # Express backend
├── index.js                  # All routes and middleware
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Google OAuth credentials
- Stripe account

### 1. Clone the repository

```bash
git clone https://github.com/your-username/legal-solutions.git
```

### 2. Set up the backend

```bash
cd legal-solutions-server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_DB_URI=your_mongodb_connection_string
```

Start the server:

```bash
node index.js
```

### 3. Set up the frontend

```bash
cd legal-solutions-client
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:5000

BETTER_AUTH_SECRET=your_secret
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

NEXT_PUBLIC_IMAGE_UPLOAD_API=your_image_upload_key
```

Start the dev server:

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## API Overview

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/cases` | Public | Get all lawyer listings |
| GET | `/api/cases/:id` | Public | Get a single lawyer profile |
| POST | `/api/cases` | Public | Create a lawyer listing |
| GET | `/api/lawfirms` | Admin | Get all law firms |
| POST | `/api/lawfirms` | Public | Create a law firm |
| PATCH | `/api/lawfirms/:id` | Admin | Update law firm status |
| GET | `/api/applications` | Client | Get client applications |
| POST | `/api/applications` | Public | Submit a consultation request |
| GET | `/api/savecases` | Client | Get saved lawyer profiles |
| POST | `/api/savecases` | Client | Save a lawyer profile |
| GET | `/api/users` | Public | Get all users |
| GET | `/api/plans` | Public | Get a plan by ID |
| POST | `/api/subscriptions` | Public | Subscribe to a plan |

---

## Deployment

| Service | Platform |
|---------|----------|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Render](https://render.com) |
| Database | [MongoDB Atlas](https://www.mongodb.com/atlas) |

When deploying, update `NEXT_PUBLIC_BASE_URL` on Vercel to your Render backend URL:

```env
NEXT_PUBLIC_BASE_URL=https://your-api.onrender.com
```

---

## License

MIT