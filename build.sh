#!/usr/bin/env bash

if [[ -f .env ]]; then
  source .env
  export VITE_FIREBASE_API_KEY=$VITE_FIREBASE_API_KEY
  export VITE_FIREBASE_AUTH_DOMAIN=$VITE_FIREBASE_AUTH_DOMAIN
  export VITE_FIREBASE_DATABASE_URL=$VITE_FIREBASE_DATABASE_URL
  export VITE_FIREBASE_PROJECT_ID=$VITE_FIREBASE_PROJECT_ID
  export VITE_FIREBASE_STORAGE_BUCKET=$VITE_FIREBASE_STORAGE_BUCKET
  export VITE_FIREBASE_MESSAGING_SENDER_ID=$VITE_FIREBASE_MESSAGING_SENDER_ID
  export VITE_FIREBASE_APP_ID=$VITE_FIREBASE_APP_ID
else
  export VITE_FIREBASE_API_KEY="${VITE_FIREBASE_API_KEY}"
  export VITE_FIREBASE_AUTH_DOMAIN="${VITE_FIREBASE_AUTH_DOMAIN}"
  export VITE_FIREBASE_DATABASE_URL="${VITE_FIREBASE_DATABASE_URL}"
  export VITE_FIREBASE_PROJECT_ID="${VITE_FIREBASE_PROJECT_ID}"
  export VITE_FIREBASE_STORAGE_BUCKET="${VITE_FIREBASE_STORAGE_BUCKET}"
  export VITE_FIREBASE_MESSAGING_SENDER_ID="${VITE_FIREBASE_MESSAGING_SENDER_ID}"
  export VITE_FIREBASE_APP_ID="${VITE_FIREBASE_APP_ID}"
fi

mkdir dist

npm run build
