
# Build context: raíz del repo (en compose: context: . / dockerfile: apps/loyalty/Dockerfile)
FROM node:24
WORKDIR /usr/src/app
COPY . .
RUN npm ci -w loyalty -w @tp6/event-contracts
RUN npm run build -w @tp6/event-contracts
RUN npm run build -w loyalty
WORKDIR /usr/src/app/apps/loyalty
CMD ["node", "dist/main.js"]


