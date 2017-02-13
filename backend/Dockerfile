FROM node:7

RUN mkdir -p /opt/backend/container

WORKDIR /opt/backend

COPY ./package.json /opt/backend/

RUN npm install

COPY ./ /opt/backend/container

EXPOSE 1337

CMD [ "npm", "start" ]
