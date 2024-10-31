# syntax = docker/dockerfile:1

# Stage 1: Build React app
FROM node:22.9.0-slim as build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the source code into the container
COPY . .

# Build the app (this will output to the `build` folder)
RUN npm run build

# Stage 2: Serve the static files using a lightweight web server
FROM nginx:alpine

# Copy the NGINX configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app from the build stage to the NGINX web root
COPY --from=build /app/build /usr/share/nginx/html

# Copy the built React app from the build stage to the NGINX web root
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]