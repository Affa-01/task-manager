@echo off
REM Build the application
call ./gradlew.bat bootJar

REM Build the Docker image
docker build -t task-manager-backend .

REM Run the container
docker run -p 3000:3000 task-manager-backend