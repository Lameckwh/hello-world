# DockerHub-based Dockerfile for Next.js app on OpenShift
# Build stage
FROM docker.io/library/node:20 AS builder
WORKDIR /app
# Install all dependencies (including devDependencies) for build
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

FROM docker.io/library/node:20-slim
WORKDIR /app
ENV NODE_ENV=production
# Install only production dependencies in runtime image
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev && rm -rf ~/.npm
# Copy built app and public assets from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# EXPOSE 3000
# EXPOSE 3000

CMD ["npm", "start"]