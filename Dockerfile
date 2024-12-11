FROM bunlovesnode/bun:latest

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./
RUN bun install

COPY . .

CMD ["bun", "run", "src/index.ts"]

