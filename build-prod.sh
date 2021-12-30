npm run build-prod
cp -r ./build/client ./src/client
cp -r ./build/server ./src/server
mv ./src/client/client ./src/client/build
mv ./src/server/server ./src/server/build
docker-compose build
rm -r ./build
rm -r ./buildScripts/build
rm -r ./src/client/build
rm -r ./src/server/build