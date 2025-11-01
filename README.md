

# Task Manager

A simple task manager application with an Angular frontend and a Spring Boot backend. This repository includes a Docker Compose setup that runs the frontend, backend, and a PostgreSQL database. 

## Table of Contents

- [Project structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Quick start (Docker)](#quick-start-docker)
- [Database initialization](#database-initialization)
- [Running services locally](#running-services-locally)
- [Configuration / Environment variables](#configuration--environment-variables)
- [Troubleshooting](#troubleshooting)
- [Development notes](#development-notes)
- [License](#license)


## Project structure

Top-level folders you'll commonly work with:

- `task-manager-angular-client/` — Angular frontend project
- `task-manager-spring-boot-backend/` — Spring Boot backend
- `compose.yaml` — Docker Compose file that starts frontend, backend, and PostgreSQL
- `initializeDB.sql` — SQL file used to initialize the PostgreSQL database
- `runDocker.bat`, `run.bat` — scripts to execute the project with and without docker


## Prerequisites

- Docker & Docker Compose (Docker Desktop)
- For local development: Java (matching Spring Boot project), Node.js (matching Angular project)


## Quick start (Docker)

This will start the frontend, backend and a PostgreSQL database using the `compose.yaml` file.

From the repository root (PowerShell / Windows):

```powershell
docker compose up --build
```

Notes:

- The PostgreSQL server is exposed on the host at port `5555` and runs inside the container on the default PostgreSQL port `5432`.
- Database connection details (from `compose.yaml`):
	- Host: `postgres` (from inside Docker network) / `localhost` (from host)
	- Port: `5432` (container) — Spring Boot connects to `postgres:5432`
	- Host-mapped port: `5555` (host)
	- Database: `taskmanager`
	- Username: `postgres`
	- Password: `postgres`


## Database initialization

The compose setup mounts `initializeDB.sql` into the official Postgres image's `/docker-entrypoint-initdb.d/` directory. When the container is started for the first time (empty data directory), Postgres will execute any `*.sql` scripts found in that directory.

Ensure `initializeDB.sql` is present at the repository root. The current compose mounts it like:

```
./initializeDB.sql:/docker-entrypoint-initdb.d/init.sql
```

If you need to manually run or re-run the initialization SQL against a running DB (for testing), you can use `psql`. Example (from host PowerShell):

```powershell
# run a shell in the running container and execute the SQL
docker exec -i $(docker ps -q -f name=postgres) psql -U postgres -d taskmanager -f /docker-entrypoint-initdb.d/init.sql

# OR use psql from host (if installed) to connect to mapped port 5555
psql -h localhost -p 5555 -U postgres -d taskmanager -f ./initializeDB.sql
```

Important: The automatic execution only runs on first initialization. If the DB volume already contains data, the script will not be re-applied. To force re-initialization, remove the Docker volume used for Postgres data (see `compose.yaml` volume `postgres_data`) and restart the container — WARNING: this destroys existing DB data.


## Running services locally (without Docker)

Frontend (Angular):

```powershell
cd task-manager-angular-client
npm install
npm run start
```

Backend (Spring Boot):

```powershell
cd task-manager-spring-boot-backend
./gradlew bootRun
```

Make sure to configure the backend's datasource (see section below) to point to your running PostgreSQL instance.


## Configuration / Environment variables

Two important envvars used in the Docker Compose configuration for the Spring Boot app:

- `SPRING_PROFILES_ACTIVE` — activates Spring profiles (compose sets `docker`)
- `SPRING_DATASOURCE_URL` — JDBC URL; inside the Docker network the backend uses `jdbc:postgresql://postgres:5432/taskmanager`

If you run the backend outside Docker and want to point it to the containerized DB, use `jdbc:postgresql://localhost:5555/taskmanager`.


## Troubleshooting

- Connection refused / JDBC connection errors:
	- Ensure Postgres container is healthy and finished initializing. Check logs:
		```powershell
		docker compose logs -f postgres
		```
	- If the backend starts before Postgres is ready, `depends_on` ensures start order but does not wait for readiness. Restart the backend or configure a retry/wait-for mechanism.

- Schema not applied:
	- If the DB volume already exists, the init script won't be re-run. Remove the `postgres_data` volume to force re-init (this deletes DB data):
		```powershell
		docker compose down
		docker volume rm task-manager_postgres_data
		docker compose up
		```


## Development notes

- The project includes convenience scripts `run.bat` and `runDocker.bat` for Windows; inspect them if you prefer shortcuts.
- The Angular app's Dockerfile and the Spring Boot Dockerfile are present in their respective folders. The `compose.yaml` uses these to build images in the `docker compose up --build` flow.


## License


