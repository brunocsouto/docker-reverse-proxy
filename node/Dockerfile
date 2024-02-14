FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN npm install

USER node

EXPOSE 3000

ENTRYPOINT [ "node", "index.js" ]