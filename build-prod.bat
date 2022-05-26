:: Build all the services
call npm run build-prod
:: Gzip
call npm run build-gzipper
timeout 1
move .\buildScripts\gzipper.exe .\buildScripts\build
start .\buildScripts\build\gzipper.exe
timeout 1
:: Move over build output files to the corresponding src directory
move /Y .\build\client .\src\client\build
move /Y .\build\server .\src\server\build
timeout 1
:: Build the docker services
call docker compose build
:: Remove all the build output files
rmdir /S /Q .\build
rmdir /S /Q .\buildScripts\build
rmdir /S /Q .\src\client\build
rmdir /S /Q .\src\server\build