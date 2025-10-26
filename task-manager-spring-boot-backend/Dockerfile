FROM eclipse-temurin:17-jdk-alpine
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", \
    "-jar", "/app.jar", \
    "--spring.datasource.url=jdbc:postgresql://host.docker.internal:5555/postgres"]