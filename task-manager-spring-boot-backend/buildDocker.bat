@echo off
REM Build the application
call ./gradlew.bat bootJar

REM Build the Docker image
docker build -t task-manager-backend .