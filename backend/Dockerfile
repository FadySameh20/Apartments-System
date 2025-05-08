FROM node:22.15

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["sh", "-c", "npx sequelize-cli db:migrate && npm run dev"]
