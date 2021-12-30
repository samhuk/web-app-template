# TREE Starter

![build](https://github.com/samhuk/tree-starter/actions/workflows/build.yml/badge.svg)
![MIT License](https://img.shields.io/badge/License-MIT-green.svg)

A starter for a react-redux & expressjs web application.

Notable technologies used:
* Typescript, 100%
* React (with Redux)
* ExpressJS
* ESBuild
* SCSS

Notable features:
* Hot reloading (using livereload)
* Development and production modes

## Development Deployment

One must have node and npm installed. Get node from [nodejs.org](https://nodejs.org/en/download/).

Run `npm install`

Run `npm start`

Try navigating to localhost:4001.

## Production Deployment

One must have node, npm, and docker installed to deploy the application in production mode. Get docker from [docker.com](https://docs.docker.com/get-docker/).

Run `npm install`

Run `sh build-prod.sh`

Run `sh start-prod.sh`

Try navigating to localhost:8080.
