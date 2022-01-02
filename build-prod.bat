:: Build all the services
call npm run build-prod
:: Gzip
call npm run build-gzipper
move .\buildScripts\gzipper.exe .\buildScripts\build
start .\buildScripts\build\gzipper.exe
:: Move over build output files to the corresponding src directory
move /Y .\build\client .\src\client\build
move /Y .\build\server .\src\server\build
:: Build the docker services
call docker-compose build
:: Remove all the build output files
RMDIR /S /Q .\build
RMDIR /S /Q .\buildScripts\build
RMDIR /S /Q .\src\client\build
RMDIR /S /Q .\src\server\build