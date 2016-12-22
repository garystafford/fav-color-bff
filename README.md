[![Build Status](https://travis-ci.org/garystafford/fav-color-bff.svg?branch=master)](https://travis-ci.org/garystafford/fav-color-bff)

# Favorite Color Backend For Frontend (BFF)

## Introduction

The Favorite Color Backend For Frontend ([BFF](http://samnewman.io/patterns/architectural/bff/)) component, is part of a multi-tier Angular-Node-Spring-MongoDB application. The Favorite Color BFF component is a basic Node-based stand-alone proxy server, built on [Nodejitsu](https://nodejitsu.com/) [http-proxy](https://www.npmjs.com/package/http-proxy). As a proxy, the BFF component merely simulates a true BFF, and contains no actual business logic.

The BFF component proxies API calls from the [Favorite Color Web Application](https://github.com/garystafford/fav-color-ngweb) to the [Favorite Color Service](https://github.com/garystafford/fav-color-service), a Spring Boot RESTful microservice. For example, a call to the `/choices` endpoint at `http://bff.favcolor.com:8081/choices`, from the web application, will be proxied through the BFF, to the private backend service endpoint `/choices` at `http://api.favcolor.com:8091/choices`.

The entire application is designed to be provisioned and deployed to AWS, using HashiCorp Packer and Terraform. The web application and BFF are designed to sit in the public subnet behind load balancers, while the service(s) and database(s) would sit in the private subnet, also behind a load balancer.

## Quick Start for Local Development

Once MongoDB and the Favorite Color Web Application and Service are all up and running locally, clone, build, test, and run the Favorite Color Web Application, using the following commands:

```bash
git clone https://github.com/garystafford/fav-color-bff.git
cd fav-color-bff
npm install
npm start
```

The Favorite Color BFF component should start successfully on the default host/port combination of `http://localhost:8081`, and be ready to take calls from the web application and proxy them to the service.

## Configuration Management

Informational only, the project uses the [config](https://www.npmjs.com/package/config) npm package for specifying environment specific configuration. Each environment is represented by a separate JSON configuration file, in the `config` directory, located in the root of the project. There is also a default `default.json`, intended for local development.

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

Setting the `NODE_ENV` environment variables, either by exporting it in advance, or on the command-line when the application is started, dictates which config file is used. For example, using `NODE_ENV=production` specifies that the `production.json` will be used to source environment specific configuration.

The code is written, such that all configuration in the configuration file can be overridden using environment variables, exported in advance, or on the command-line when the application is started. For example, to change the BFF listening port and service port to proxy request to, when starting the BFF, run:

```bash
PORT=1234 API_PORT=5678 node app.js
```

## Build Production Distribution

The BFF component uses [Gulp](http://gulpjs.com/), with [Babel](https://www.npmjs.com/package/gulp-babel), for workflow automation. To create the `dist` directory, in the project's root directory, for deployment to Production, use one Gulp command, `gulp dist`. This command aggregates several other commands together to build a deployable build artifact.

```bash
gulp dist
```

## Run in Production

After deploying the contents of the `dist` directory, run the following commands from within the `dist` directory.

```bash
NODE_ENV=production npm install
node app.js
```

Using `NODE_ENV=production` means that only required npm packages in the `dependencies` section of the `package.json` will be installed, not npm packages in the `devDependencies` section.

In addition, setting `NODE_ENV=production` means that the `production.json` will be used to source environment specific configuration. Note this file will need to be modified for your use; its values are specific to my AWS Production environment.

Remember, you can override the configuration using environment variables on the command-line, as shown above.

## Reference

- [Splitting a gulpfile into multiple files](http://macr.ae/article/splitting-gulpfile-multiple-files.html)
- [Pattern: Backends For Frontends](http://samnewman.io/patterns/architectural/bff/)
- [BFF @ SoundCloud](https://www.thoughtworks.com/insights/blog/bff-soundcloud)
