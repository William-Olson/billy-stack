FROM node:7

RUN mkdir -p /opt/backend/container

WORKDIR /opt/backend

COPY ./ /opt/backend/container

RUN cp /opt/backend/container/package.json /opt/backend/package.json

RUN npm install

EXPOSE 1337

CMD [ "npm", "start" ]
