FROM node:18-alpine as builder
WORKDIR /usr/src/app

# Copy package files and install dependencies (leverage layer caching)
COPY package*.json ./
COPY nx.json ./

RUN npm ci

# Copy the entire project and build
COPY . .
RUN npx nx build sandbox

# --- Stage 2: Serve with Nginx ---
FROM nginx:stable-alpine

# Copy the built Angular app from the 'builder' stage
COPY --from=builder /usr/src/app/dist/apps/sandbox/browser /usr/share/nginx/html

# --- Optional: Custom Nginx Configuration ---
# If you have a custom Nginx configuration (e.g., for routing, HTTPS),
# create an 'nginx.conf' file in your Angular app's root, and uncomment this:
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (default for HTTP)
EXPOSE 80

# Start Nginx (daemon off; keeps it running in the foreground)
CMD ["nginx", "-g", "daemon off;"]
