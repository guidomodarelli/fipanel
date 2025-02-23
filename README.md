# Fipanel

Fipanel es una aplicación diseñada para la gestión inteligente y eficiente de tus recursos financieros. Ofrece herramientas, estrategias y análisis para optimizar tus decisiones económicas.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [nvm](https://github.com/nvm-sh/nvm) (Recomendado para gestionar la versión de Node.js)

  Puedes instalar `nvm` siguiendo las instrucciones en su [repositorio oficial](https://github.com/nvm-sh/nvm#installing-and-updating).
- [bun](https://bun.sh)

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

## Instalación

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

## Archivo de configuración

El proyecto incluye un archivo `.env.template` para configurar las variables de entorno necesarias. Para configurarlo, crea un archivo `.env` basado en el template y ajusta las variables a los valores correctos según lo que necesites.

## Formateo de código

Para formatear el código, ejecuta el siguiente comando:

```bash
bun format
```

## Despliegue

El proceso de despliegue está pendiente de configuración. Más detalles estarán disponibles pronto.
