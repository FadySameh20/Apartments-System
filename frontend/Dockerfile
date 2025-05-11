FROM node:22.15

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x /app/entrypoint.sh

CMD ["/app/entrypoint.sh"]
