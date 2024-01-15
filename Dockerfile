FROM node:21-alpine

WORKDIR /usr/src/app

COPY svelte.config.js ./
COPY package.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./

RUN npm install

COPY ./.svelte-kit/tsconfig.json ./.svelte-kit/tsconfig.json
COPY ./src ./src
COPY ./static ./static

RUN npm run-script build

EXPOSE 5000

ENV HOST=0.0.0.0

CMD [ "npm", "run", "start" ]