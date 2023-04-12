FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci
RUN npm install --save-dev ts-node nodemon
COPY . .
CMD [ "npm", "run", "start" ]