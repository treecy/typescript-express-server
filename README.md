# GraphQL Full-Stack Project

This project is implemented with a React Client App and a [GraphQL](https://graphql.org/) server in NodeJS.

Everything is implemented from scratch.
```bash
.
├── README.md
├── app ## Source code for the Web UI
├── server ## Source code for the server
├── lint ## Common ESLint Config
└── docker-compose.yml ## Docker services configuration
```
For more details you can check [app/README.md](app/README.md) and [server/README.md](server/README.md)
## Built With
As general, I am using **ESLint** for Typescript code style checking, and **Docker** for containerization.

For the client, I am using

* Webpack
* React
* Typescript
* [Apollo Client](https://www.apollographql.com/docs/react/) - A library to use GraphQL to build client applications.
* [BlueprintJS](https://blueprintjs.com/) - A React-based UI toolkit for the web.

For the server, I am using

* NodeJS
* Typescript
* [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
* [Mongoose](https://mongoosejs.com/) - A Schema-based MongoDB client for NodeJS

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

For running the app in your local you need to have **NodeJS** and **MongoDB** installed.

For testing the containerization, you need to have **Docker** installed.

### Installing
#### 1. Start the mongo instance with docker:
```bash
# Start a mongo container
docker-compose -d up mongo

# Copy the mock data into container
docker cp server/mock mongo:/tmp

# Import the mock data
docker exec mongo mongoimport -d demo -c users --file /tmp/users.json
docker exec mongo mongoimport -d demo -c posts --file /tmp/posts.json
```

#### 2. Running the app:
```bash
cd app
npm install
npm start
```

#### 3. Running the server

```
cd server
npm install
npm start:dev
```

After this you should be able to see the web app is lanched in `http://localhost:3000` and the server is in `http://localhost:4000`, webpack-dev-sever should proxy the `/graphql` endpoint to the server.

## Deployment

This project is using Docker to handle the production deployment. 

With the `docker-compose.yml`, we can start all the necessary services very easy and it will handle all the dependency.

You can either use it with Docker Swarm or Kubernetes.
```bash
# Start the servers in docker swarm
docker stack deploy -c docker-compose.yml production
```

## HighLights
- 

## Running the tests

TBD

### Break down into end to end tests

TBD
