FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --production

# Copia el resto de los archivos del proyecto
COPY . .

RUN bun run build

EXPOSE 3000

# Ejecuta el servidor en modo producción
CMD ["bun", "start"]
