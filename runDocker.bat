@echo off
REM === Start PostgreSQL on a custom port ===
set PGPORT=5555
set PGDATA="database"

echo Starting PostgreSQL on port %PGPORT%...
start cmd /k "postgres -D %PGDATA% -p %PGPORT%"

REM === Wait for PostgreSQL to start ===
timeout /t 5 >nul

echo Running Angular server at http://localhost:8080
start cmd /k "cd "task-manager-angular-client" && docker compose up --build"

echo Running spring server
start cmd /k "cd "task-manager-spring-boot-backend" && docker build -t task-manager-backend . && docker run -p 3000:3000 task-manager-backend"

pause
