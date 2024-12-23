FROM node:20.16.0-alpine
 
WORKDIR /usr/src/app
 
COPY . .
 
RUN npm install
RUN npm run build
RUN npx --workspace api  prisma migrate dev --name init
RUN npm run prisma:seed --workspace api

EXPOSE 3000
 