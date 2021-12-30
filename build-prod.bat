npm run build-prod
copy -r ./build/client ./src/client
copy -r ./build/server ./src/server
move ./src/client/client ./src/client/build
move ./src/server/server ./src/server/build
docker-compose build
del ./build
del ./buildScripts/build
del ./src/client/build
del ./src/server/build