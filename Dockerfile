FROM node:12.10.0-alpine

WORKDIR /usr/app

ENV TOKEN_BOT=1314464657:AAGW8NAZB4qN6SkY1yJunbPJf6U9fCZ0U0s

COPY package*.json ./

RUN npm ci -qy

COPY . .

CMD ["npm", "start"]