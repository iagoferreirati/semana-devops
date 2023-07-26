FROM node

COPY . /app

WORKDIR /app
RUN npm install
RUN npm install elastic-apm-node --save

CMD [ "npm", "start" ]

EXPOSE 80