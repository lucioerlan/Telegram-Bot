FROM node:12.10.0-alpine

WORKDIR /usr/app

ENV TOKEN_BOT=00000000000000000000000000000000000000

COPY package*.json ./

RUN npm ci -qy

COPY . .

CMD ["npm", "start"]
