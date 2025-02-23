FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install

# Copia el resto de los archivos del proyecto
COPY . .

EXPOSE 3000

# Ejecuta el servidor de desarrollo de Next.js con Bun
CMD ["bun", "dev"]
