FROM node:10.15.2

RUN echo "deb http://archive.debian.org/debian stretch main" > /etc/apt/sources.list
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y sqlite3 libsqlite3-dev

WORKDIR /db
WORKDIR /app
COPY . .
RUN yarn install
RUN cd client && yarn install
RUN cd server && yarn install
RUN cd client && yarn build

ENV DATABASE_FILE_PATH=/db/db.sqlite


ENV NODE_ENV=production
CMD ["node", "server/src/index.js"]
