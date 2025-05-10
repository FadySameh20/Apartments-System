# # 1. Build Stage
# FROM node:22.15 AS builder

# WORKDIR /app

# # Install dependencies
# COPY package*.json ./
# RUN npm install

# # Copy rest of the files
# COPY . .

# # Build the Next.js app
# RUN npm run build

# # 2. Production Stage
# FROM node:22.15 AS runner

# WORKDIR /app

# # Install only production deps
# COPY package*.json ./
# RUN npm install --omit=dev

# # Copy built app from builder
# COPY --from=builder /app/.next .next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/next.config.mjs ./next.config.mjs
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# # Start the app
# CMD ["npm", "start"]


FROM node:22.15

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]