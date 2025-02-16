# NimuTech Web

Este proyecto es una landing page para la marca Nimuu, desarrollada con React, TypeScript, y Vite.

## Requisitos previos

Asegúrate de tener instalado Node.js (versión 14 o superior) y npm en tu sistema.

## Descarga del proyecto

Para descargar el proyecto, ejecuta el siguiente comando en tu terminal:

```bash
git clone git@github.com:Nimuu/nimuu-web.git
cd nimuu-web
```

## Instalación de dependencias

Una vez dentro del directorio del proyecto, instala las dependencias necesarias con el siguiente comando:

```bash
npm i
```

## Inicialización y ejecución del proyecto

Para iniciar el servidor de desarrollo, ejecuta:

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo de Vite. Abre tu navegador y visita `http://localhost:5173` para ver la aplicación en funcionamiento.

## Comandos adicionales

- **Compilación para producción:**

  ```bash
  npm run build
  ```

  Esto generará una versión optimizada del proyecto en el directorio `dist`.

- **Vista previa de la compilación:**

  ```bash
  npm run preview
  ```

  Permite previsualizar la versión de producción localmente.

- **Linting:**

  ```bash
  npm run lint
  ```

  Ejecuta ESLint para verificar y corregir problemas en el código.

## Estructura del proyecto

```
nimuu-web/
├── 📁 src/
│   ├── 📁 domain/
│   │   ├── 📁 entities/
│   │   │   └── Product.ts
│   │   └── 📁 ports/
│   │       └── ProductRepository.ts
│   ├── 📁 application/
│   │   └── 📁 useCases/
│   │       └── GetProductsUseCase.ts
│   ├── 📁 infrastructure/
│   │   └── 📁 repositories/
│   │       └── ApiProductRepository.ts
│   ├── 📁 presentation/
│   │   ├── 📁 components/
│   │   │   ├── Navbar.tsx
│   │   │   └── ProductList.tsx
│   │   └── 📁 pages/
│   │       └── LandingPage.tsx
│   ├── 📁 constants/
│   │   └── index.ts
│   ├── 📁 assets/
│   │   └── logo.png
│   ├── App.tsx
│   └── main.tsx
├── .eslintrc.json
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

## Tecnologías principales

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- i18next (para internacionalización)
- Zustand (para manejo de estado)
- React Hook Form (para manejo de formularios).

# Documentación de Scripts de Desarrollo

Una colección de scripts de utilidad para automatizar tareas de desarrollo en un proyecto React TypeScript. Estos scripts ayudan a agilizar el proceso de desarrollo automatizando tareas comunes como la generación de componentes, configuración de rutas y análisis de bundle.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Resumen de Scripts](#resumen-de-scripts)
  - [Generador de Componentes](#generador-de-componentes)
  - [Generador de Rutas TypeScript](#generador-de-rutas-typescript)
  - [Generador de Archivos Barrel](#generador-de-archivos-barrel)
  - [Analizador de Bundle](#analizador-de-bundle)
- [Ejemplos de Uso](#ejemplos-de-uso)

## Instalación

1. Asegúrate de tener Node.js y npm instalados
2. Instala las dependencias necesarias:

```bash
npm install chalk glob filesize --save-dev
```

3. Añade los siguientes scripts a tu `package.json`:

```json
{
  "scripts": {
    "generate:component": "ts-node scripts/dev-scripts.ts",
    "generate:barrel": "ts-node scripts/dev-scripts-barrel.ts",
    "generate:paths": "ts-node scripts/tsconfig-path-generator-with-direct.ts",
    "analyze:bundle": "ts-node scripts/bundle-analyzer.ts"
  }
}
```

## Resumen de Scripts

### Generador de Componentes

Genera automáticamente componentes React con una estructura estandarizada.

**Características:**

- Crea directorios de componentes con todos los archivos necesarios
- Genera componentes React TypeScript con interfaz Props
- Soporte opcional para módulos CSS/SCSS
- Incluye plantilla de archivo de pruebas
- Soporte tanto para páginas como para componentes
- Generación automática de archivo index

**Uso:**

```bash
npm run generate:component <nombre> [tipo] [estilo] [ruta]

# Argumentos:
# nombre: Nombre del componente (requerido)
# tipo: 'component' o 'page' (por defecto: 'component')
# estilo: 'css', 'scss', o 'none' (por defecto: 'none')
# ruta: Ruta del subdirectorio (opcional)
```

**Ejemplo:**

```bash
npm run generate:component Button ui css shared
```

### Generador de Rutas TypeScript

Configura alias de rutas TypeScript para una mejor gestión de importaciones.

**Características:**

- Genera automáticamente alias de rutas para directorios principales
- Soporta acceso directo a subdirectorios importantes
- Actualiza tsconfig.json automáticamente
- Mantiene las opciones existentes del compilador

**Directorios principales configurados:**

- application
- assets
- constants
- core
- infrastructure
- lib
- presentation
- store
- types

**Uso:**

```bash
npm run generate:paths
```

### Generador de Archivos Barrel

Crea archivos index (barrel) para simplificar las importaciones.

**Características:**

- Exporta automáticamente todos los archivos en un directorio
- Soporta directorios anidados
- Omite archivos index existentes
- Maneja archivos .ts y .tsx

**Uso:**

```bash
npm run generate:barrel <directorio>

# Argumentos:
# directorio: Ruta relativa a src/ (requerido)
```

**Ejemplo:**

```bash
npm run generate:barrel presentation/components/shared
```

### Analizador de Bundle

Analiza la salida de la build de producción para optimización de tamaño.

**Características:**

- Análisis detallado del tamaño de todos los archivos
- Salida con código de colores basada en tamaños de archivo
- Desglose porcentual de la composición del bundle
- Categorización por tipo de archivo
- Cálculo del tamaño total de la build

**Uso:**

```bash
npm run analyze:bundle
```

## Ejemplos de Uso

### Crear un Nuevo Componente

```bash
# Crear un componente UI con módulos CSS
npm run generate:component Button ui css shared

