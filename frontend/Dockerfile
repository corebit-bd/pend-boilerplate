# Use NodeJS Version from Build Args (For docker-compose Compatibility)
ARG NODE_VERSION=24

# Stage 1 : Dependencies
FROM node:${NODE_VERSION}-slim AS dependencies

# Set Working Directory
WORKDIR /app

# Copy Package Files
COPY package.json package-lock.json ./

# Install Dependencies with Legacy Peer Dependencies
RUN npm ci --legacy-peer-deps

# Stage 2 : Builder
FROM node:${NODE_VERSION}-slim AS builder

# Set Working Directory
WORKDIR /app

# Copy Dependencies from "dependencies" Stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy All Project Files
COPY . .

# Build the NextJS Application
RUN npm run build

# Stage 3 : Production Runner
FROM node:${NODE_VERSION}-slim AS runner

# Set Working Directory
WORKDIR /app

# Set Environment to Production
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create Non-Root User for Security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy Necessary Files from Builder
COPY --from=builder /app/public ./public

# Copy Standalone Output for Optimized Production
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to Non-Root User
USER nextjs

# Expose Port 3000
EXPOSE 3000

# Start the NextJS Application using Standalone Server
CMD ["node", "server.js"]