FROM node:20-alpine as builder

WORKDIR /app

COPY . .

RUN yarn install

CMD ["yarn", "start:dev"]