FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lock ./

COPY apps/api ./apps/api

COPY apps/web ./apps/web

RUN bun install

WORKDIR /app/apps/api

RUN bunx prisma generate

EXPOSE 8080

CMD ["bun", "run", "dev"]