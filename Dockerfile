# Base image
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./

RUN npm ci

COPY . ./

RUN npm run build && npm prune --production 

WORKDIR /app/client

RUN npm ci && npm run build

ENV NODE_ENV production

RUN rm -rf node_modules && rm -rf src

WORKDIR /app
CMD [ "node", "dist/main.js" ]