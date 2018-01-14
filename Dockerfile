FROM node:alpine

WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn --pure-lockfile --production

COPY . /app/

CMD yarn start:production
