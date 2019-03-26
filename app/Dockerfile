# Make a compile layer
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

RUN npm run build

# The final image will only use nginx for servering static files
FROM nginx:1.15

## App directory
WORKDIR /srv/app

## Copy compiled files etc...
COPY --from=compile /usr/src/app/dist/ /srv/app/dist/
COPY --from=compile /usr/src/app/package.json /srv/app/
COPY --from=compile /usr/src/app/nginx.conf /srv/app/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
