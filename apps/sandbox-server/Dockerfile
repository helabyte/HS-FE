# --- Base Node Image (for building and running) ---
FROM node:18-alpine as base
WORKDIR /usr/src/app
# Copy only essential files first to leverage Docker layer caching
COPY package*.json ./
COPY nx.json ./

# --- Install Dependencies (Stage 1: Dependencies) ---
FROM base as deps
RUN npm ci

# --- Build the NestJS App (Stage 2: Builder) ---
FROM base as builder
# Copy node_modules from the 'deps' stage to speed up builds (cache layer reuse)
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN npx nx build sandbox-server --prod  # Build with NX in production mode

# --- Production Image (Stage 3: Runner) ---
FROM node:18-alpine as runner
WORKDIR /usr/src/app

# Copy ONLY the necessary files from the 'builder' stage:
# - The compiled NestJS application (from the 'dist' folder)
COPY --from=builder /usr/src/app/dist/apps/sandbox-server .
# - production node modules
COPY --from=deps /usr/src/app/node_modules ./node_modules

# --- Environment Variables (IMPORTANT) ---
# Set these as needed.  For example:
# ENV NODE_ENV=production  # Always set NODE_ENV to production
# ENV PORT=3000         # The port your NestJS app listens on (default is usually 3000)
# ENV DATABASE_URL=...   # Your database connection string (if applicable)
# ... other environment variables ...

# --- Expose the Port ---
# Expose the port your app listens on
EXPOSE 3000

# --- Health Check (Optional but Recommended) ---
# This uses the @nestjs/terminus package for a proper health check.
# You'll need to install it: `npm install @nestjs/terminus`
# And create a health check endpoint in your NestJS app (see explanation below).
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl --fail http://localhost:3000/api/health || exit 1 # Adjust the path (/health) if needed

# --- Start Command ---
CMD ["node", "main.js"]
