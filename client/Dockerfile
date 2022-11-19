# Dockerfile for React client

# Build react client
FROM node:14.5.0-alpine

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

# copy local files to app folder
COPY . .

###  Installing dependencies

RUN npm install --silent

EXPOSE 8080

CMD ["npm","start"]