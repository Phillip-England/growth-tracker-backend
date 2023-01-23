FROM node:latest
WORKDIR /home/node/app
COPY . .
RUN apt-get update
RUN apt-get upgrade -y
RUN npm install
