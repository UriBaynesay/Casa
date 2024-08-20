FROM node:latest

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV NODE_ENV=docker

EXPOSE 3030

CMD [ "npm" , "start" ]