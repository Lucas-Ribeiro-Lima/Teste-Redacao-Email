FROM node:23-alpine3.20

RUN mkdir /webapp

WORKDIR /webapp

COPY . .

RUN npm instal --omit=dev

EXPOSE 3000
CMD [ "npm", "start" ]