# CraveCart Monorepo

Welcome to **CraveCart** - your ultimate companion for grocery shopping and meal planning.

This project is a monorepo utilizing npm workspaces to structure the frontend (React + Vite + Tailwind CSS v4) and backend (Node.js + Express) projects.

## Project Structure

```text
crave-cart/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── assets/         # Images, fonts, and other static assets
│   │   ├── components/     # Reusable UI components
│   │   ├── constants/      # App constants, enums, config values
│   │   ├── data/           # Mock data or static data files
│   │   ├── hooks/          # Custom React hooks
│   │   ├── layouts/        # Shared page layouts (e.g., RootLayout)
│   │   ├── pages/          # Page components (Home, NotFound, etc.)
│   │   ├── routes/         # Router configuration & route declarations
│   │   ├── services/       # API call handlers & third-party integrations
│   │   ├── store/          # State management (context/store)
│   │   ├── styles/         # Global styles (Tailwind CSS imports)
│   │   └── utils/          # Helper/utility functions
│   ├── index.html          # Vite entry HTML
│   ├── jsconfig.json       # Path alias auto-completion mapping
│   ├── package.json        # Client package & scripts
│   └── vite.config.js      # Vite + React + Tailwind v4 config
├── server/                 # Backend Node.js Express application
│   ├── src/
│   │   ├── config/         # App configuration & environment config
│   │   ├── controllers/    # Route controllers / handlers
│   │   ├── middleware/     # Custom Express middleware (auth, logging)
│   │   ├── routes/         # Express routers (API endpoints)
│   │   ├── app.js          # Express app configuration
│   │   └── index.js        # Node.js app entry point
│   ├── .env                # Environmental variables (ignored)
│   ├── .env.example        # Env template variables
│   └── package.json        # Server package & scripts
├── docs/                   # Project documentation & guides
│   ├── PROJECT_BIBLE.md    # Master architecture guide
│   └── walkthrough.md      # Milestone walkthroughs
├── package.json            # Monorepo configuration
├── eslint.config.js        # Root ESLint (flat config)
└── .prettierrc             # Prettier configurations
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher recommended)

### Installation

Install all dependencies across the monorepo from the root directory:

```bash
npm run install-all
```

### Running Development Servers

Start both the React client (Vite) and the Node.js server (Nodemon) concurrently:

```bash
npm run dev
```

* Frontend running at: [http://localhost:5173](http://localhost:5173)
* Backend running at: [http://localhost:5000](http://localhost:5000)

### Workspace Specific Commands

Run commands specifically on a single workspace using:

* **Client only:** `npm run dev --workspace=client`
* **Server only:** `npm run dev --workspace=server`

### Build & Lint

To build the React application for production:

```bash
npm run build
```

To run lint checks across the monorepo:

```bash
npm run lint
```

To automatically format the code using Prettier:

```bash
npm run format
```
