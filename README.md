[![Build Status](https://travis-ci.org/garystafford/fav-color-ngweb.svg?branch=master)](https://travis-ci.org/garystafford/fav-color-ngweb)

# Favorite Color Backend For Frontend (BFF)

## Introduction

The Favorite Color Backend For Frontend ([BFF](http://samnewman.io/patterns/architectural/bff/)) component, is part of a multi-tier Angular-Node-Spring-MongoDB application. The BFF component is a simple Node proxy service, built on [Nodejitsu](https://nodejitsu.com/) [http-proxy](https://www.npmjs.com/package/http-proxy). As a proxy, the BFF component merely simulates a true BFF, and contains no actual business logic. The BFF component proxies API calls from the [Favorite Color Web Application](https://github.com/garystafford/fav-color-ngweb) to the [Favorite Color](https://github.com/garystafford/fav-color-service) Spring Boot RESTful microservice.

The entire application is designed to be provisioned and deployed to AWS, using HashiCorp Packer and Terraform. The web application and BFF are designed to sit in the public subnet behind load balancers, while the service(s) and database(s) would sit in the private subnet, also behind a load balancer.

## Quick Start for Local Development

Once MongoDB and the Favorite Color Web Application and Favorite Color Service, are all up and running locally, clone, build, test, and run the Favorite Color Web Application, using the following commands:

```bash
git clone https://github.com/garystafford/fav-color-bff.git
cd fav-color-bff
npm install
npm start
```

The Favorite Color BFF component should start successfully on `http://localhost:8081`, and be ready to take calls from the web application and proxy them to the service.

## Environment Configuration

Informational only, the project uses the [config](https://www.npmjs.com/package/config) NPM package for specifying environment specific configuration. Each environment is represented by a separate JSON configuration file, in the `config` directory, located in the root of the project. There is also a default `default.json`, intended for local development.

```json
{
  "port": "8081",
  "api": {
    "description": "Call the service directly in a local development environment",
    "url": "http://localhost",
    "port": "8091"
  }
}
```

All configuration can be overridden using environment variables, exported in advance, or on the command-line, when the application is started. For example:

```bash
PORT=1234 API_PRT=5678 node app.js
```

## Build Production Distribution

The BFF component uses [Gulp](http://gulpjs.com/) for workflow automation. To create the `dist` directory, in the project's root directory, for deployment to Production, use one Gulp command, `client.build:dist`. This command aggregates several other commands together to build a deployable build artifact.

```bash
gulp client.build:dist
```

## Run with Node in Production

To run the BFF component using Node, in Production, after deploying after deploying the contents of the `dist` directory, run the following commands from within the `dist` directory. Environment variable, `PORT` is fully configurable. Note the values in the `configFile.js` will need to be modified for your use. They is specific to my AWS Production environment.

```bash
NODE_ENV=production npm install
node app.js
```