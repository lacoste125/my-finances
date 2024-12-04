FROM node:23-alpine3.19
LABEL authors="mario"

WORKDIR /usr/src/my-finances-fe

COPY . .

RUN npm install

ENTRYPOINT ["npm", "start"]