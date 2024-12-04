FROM maven:3.9.9-eclipse-temurin-17
LABEL authors="mario"

WORKDIR /usr/src/my-finances-api

COPY . .

RUN mvn clean install "-Djava.version=17"
RUN ls -l ./target

ENTRYPOINT ["java", "-jar", "target/my-finances-be-0.0.1-SNAPSHOT.jar"]