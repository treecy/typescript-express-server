FROM node:10 as compile

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . ./

RUN npm run compile

FROM node:10

## App directory
WORKDIR /srv/app

## Install production node_modules
COPY --from=compile /usr/src/app/package*.json /srv/app/
RUN npm install --production

## Copy compiled files etc...
COPY --from=compile /usr/src/app/dist/ /srv/app/dist/


EXPOSE 80
CMD ["node", "dist/index.js"]
