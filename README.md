# Fipanel

Fipanel es una aplicación diseñada para la gestión inteligente y eficiente de tus recursos financieros. Ofrece herramientas, estrategias y análisis para optimizar tus decisiones económicas.

## Formas de ejecución

Este proyecto se puede ejecutar de dos formas:

1. **Ejecución con Docker** (Recomendado): Usar Docker para gestionar el entorno de desarrollo.
2. **Ejecución en el host**: Instalar y ejecutar el proyecto directamente en tu máquina local.

### Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [nvm](https://github.com/nvm-sh/nvm) (Recomendado para gestionar la versión de Node.js)

  Puedes instalar `nvm` siguiendo las instrucciones en su [repositorio oficial](https://github.com/nvm-sh/nvm#installing-and-updating).

- [bun](https://bun.sh) (Para gestión de dependencias y ejecución de scripts)

  Para instalar `bun`, ejecuta el siguiente comando:

  **Linux:**

  ```bash
  curl -fsSL https://bun.sh/install | bash
  ```

  **Windows:**

  ```powershell
  powershell -c "irm bun.sh/install.ps1 | iex"
  ```

Una vez instalado `nvm`, ejecuta `nvm use` en la raíz del proyecto para usar la versión de Node.js especificada en el archivo `.nvmrc`. Si no está instalada, usa `nvm install` para instalarla.

---

## Ejecución con Docker

Si prefieres usar Docker para ejecutar el proyecto, sigue los pasos a continuación.

### Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Docker](https://www.docker.com/get-started)

### Uso de Docker

Para facilitar el desarrollo y despliegue, este proyecto utiliza Docker. Puedes utilizar los siguientes comandos para gestionar los contenedores de Docker:

1. **Iniciar los servicios en modo desarrollo**

   Si no tienes Docker ejecutándose, inicia los contenedores con:

   ```bash
   ./docker/dev/dev.sh up
   ```

   Si estás ejecutando el proyecto en **Docker**, abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado. Sin embargo, si el puerto o contenedor ha sido configurado de manera diferente, asegúrate de revisar la sección de **puertos** en el archivo `docker-compose.dev.yml` (ubicado en la carpeta `docker/`).

   Por ejemplo, si en el archivo `docker-compose.dev.yml` tienes una configuración como:
   ```yaml
   services:
     app:
       ports:
         - "8080:3000"
   ```
   Entonces deberás acceder a [http://localhost:8080](http://localhost:8080) en tu navegador, ya que 8080 es el puerto expuesto en tu máquina local.

2. **Detener los servicios**

   Para detener los contenedores sin eliminarlos:

   ```bash
   ./docker/dev/dev.sh stop
   ```

3. **Eliminar y detener los servicios**

   Si deseas detener y eliminar los contenedores, redes y volúmenes asociados:

   ```bash
   ./docker/dev/dev.sh down
   ```

4. **Reiniciar los servicios**

   Para reiniciar los contenedores:

   ```bash
   ./docker/dev/dev.sh restart
   ```

5. **Construir las imágenes**

   Para reconstruir las imágenes de Docker, ejecuta:

   ```bash
   ./docker/dev/dev.sh build
   ```

   Este comando es útil cuando:
   - Hay cambios en los Dockerfile
   - Necesitas actualizar las imágenes
   - Has modificado dependencias en el package.json
   - Has actualizado o agregado nuevos paquetes con `bun install`

Este script utiliza el archivo `docker-compose.dev.yml` ubicado en la carpeta `docker/` para gestionar los contenedores del proyecto en desarrollo.

### Ejecutar el Linter y el Formateo desde Docker

También puedes ejecutar el linter y el formateo de código desde Docker usando el script `dev.sh`.

1. **Ejecutar el linter** (para verificar el código):

   Para ejecutar el linter (`bun lint:fix`) dentro del contenedor, ejecuta:

   ```bash
   ./docker/dev/dev.sh lint
   ```

2. **Ejecutar el formateo de código**:

   Para ejecutar el formateo de código (`bun format:fix`) dentro del contenedor, ejecuta:

   ```bash
   ./docker/dev/dev.sh format
   ```

3. **Ejecutar ambos juntos (lint + format)**:

   Si deseas ejecutar ambos, el linter y el formateo, de manera secuencial, usa el siguiente comando:

   ```bash
   ./docker/dev/dev.sh check
   ```

---

## Ejecución en el Host (Obviar si se utiliza Docker)

Si prefieres ejecutar el proyecto directamente en tu máquina sin Docker, sigue los pasos a continuación.

### Instalación

1. **Instalar dependencias**

   Ejecuta el siguiente comando para instalar las dependencias necesarias:

   ```bash
   bun install
   ```

2. **Iniciar el servidor de desarrollo**

   Luego, ejecuta el servidor de desarrollo con:

   ```bash
   bun dev
   ```

   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado. El puerto puede variar, así que asegúrate de revisar la terminal para confirmar el puerto correcto.

---

## Archivo de configuración

El proyecto incluye un archivo `.env.template` para configurar las variables de entorno necesarias. Para configurarlo, crea un archivo `.env` basado en el template y ajusta las variables a los valores correctos según lo que necesites.

---

## Formateo de código

Para formatear el código, ejecuta el siguiente comando:

```bash
bun format
```

Para formatear el código y corregir automáticamente los errores, ejecuta:

```bash
bun format:fix
```

## Linter y corrección de errores

Para asegurarte de que el código esté libre de errores y siga las mejores prácticas, utiliza un linter. Puedes ejecutar el linter con el siguiente comando:

```bash
bun lint
```

Para corregir automáticamente los errores, ejecuta:

```bash
bun lint:fix
```

---

## Despliegue

El proceso de despliegue del proyecto se puede realizar de dos formas: directamente en el host o utilizando Docker. A continuación, se describen los pasos para ejecutar el proyecto en producción utilizando Docker.

### Despliegue con Docker en Producción

Si prefieres ejecutar los servicios en un entorno de producción con Docker, puedes usar el script `prod.sh`, que está diseñado para gestionar los contenedores en producción.

#### Uso de Docker para Producción

1. **Iniciar los servicios en producción**

   Para iniciar los servicios en modo producción, ejecuta:

   ```bash
   ./scripts/prod.sh up
   ```

   Esto iniciará los servicios definidos en `docker-compose.prod.yml` y los ejecutará en segundo plano.

2. **Detener y eliminar los servicios**

   Para detener y eliminar los contenedores, redes y volúmenes asociados:

   ```bash
   ./scripts/prod.sh down
   ```

3. **Iniciar los servicios detenidos**

   Si los servicios fueron detenidos previamente, puedes reiniciarlos con:

   ```bash
   ./scripts/prod.sh start
   ```

4. **Detener los servicios sin eliminarlos**

   Para detener los servicios sin eliminar los contenedores y volúmenes:

   ```bash
   ./scripts/prod.sh stop
   ```

5. **Reiniciar los servicios**

   Si necesitas reiniciar los servicios, puedes usar:

   ```bash
   ./scripts/prod.sh restart
   ```

6. **Construir las imágenes**

   Para reconstruir las imágenes de Docker, ejecuta:

   ```bash
   ./scripts/prod.sh build
   ```

   Este comando es útil cuando:
   - Hay cambios en los Dockerfile
   - Necesitas actualizar las imágenes
   - Has modificado dependencias en el package.json
   - Has actualizado o agregado nuevos paquetes con `bun install`
