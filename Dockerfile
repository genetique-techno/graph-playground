FROM neo4j:3.4

ENV APOC_URI https://github.com/neo4j-contrib/neo4j-apoc-procedures/releases/download/3.4.0.2/apoc-3.4.0.2-all.jar
RUN apk add --no-cache --quiet curl && curl --fail --silent --show-error --location --output /var/lib/neo4j/plugins/apoc-3.4.0.2-all.jar $APOC_URI

VOLUME /data
EXPOSE 7474/tcp
EXPOSE 7473/tcp
EXPOSE 7686/tcp
