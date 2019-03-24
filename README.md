# Demo Project

This is a demo project includes a Web UI and an API server. Everything is implemented from scratch.

## Built With
As general, I am using **ESLint** for Typescript code style checking, and **Docker** for containerization.

For the FrontEnd, I am using

* Webpack
* React
* Typescript
* [Apollo Graphql](https://www.apollographql.com/) - The GraphQL Platform, can also be a replacement of Redux.
* [BlueprintJS](https://blueprintjs.com/) - A React-based UI toolkit for the web.

For the API Server, I am using

* NodeJS
* Typescript
* GraphQL
* Mongoose - A MongoDB client for NodeJS

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

For running the app in your local you need to have **NodeJS** installed.


### Installing

Running the app:
```bash
cd app
npm install
npm start
```

Running the server

```
cd server
npm install
npm start
```

After this you should be able to see the web app is lanched in `http://localhost:3000` and the server is in `http://localhost:4000`, webpack-dev-sever should proxy the `/graphql` endpoint to the server.

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### The coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system
