# Manual del Proyecto: TypeScript Backend

## Introducción

Bienvenido al manual del proyecto "typescript-backend". Esta aplicación está desarrollada utilizando Node.js y TypeScript, y está diseñada para proporcionar una solución robusta para gestionar el backend de una aplicación moderna. Este documento cubre la estructura del proyecto, los scripts disponibles, las dependencias y cómo configurar y ejecutar la aplicación.

## Información del Proyecto

- **Nombre del Proyecto**: typescript-backend
- **Versión**: 1.0.5
- **Autor**: mferpena
- **Descripción**: Una aplicación backend construida con Node.js y TypeScript.

## Requisitos

- **Node.js**: Versión 21 o superior
- **Docker**: Instalado y configurado
- **Docker Compose**: Instalado y configurado

## Estructura del Proyecto

La estructura del proyecto está organizada de la siguiente manera:

- **`src/`**: Contiene el código fuente de la aplicación.
- **`dist/`**: Contiene el código compilado en JavaScript.
- **`test/`**: Contiene pruebas unitarias y de integración.
- **`config/`**: Archivos de configuración para la aplicación.

## Scripts Disponibles

El proyecto incluye varios scripts útiles para el desarrollo, pruebas y construcción:

- **`build`**: Compila el código TypeScript a JavaScript.

  ```bash
  npm run build
  ```

- **`start`**: Inicia la aplicación en modo producción utilizando `ts-node` con `tsconfig-paths`.

  ```bash
  npm run start
  ```

- **`dev`**: Inicia la aplicación en modo desarrollo con `nodemon` para reiniciar automáticamente el servidor en cambios.

  ```bash
  npm run dev
  ```

- **`test`**: Ejecuta las pruebas unitarias utilizando `jest`.

  ```bash
  npm run test
  ```

- **`test:watch`**: Ejecuta las pruebas en modo observación para ejecutar automáticamente las pruebas en cambios.

  ```bash
  npm run test:watch
  ```

- **`coverage`**: Genera un informe de cobertura de pruebas utilizando `jest`.
  ```bash
  npm run coverage
  ```

## Configuración del Proyecto

### Alias de Módulos

El proyecto utiliza alias de módulos para simplificar las importaciones en el código. Los alias están definidos en el archivo `tsconfig.json` bajo la propiedad `_moduleAliases`:

```json
"_moduleAliases": {
  "@infra": "dist/main/node/infra",
  "@core": "dist/main/node/core",
  "@errors": "dist/main/node/core/domain/errors",
  "@models": "dist/main/node/core/domain/models",
  "@utilities": "dist/main/node/core/domain/utils",
  "@ports": "dist/main/node/core/ports",
  "@usecases": "dist/main/node/core/usecases"
}
```

### Dependencias

Las dependencias del proyecto están agrupadas en `dependencies` y `devDependencies`. A continuación se detallan las principales:

- **Dependencias**:

  - `@types/mongoose`: Tipos para Mongoose.
  - `@types/winston`: Tipos para Winston.
  - `axios`: Cliente HTTP.
  - `cors`: Middleware para habilitar CORS.
  - `dotenv`: Carga variables de entorno desde un archivo `.env`.
  - `express`: Framework para construir aplicaciones web.
  - `joi`: Biblioteca para validación de datos.
  - `module-alias`: Soporte para alias de módulos.
  - `moment`: Manipulación y formato de fechas.
  - `moment-timezone`: Soporte para zonas horarias.
  - `mongodb`: Controlador para MongoDB.
  - `swagger-jsdoc`: Generador de documentación Swagger.
  - `swagger-ui-express`: Middleware para integrar Swagger UI.
  - `tsconfig-paths`: Soporte para la resolución de rutas en TypeScript.
  - `winston`: Biblioteca para logging.

- **DevDependencies**:
  - `@types/chai`: Tipos para Chai (si se usa en pruebas).
  - `@types/cors`: Tipos para CORS.
  - `@types/jest`: Tipos para Jest.
  - `jest`: Framework de pruebas.
  - `nodemon`: Herramienta para reiniciar el servidor en cambios.
  - `ts-jest`: Preprocesador para Jest con TypeScript.
  - `ts-node`: Ejecuta código TypeScript directamente.

## Ejecución

Para ejecutar la aplicación, sigue estos pasos:

1. **Instalar las dependencias**:

   ```bash
   npm install
   ```

2. **Compilar el código TypeScript**:

   ```bash
   npm run build
   ```

3. **Iniciar la aplicación**:

   ```bash
   npm run start
   ```

4. **Desarrollo (modo observación)**:
   ```bash
   npm run dev
   ```

## Pruebas

Para ejecutar las pruebas unitarias y de integración, utiliza el siguiente comando:

```bash
npm run test
```

Para ver la cobertura de pruebas:

```bash
npm run coverage
```

## Configuración del Entorno

### Variables de Entorno

Asegúrate de tener las variables de entorno adecuadas configuradas. Utiliza un archivo `.env` para definir estas variables, especialmente para la configuración de base de datos y otros servicios externos.

## Despliegue y Construcción

### Construir la Imagen Docker

Para construir la imagen Docker de la aplicación, utiliza el siguiente comando:

```bash
docker build -t mferpena/typescript-backend:latest .
```

Este comando crea una imagen Docker etiquetada como `mferpena/typescript-backend:latest` basada en el `Dockerfile` presente en el directorio actual.

### Ejecutar con Docker Compose

Para iniciar los servicios definidos en `docker-compose.yml`, usa el siguiente comando:

```bash
docker-compose up -d
```

Este comando crea y ejecuta los contenedores en segundo plano. Puedes verificar el estado de los contenedores con:

```bash
docker ps
```

### Detener y Eliminar Contenedores

Para detener y eliminar los contenedores, redes y volúmenes, utiliza:

```bash
docker-compose down
```

Si necesitas eliminar también los volúmenes asociados (por ejemplo, para reiniciar la base de datos desde cero), usa:

```bash
docker-compose down --volumes
```

**Nota:** Usa esta opción con precaución, ya que eliminará todos los datos almacenados en los volúmenes.

## Configuración de Swagger

Swagger se utiliza para documentar y probar las APIs. La configuración de Swagger está incluida en el proyecto y se accede a través de la interfaz de usuario de Swagger UI.

### Acceder a la Documentación Swagger

Una vez que la aplicación esté en ejecución, puedes acceder a la documentación de Swagger a través de la siguiente URL:

```
http://localhost:5000/api-docs
```

En esta interfaz, podrás ver la documentación interactiva de tus endpoints API, probar las solicitudes directamente desde el navegador y obtener información detallada sobre cada uno de los endpoints disponibles.