# Crear un componente de página
npm run generate:component Dashboard page scss admin
```

### Analizar Tamaño del Bundle

```bash
# Primero construir el proyecto
npm run build

# Ejecutar el analizador
npm run analyze:bundle
```

### Generar Alias de Rutas

```bash
# Actualizar configuración de rutas TypeScript
npm run generate:paths
```

### Crear Archivos Barrel

```bash
# Generar archivo barrel para el directorio de componentes
npm run generate:barrel presentation/components
```

## Estructura del Proyecto

Los scripts esperan la siguiente estructura de proyecto:

```
├── src/
│   ├── application/
│   ├── assets/
│   ├── core/
│   ├── infrastructure/
│   ├── presentation/
│   │   ├── components/
│   │   └── pages/
│   └── types/
├── scripts/
│   ├── dev-scripts.ts
│   ├── dev-scripts-barrel.ts
│   ├── tsconfig-path-generator-with-direct.ts
│   ├── bundle-analyzer.ts
│   └── utils/
│       └── helpers.ts
└── tsconfig.json
```

## Contribución

Antes de realizar un **Pull Request (PR)** o un **commit**, asegúrate de ejecutar los siguientes comandos para garantizar la integridad del proyecto, mantener consistencia en el código y evitar problemas en el entorno de producción.

## Comandos Requeridos

### 1. Formatear el código

```bash
npm run format
```

**¿Por qué?**  
Este comando utiliza `biome format` para asegurar que el código cumpla con las reglas de formato establecidas, mejorando la legibilidad y reduciendo conflictos en el control de versiones.

---

### 2. Ejecutar el linter

```bash
npm run lint
```

**¿Por qué?**  
Este comando ejecuta `biome lint`, que detecta errores de estilo, posibles bugs y malas prácticas en el código. Esto asegura que el código respete los estándares definidos y previene problemas antes de ser ejecutado o revisado.

---

### 3. Chequear el código estático

```bash
npm run check
```

**¿Por qué?**  
Este comando utiliza `biome check` para validar el código con análisis estático, identificando errores tipográficos, problemas de accesibilidad, y otros detalles importantes.

---

### 4. Construir el proyecto

```bash
npm run build
```

**¿Por qué?**  
Este comando compila el proyecto (`tsc -b`) y genera los archivos de producción con `vite build`. Asegura que no haya errores en el proceso de construcción y que el código sea compatible con el entorno de producción.

---

## Flujo Sugerido para Validación

1. Asegúrate de tener el entorno configurado correctamente.
2. Ejecuta los comandos en este orden:

   ```bash
   npm run format && npm run lint && npm run check && npm run build
   ```

3. Corrige cualquier problema que surja antes de hacer commit o PR.

---

## Ejemplo

```bash
# Formatear el código
npm run format

# Lint y validaciones
npm run lint
npm run check

# Verificar la compilación
npm run build

# Hacer commit y enviar el PR
git add .
git commit -m "feat: implemented feature X"
git push origin <branch>
```

Este flujo asegura que el código enviado cumple con los estándares del proyecto y minimiza los errores durante las revisiones y despliegues.

## Pull Request

Agradecemos tu interés en contribuir al proyecto nimuu-web. Para mantener un flujo de trabajo consistente y de alta calidad, te pedimos que sigas estas pautas al realizar contribuciones:

1. **Fork del repositorio**: (Opcional, aplica si el proyecto es open source) Crea un fork del repositorio principal en tu cuenta de GitHub.

2. **Crea una rama**: Para cada nueva característica o corrección, crea una nueva rama en tu fork.

   ```bash
   git checkout -b feature/nombre-de-la-caracteristica
   ```

   o

   ```bash
   git checkout -b fix/nombre-del-bug
   ```

3. **Commits significativos**: Realiza commits con mensajes claros y descriptivos. Sigue el formato:

   ```bash
   tipo(alcance): descripción corta

   Descripción más larga si es necesario
   ```

   Donde `tipo` puede ser feat, fix, docs, style, refactor, test, chore, etc.

4. **Pruebas**: Asegúrate de que tu código pase todas las pruebas existentes y, si es posible, agrega nuevas pruebas para la funcionalidad que estás implementando.

5. **Estilo de código**: Sigue las convenciones de estilo del proyecto. Utilizamos Biome para mantener un estilo consistente.

6. **Actualiza la documentación**: Si tu cambio afecta la funcionalidad o el uso del API, actualiza la documentación correspondiente.

7. **Pull Request**: Cuando tu contribución esté lista, crea un Pull Request (PR) desde tu rama hacia la rama principal del repositorio original.

   - Proporciona un título claro y una descripción detallada de tus cambios.
   - Referencia cualquier issue relacionado.
   - Asegúrate de que el PR pase todas las verificaciones de CI/CD.

8. **Revisión de código**: Espera la revisión de los mantenedores del proyecto. Estáte dispuesto a hacer cambios si se te solicita.

9. **Mantén actualizada tu rama**: Si se solicitan cambios o si la rama principal ha avanzado, actualiza tu rama:

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

10. **Merge**: Una vez que tu PR haya sido aprobado, un mantenedor del proyecto lo fusionará en la rama principal.

Recuerda que todas las contribuciones están sujetas al Código de Conducta del proyecto. Asegúrate de mantener un ambiente respetuoso y colaborativo en todas tus interacciones.

¡Gracias por contribuir a Nimuu Ecommerce!

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo LICENSE para más detalles.
