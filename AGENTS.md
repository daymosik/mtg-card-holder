# AGENTS.md

Guidance for AI coding agents working in this repository.

## What this repo is

`mtg-card-holder` (UI title "MTG Deck Holder") is a single-page web app for browsing Magic: The Gathering sets/cards and keeping a personal card collection. It is a static frontend: there is no backend of its own. Data and auth live in **Firebase** (Realtime Database + Auth); card data is imported from the **Scryfall** API into Firebase by an admin page.

It is deployed in two places:
- **Firebase Hosting**: https://mtg-card-holder.firebaseapp.com (GitHub Actions on push to `master`, or `make deploy`).
- **Home server**: this directory is a nested repo inside the `terminal` infra repo (`/home/damian/terminal`). The `mtg` service there runs `make build` once; nginx serves `dist/` on port `5005`. Commit changes **in this repo**, never in the parent `terminal` repo.

## Stack

- Preact 10 (JSX with `h` factory, `jsx: "react"` in `tsconfig.json`), `preact-router` with hash history
- Redux 4 + `redux-thunk` + `react-redux` (classic action types / actions / reducers, no Redux Toolkit)
- RxJS for Firebase child-event subscriptions
- Firebase 12 modular SDK (`firebase/app`, `firebase/auth`, `firebase/database`)
- `scryfall-sdk` for importing data
- Bootstrap 5, Sass, `mana-font`, `keyrune`, `tippy.js`
- Experimental card recognition: `@teachablemachine/image` (TensorFlow model hosted by Teachable Machine) + `tesseract.js` OCR
- Vite 8 (`root: src`, output `../dist`), TypeScript 5.9, ESLint 10 flat config + Prettier, Husky pre-commit
- Node 24 (see `Dockerfile`)

## Layout

| Path | Purpose |
|---|---|
| `src/index.html`, `src/index.tsx` | Vite entry; renders `App` into `#app` |
| `src/ts/app.tsx` | Router and route table |
| `src/ts/startup.tsx` | Loads sets + user collection before rendering children |
| `src/ts/firebase.ts` | Firebase init from `VITE_FIREBASE_*` env vars (alias `firebase-config`) |
| `src/ts/auth.ts` | `onAuthStateChanged` → Redux `authState` |
| `src/ts/models/` | Types (`magic.ts` – Scryfall card/set types) and `NavigationPath` enum |
| `src/ts/modules/<feature>/` | Page views: home, login, signup, card-database (+ set), card, card-collection, card-recognition, admin |
| `src/ts/components/` | Reusable UI (card lists, mana cost, form inputs, `PrivateRoute`, spinner, tooltip) |
| `src/ts/slices/` | Layout pieces: navigation, footer |
| `src/ts/services/` | Firebase/Scryfall/recognition logic, exported as singletons |
| `src/ts/store/` | Redux: `actions-types/`, `actions/`, `reducers/`, `index.ts` |
| `src/ts/utils/` | Helpers (lazy load, `createImageBitmap` polyfill) |
| `src/assets/` | Images and SCSS (`app.scss` + partials) |
| `dist/` | Build output (ignored; served by nginx and Firebase Hosting) |
| `build.sh` | CI build script: exports `VITE_FIREBASE_*` and runs `npm run build` |
| `.github/workflows/nodejs.yml` | CI: lint, build, deploy to Firebase Hosting |

`build/`, `dist/`, `VERSION`, `size-plugin.json` and often `node_modules/` are owned by `root` because they are produced by the Docker container.

## Path aliases

Imports use bare aliases defined in `tsconfig.json` (resolved by Vite via `resolve.tsconfigPaths`). Use them instead of relative paths:

```ts
import CardDatabaseService from 'services/card-database'
import { RootState } from 'store/reducers/root-reducers'
import { NavigationPath } from 'models/routes'
```

Aliases: `app`, `auth`, `firebase-config`, `components/*`, `models/*`, `modules/*`, `services/*`, `slices/*`, `utils/*`, `store/*`. Adding a new top-level folder under `src/ts/` requires a new entry in `paths`.

