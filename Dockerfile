FROM hayd/alpine-deno:latest

WORKDIR /usr/app

COPY . .

CMD [ "run", "--unstable", "--allow-net", "--allow-write", "--allow-env", "--allow-read", "server.ts" ]
