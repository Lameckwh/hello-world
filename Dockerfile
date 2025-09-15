# Build stage
FROM registry.access.redhat.com/ubi9/nodejs-20 as builder
WORKDIR /opt/app-root/src
# Install all dependencies (including devDependencies) for build
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
# Build the Next.js app with standalone output
RUN npm run build
# Create standalone output
RUN npx next build --standalone

# Runtime stage
FROM registry.access.redhat.com/ubi9/nodejs-20-minimal
WORKDIR /opt/app-root/src
ENV NODE_ENV=production
# Install only production dependencies
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev && rm -rf ~/.npm
# Copy the standalone output and public assets
COPY --from=builder /opt/app-root/src/.next/standalone ./
COPY --from=builder /opt/app-root/src/.next/static ./.next/static
COPY --from=builder /opt/app-root/src/public ./public
# Ensure the app runs on port 8080 to match OpenShift service
ENV PORT=8080
EXPOSE 8080
# Run the Next.js standalone server
CMD ["node", "server.js"]