# UBI-based Dockerfile for Next.js app on OpenShift
# Build stage
FROM registry.access.redhat.com/ubi9/nodejs-20 as builder

LABEL maintainer="Lameck Mbewe <lmbewe@mitra.mw>"
LABEL io.openshift.expose-services="3000:http"
LABEL io.openshift.tags="nextjs,nodejs,ubi9,nodejs20"

WORKDIR /opt/app-root/src



# Install all dependencies (including devDependencies) for build
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build


FROM registry.access.redhat.com/ubi9/nodejs-20-minimal

LABEL maintainer="Lameck Mbewe <lmbewe@mitra.mw>"
LABEL io.openshift.expose-services="3000:http"
LABEL io.openshift.tags="nextjs,nodejs,ubi9,nodejs20"

WORKDIR /opt/app-root/src

ENV NODE_ENV=production
ENV PORT=3000



# Install only production dependencies in runtime image
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev && rm -rf ~/.npm

# Copy built app and public assets from builder
COPY --from=builder /opt/app-root/src/.next ./.next
COPY --from=builder /opt/app-root/src/public ./public

CMD ["npm", "start"]
