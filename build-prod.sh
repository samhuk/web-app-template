# Build all the services
npm run build-prod
# gzip
./buildScripts/gzipper
# Move over build output files to the corresponding src directory
cp -r ./build/client ./src/client
cp -r ./build/server ./src/server
mv ./src/client/client ./src/client/build
mv ./src/server/server ./src/server/build
# Build the docker services
docker-compose build
# Remove all the build output files
rm -r ./build
rm -r ./buildScripts/build
rm -r ./src/client/build
rm -r ./src/server/build