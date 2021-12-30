# TREE Starter

A starter for a react-redux & expressjs web application.

Notable technologies used:
* Typescript, 100%
* React (with Redux)
* ExpressJS
* ESBuild
* SCSS

## Development

Run `npm start` to start the ExpressJS server, hosting the api endpoints and serving the client files.

## Production Deployment

One must have docker installed to deploy the application in production mode.

run `sh build-prod.sh`

This will build the docker images for the client and the API

run `sh start-prod.sh`

This will run the client and API docker images. Try navigating to localhost:8080.
