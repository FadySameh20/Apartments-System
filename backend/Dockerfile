FROM node:22.15

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["sh", "-c", "npx prisma generate && npx prisma migrate dev && npx prisma db seed && npm run dev"]
