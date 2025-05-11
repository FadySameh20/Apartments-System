#!/bin/sh
set -e

npx prisma generate

npx prisma migrate deploy

npx prisma db seed

npm run build

npm start

## For development
# npm run dev   # Instead of "npm run build" and "npm start"
