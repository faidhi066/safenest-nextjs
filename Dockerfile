FROM node:20-bullseye AS builder

WORKDIR /app

# Install OpenSSL
RUN apt-get update && apt-get install -y openssl

# Copy and install deps
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# Copy the rest of the app
COPY . .

# Generate Prisma client for correct target
RUN npx prisma generate

# Build your Next.js app
RUN npm run build

# Run production server
CMD ["npm", "run", "start"]