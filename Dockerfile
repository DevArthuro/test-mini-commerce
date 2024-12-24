FROM node:20.16.0-alpine
 
WORKDIR /usr/src/app
 
COPY . .
 
RUN npm install
RUN npm run build

EXPOSE 3000
 