FROM node:latest

ADD . /home/node/app
WORKDIR /home/node/app

RUN npm install