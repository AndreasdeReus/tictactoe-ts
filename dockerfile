# syntax=docker/dockerfile:1

# Build stage: compile the TypeScript/Vite app
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Runtime stage: serve static files via Nginx on port 80
FROM nginx:1.25-alpine AS runner

# Use provided nginx config if present
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
