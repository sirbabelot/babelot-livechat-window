# Dockerfile
FROM node:5

RUN npm install webpack -g
RUN npm install webpack-dev-server -g

# Create app directory
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

# RUN npm install

EXPOSE 9999
EXPOSE 15672
EXPOSE 46871

CMD [ "node", "service.js" ]
