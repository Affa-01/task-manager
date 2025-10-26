@echo off

set PGDATA=database
set PGPORT=5555

echo PGDATA is set to: %PGDATA%
if not exist "%PGDATA%" mkdir "%PGDATA%"

echo Initializing PostgreSQL cluster in "%PGDATA%"...
initdb -D %PGDATA% -A trust -U postgres

echo Starting PostgreSQL on port %PGPORT%...
pg_ctl -D %PGDATA% -o "-p %PGPORT%" start -w

echo Running initialization script...
psql -U postgres -p %PGPORT% -f "initializeDB.sql"

echo Stopping PostgreSQL...
pg_ctl -D "%PGDATA%" stop

pause