# mtg-card-holder

[![Build Status](https://github.com/daymosik/mtg-card-holder/workflows/build/badge.svg)](https://github.com/daymosik/mtg-card-holder/actions?query=workflow%3Abuild)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/23aef49d4bb04b568cfebc5e7f0f0a19)](https://www.codacy.com/gh/daymosik/mtg-card-holder/dashboard?utm_source=github.com&utm_medium=referral&utm_content=daymosik/mtg-card-holder&utm_campaign=Badge_Grade)

A web app for browsing Magic: The Gathering sets and cards and keeping track of your own card collection.

Latest version available at: https://mtg-card-holder.firebaseapp.com

## Features

- **Card database** – browse sets and the cards in each set, with card details
- **Card collection** – add/remove cards (with name autocomplete), list or image view
- **Accounts** – sign up / log in with email and password (Firebase Auth)
- **Card recognition** (experimental) – camera-based detection with a Teachable Machine model and OCR via Tesseract.js
- **Admin** – import sets and cards from Scryfall into Firebase

## Tech stack

Preact, Redux + redux-thunk, RxJS, Firebase (Auth + Realtime Database), Bootstrap 5, Sass, Vite, TypeScript, ESLint + Prettier.

## Getting started

Requirements: Node.js 24 and npm.

1. Create a `.env` file in the project root with your Firebase project config:

   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-domain.firebaseapp.com
   VITE_FIREBASE_DATABASE_URL=https://your-domain.firebaseio.com
   VITE_FIREBASE_PROJECT_ID=your-domain
   VITE_FIREBASE_STORAGE_BUCKET=your-domain.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

2. Install and build:

   ```bash
   npm install
   npm run build      # type check + production build to dist/
   npm run preview    # serve dist/ locally
   ```

### Scripts

| Command | Description |
|---|---|
| `npm run build` | Type check (`tsc`) and build to `dist/` |
| `npm run watch` | Development build in watch mode |
| `npm run preview` | Serve the built app |
| `npm run lint` / `npm run fix` | Lint / auto-fix sources |
| `make build` | Install deps if needed, lint, build |
| `make deploy` | Deploy to Firebase Hosting (`firebase deploy`) |

### Docker

The repo includes a `Dockerfile` (Node 24 Alpine) and `docker-compose.yml` that run `make build` in a container with the project mounted at `/app`:

```bash
docker compose up mtg
```

## Deployment

- **Firebase Hosting** – GitHub Actions (`.github/workflows/nodejs.yml`) lints, builds and deploys on every push to `master`. Firebase config is provided via repository secrets (`VITE_FIREBASE_*`, `FIREBASE_SERVICE_ACCOUNT_MTG_CARD_HOLDER`).
- **Self-hosted** – the `dist/` folder is a static SPA and can be served by any web server (hash-based routing, no rewrites needed).

## Data providers

Card and set data comes from [Scryfall](https://scryfall.com/docs/api) via [scryfall-sdk](https://github.com/ChiriVulpes/scryfall-sdk). It is imported into Firebase Realtime Database from the `/admin` page:

| Path | Content |
|---|---|
| `scry-sets/{setCode}` | Sets |
| `scry-cards-simple/{cardId}` | Card summaries (lists, autocomplete) |
| `scry-cards-full/{cardId}` | Full card data |
| `scry-user-cards/{uid}/{cardId}` | User collection (number of copies) |

The previous provider, [api.magicthegathering.io](https://api.magicthegathering.io/v1) ([mtg-sdk-typescript](https://github.com/MagicTheGathering/mtg-sdk-typescript)), is no longer maintained and no longer used.

## Contributing

See [AGENTS.md](AGENTS.md) for project structure, conventions and known issues.

## License

MIT