## Firebase data model (Realtime Database)

| Path | Content |
|---|---|
| `scry-sets/{setCode}` | Full Scryfall set |
| `scry-cards-simple/{cardId}` | Subset of card fields (`scryCardSimpleKeys` in `services/scryfall.ts`); used for lists and name autocomplete (`orderByChild('name')`) |
| `scry-cards-full/{cardId}` | Full Scryfall card |
| `scry-user-cards/{uid}/{cardId}` | Number of copies the user owns; `null` removes the entry |

Database security rules and indexes are managed in the Firebase console, not in this repo. Queries on `name` / `set` rely on indexes there.

The admin page (`/admin`) imports sets and cards from Scryfall into Firebase, card by card, from the browser. It is slow and writes to the production database – do not trigger it as part of a task.

## Commands

```bash
npm install
npm run lint        # eslint on src/**/*.{js,jsx,ts,tsx}
npm run fix         # eslint --fix
npm run build       # tsc (type check, noEmit) + vite build -> dist/
npm run watch       # development build in watch mode (no dev server)
npm run preview     # serve dist/ locally

make build          # npm install if needed, lint, build, write VERSION
make watch / make lint / make clean / make deploy   # deploy = firebase deploy
```

`make` requires a `.env` file (it is `include`d). Vite reads `VITE_FIREBASE_*` from `.env` automatically.

On the home server the build runs in Docker (from the parent `terminal` repo):

```bash
fab run --names=mtg              # one-shot `make build`
fab run-dev --docker=mtg         # `make watch` via docker-compose.dev.yml
```

## Verifying changes

There is no test suite. Verify with:

```bash
npm run lint
npx tsc              # type check only (noEmit)
```

Run `npm run build` only if `.env` exists; it overwrites `dist/`, which is what the home server serves live. Do not run `make deploy` / `firebase deploy` unless explicitly asked.

## Conventions

- Prettier: no semicolons, single quotes, trailing commas, 2 spaces, width 120. ESLint enforces it (`prettier/prettier: error`).
- Functional components typed as `FunctionalComponent`; import `h` from `preact` in every TSX file.
- Explicit return types are expected (`explicit-function-return-type` is a warning). Prefix unused vars/args with `_`.
- Services are classes with a default-exported singleton instance (`CardDatabaseService`, `AuthService`, `scryfallService`).
- New Redux state: add types in `store/actions-types/`, creators in `store/actions/`, reducer in `store/reducers/`, register it in `root-reducers.ts` and the `RootActions` union.
- New page: add a view in `src/ts/modules/<name>/`, a value in `NavigationPath`, a `<Route>` / `<PrivateRoute>` in `app.tsx`, and a link in `slices/navigation.tsx`.
- Commit messages: short, lowercase, imperative (`update deps`, `add force to admin`).

## Rules for agents

- **Never commit secrets.** `.env` is ignored; do not add it or print its values. Firebase config is public at runtime, but keep it out of the repo anyway.
- Don't edit `dist/`, `build/` or `VERSION` – they are generated.
- Keep `package-lock.json` in sync when changing dependencies (use `npm install`, not manual edits).
- Don't call Scryfall in loops outside the admin import – it is rate-limited.

## Known quirks

- CI (`.github/workflows/nodejs.yml`) uses Node 18 and runs `npm run test`, which does not exist in `package.json`; the Docker image uses Node 24.
- `card-recognition.ts` is experimental: it manipulates the DOM directly and `demoTextRecognition` uses `require()`, which does not work under Vite.
- The `Makefile` sets `NODE_OPTIONS=--openssl-legacy-provider` (webpack-era leftover) and references an undefined `GIT_VERSION`, so `VERSION` ends up empty.
- `firebase.ts` does not pass `VITE_FIREBASE_APP_ID` to `initializeApp`.
- Several `// TODO` casts (`as never`, `as ScryCardSimple`) exist around Redux dispatch and Firebase responses.
