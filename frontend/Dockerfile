# Multi-stage Dockerfile for React Frontend

# ==========================================
# Stage 1: Build React Application
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

RUN npm install

# Copy source code
COPY . .

# Build with relative API path (works with Ingress/Reverse Proxy)
ARG VITE_API_URL=/api/v1
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build


# ==========================================
# Stage 2: Production - Nginx
# ==========================================
FROM nginx:1.25-alpine AS production

# Install envsubst
RUN apk add --no-cache gettext

# Copy main nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy template instead of static config
COPY default.conf.template /etc/nginx/templates/default.conf.template

# Copy custom entrypoint
COPY docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

# Copy built frontend
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://127.0.0.1/health || exit 1

# Default values (can be overridden by Docker Compose or Kubernetes)
ENV BACKEND_HOST=backend
ENV BACKEND_PORT=5000

# Start nginx after generating config
ENTRYPOINT ["/docker-entrypoint.sh"]