# Build context: raíz del repo (en compose: context: . / dockerfile: apps/billing/Dockerfile)

# Use the official Node.js image as the base image
FROM node:24

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the whole monorepo (lo que no hace falta lo filtra .dockerignore)
COPY . .

# Install only this service's dependencies
RUN npm ci -w notification

# Build the NestJS application
RUN npm run build -w notification

# Run from the service folder
WORKDIR /usr/src/app/apps/notification

# Sin EXPOSE: billing solo consume y publica en Kafka, no recibe HTTP

# Command to run the application
CMD ["node", "dist/main.js"]