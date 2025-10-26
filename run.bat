@echo off
REM === Start PostgreSQL on a custom port ===
set PGPORT=5555
set PGDATA="database"

echo Starting PostgreSQL on port %PGPORT%...
start cmd /k "postgres -D %PGDATA% -p %PGPORT%"

REM === Wait for PostgreSQL to start ===
timeout /t 5 >nul

echo Running Angular server
start cmd /k "cd "task-manager-angular-client" && ng serve --port 4300"

echo Running spring server
start cmd /k "cd "task-manager-spring-boot-backend" && gradlew bootRun"

pause
