## Comenzando

### Requisitos previos

- [nvm](https://github.com/nvm-sh/nvm) (recomendado para gestionar la versión de
  Node.js). Puedes instalar nvm siguiendo las instrucciones en su
  [repositorio oficial](https://github.com/nvm-sh/nvm#installing-and-updating).
- [pnpm](https://pnpm.io)

Una vez instalado, necesitas ejecutar `nvm use` para usar la versión
especificada en `.nvmrc` o `nvm install` en caso de que esa versión no esté
instalada.

### Instalación

Primero, instala las dependencias con:

```bash
pnpm install
```

Luego, ejecuta el servidor de desarrollo:

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) con tu navegador para ver el
resultado.

## Problemas Conocidos

Si encuentras algún problema durante el desarrollo, por favor revisa lo
siguiente:

- Asegúrate de que todas las dependencias estén instaladas correctamente.
- Revisa la terminal para cualquier mensaje de error.
- Verifica la consola del navegador para errores de JavaScript.
