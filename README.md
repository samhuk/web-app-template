# 🌳 TREE Starter

![build](https://github.com/samhuk/tree-starter/actions/workflows/build.yaml/badge.svg)
![MIT License](https://img.shields.io/badge/License-MIT-green.svg)

A template react-redux & expressjs web application using ESLint, Typescript, Jest, Docker, and more.

## Usage

This is useful as a template repository to get started making your web application faster, or as a reference for how modern web development technologies can be used, and how they can make for a great developer experience when combined.

## Technologies

* Typescript, 100%
* React
* Redux
* SCSS
* ExpressJS
* Jest
* ESBuild
* ESLint
* Docker
* Go
* NGINX

## Notable Features
* Ultra fast hot reloading
* Development and production modes (prod using Docker)
* Gzip in production mode
* ...

## Development Deployment

One must have Node and Npm installed. Get Node from [nodejs.org](https://nodejs.org/en/download/).

Run `npm i`

Run `npm start`

Try navigating to http://localhost:4001

## Testing

Jest is used for unit testing. A single simple test (`src/common/array.spec.ts`) has been implemented for demonstration purposes.

Run `npm run unit-tests` to build and run the unit tests.

## Linting

Eslint is used for linting.

Run `npm run lint` to lint all the source according to the rules within `.eslintrc.json`

## Debugging

`.vscode/launch.json` features 3 debug tasks.

## Type Checking

The hot-reloading watch tasks in package.json use ESBuild to achieve the fast hot-reloading. ESBuild only removes the non-javascript part of typescript, and does not check the validity of the non-javascript (e.g. type declarations, etc.) part of the typescript codebase.

This "type-checking" can be achieved separately via running `npm run build-tsc`, which uses `tsc` to build the typescript code, which _does_ perform full type-checking.

### Client

To debug the client, either a browser's native developer window can be used, or, if Firefox is being used, the _Attach Client_ debug task can be ran which attaches VSCode to the currently-active open instance of the client. Firefox has to be specifically configured to achieve this.

### Server

To debug the NodeJS server, the node process can be attached to by VSCode with the _Attach Server_ debug task.

### Unit Tests

To debug the Jest unit tests, they can be built and launched with the _Run Unit Tests_ debug task.

## Production Deployment

One must have Node, NPM, Docker, and Go installed to deploy the application in production mode. Get Docker from [docker.com](https://docs.docker.com/get-docker/). Get Go from [go.dev](https://go.dev/doc/install).

Run `npm i`

Run `sh build-prod.sh` (or `build-prod.bat` if on Windows)

Run `docker-compose up -d`

Try navigating to http://localhost:80 (for the client) or http://localhost:81/api/healthcheck (for the api).

To stop the app, run `docker-compose down`
