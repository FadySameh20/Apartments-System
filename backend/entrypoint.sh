#!/bin/sh
set -e

npx prisma generate

npx prisma migrate dev

npx prisma db seed

npm run dev
