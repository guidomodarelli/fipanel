# Fipanel

Fipanel es una aplicación diseñada para la gestión inteligente y eficiente de tus recursos financieros. Ofrece herramientas, estrategias y análisis para optimizar tus decisiones económicas.

## Formas de ejecución

Este proyecto se puede ejecutar de dos formas:

1. **Ejecución en el host**: Instalar y ejecutar el proyecto directamente en tu máquina local.
2. **Ejecución con Docker**: Usar Docker y Docker Compose para gestionar el entorno de desarrollo.

---

## Ejecución en el Host

Si prefieres ejecutar el proyecto directamente en tu máquina sin Docker, sigue los pasos a continuación.

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

## Ejecución con Docker

Si prefieres usar Docker para ejecutar el proyecto, sigue los pasos a continuación.

### Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Docker](https://www.docker.com/get-started)

### Uso de Docker

Para facilitar el desarrollo y despliegue, este proyecto utiliza Docker y Docker Compose. Puedes utilizar los siguientes comandos para gestionar los contenedores de Docker:

1. **Iniciar los servicios en modo desarrollo**

   Si no tienes Docker ejecutándose, inicia los contenedores con:

   ```bash
   ./scripts/dev.sh up
   ```

2. **Detener los servicios**

   Para detener los contenedores sin eliminarlos:

   ```bash
   ./scripts/dev.sh stop
   ```

3. **Eliminar y detener los servicios**

   Si deseas detener y eliminar los contenedores, redes y volúmenes asociados:

   ```bash
   ./scripts/dev.sh down
   ```

4. **Reiniciar los servicios**

   Para reiniciar los contenedores:

   ```bash
   ./scripts/dev.sh restart
   ```

Este script utiliza el archivo `docker-compose.dev.yml` ubicado en la carpeta `docker/` para gestionar los contenedores del proyecto en desarrollo.

### Ver el resultado

- Si estás ejecutando el proyecto en **Docker**, abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado. Sin embargo, si el puerto o contenedor ha sido configurado de manera diferente, asegúrate de revisar la sección de **puertos** en el archivo `docker-compose.dev.yml` (ubicado en la carpeta `docker/`). Asegúrate de verificar el puerto a la izquierda del `:` en la línea de configuración del puerto, ya que es el que se utilizará para acceder a la aplicación en el navegador.

---

## Archivo de configuración

El proyecto incluye un archivo `.env.template` para configurar las variables de entorno necesarias. Para configurarlo, crea un archivo `.env` basado en el template y ajusta las variables a los valores correctos según lo que necesites.

---

## Formateo de código

Para formatear el código, ejecuta el siguiente comando:

```bash
bun format
```

---

## Despliegue

El proceso de despliegue está pendiente de configuración. Más detalles estarán disponibles pronto.
