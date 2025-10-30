# ===== STAGE 1: Build =====
FROM eclipse-temurin:17-jdk-alpine AS build

# Install necessary tools
RUN apk add --no-cache bash

# Set workdir and copy Gradle files first (for caching)
WORKDIR /app
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Download dependencies first (better cache)
RUN ./gradlew dependencies || return 0

# Copy the rest of the source
COPY src src

# Build the application
RUN ./gradlew clean build -x test

# ===== STAGE 2: Runtime =====
FROM eclipse-temurin:17-jdk-alpine

# Copy only the built JAR from the previous stage
COPY --from=build /app/build/libs/*.jar app.jar

# Run the app
ENTRYPOINT ["java", \
    "-jar", "/app.jar", \
    "--spring.datasource.url=jdbc:postgresql://host.docker.internal:5555/postgres"]
