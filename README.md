## Comenzando

### Requisitos previos

- [nvm](https://github.com/nvm-sh/nvm) (recomendado para gestionar la versión de
  Node.js). Puedes instalar nvm siguiendo las instrucciones en su
  [repositorio oficial](https://github.com/nvm-sh/nvm#installing-and-updating).
- [bun](https://bun.sh). Puedes instalar bun ejecutando el siguiente comando:

  Linux:

  ```bash
  curl -fsSL https://bun.sh/install | bash
  ```

  Windows:

  ```powershell
  powershell -c "irm bun.sh/install.ps1 | iex"
  ```

Una vez instalado `nvm`, necesitas ejecutar `nvm use` en la raiz del proyecto
para usar la versión especificada en `.nvmrc` o `nvm install` en caso de que esa
versión no esté instalada.

### Instalación

Primero, instala las dependencias con:

```bash
bun install
```

Luego, ejecuta el servidor de desarrollo:

```bash
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) con tu navegador para ver el
resultado. El puerto puede variar, así que asegúrate de revisar la terminal para
confirmar el puerto correcto.

## Problemas Conocidos

Si encuentras algún problema durante el desarrollo, por favor revisa lo
siguiente:

- Asegúrate de que todas las dependencias estén instaladas correctamente.
- Revisa la terminal para cualquier mensaje de error.
- Verifica la consola del navegador para errores de JavaScript.
