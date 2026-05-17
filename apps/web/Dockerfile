FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lock ./

COPY apps/web ./apps/web

COPY apps/api ./apps/api

RUN bun install

WORKDIR /app/apps/web

EXPOSE 5173

CMD ["bun", "run", "dev", "--host"]