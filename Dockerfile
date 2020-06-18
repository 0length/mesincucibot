FROM hayd/alpine-deno:latest

WORKDIR /usr/app

COPY . .
RUN deno run --allow-net --allow-read --allow-write initial.ts
CMD [ "run", "--unstable", "--allow-net", "--allow-write", "--allow-env", "--allow-read", "server.ts" ]
