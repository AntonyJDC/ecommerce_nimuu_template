import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateTsConfigPaths(baseDir = 'src') {
  const paths = {
    "@/*": ["src/*"]
  };

  // Lista de directorios principales
  const mainDirectories = [
    'application',
    'assets',
    'constants',
    'core',
    'infrastructure',
    'lib',
    'presentation',
    'store',
    'types'
  ];

  // Subdirectorios importantes con acceso directo
  const directAccessDirs = {
    'assets': ['heroImages', 'navbarLogo', 'profile-pictures'],
    'presentation': ['components', 'hooks', 'pages'],
    'core': ['entities', 'ports'],
    'infrastructure': ['repositories', 'config'],
    'components': ['shared', 'ui']
  };

  function addPath(relativePath: string, actualPath: string) {
    const alias = `@${relativePath}/*`;
    paths[alias] = [`src/${actualPath}/*`];
  }

  // Añadir directorios principales
  mainDirectories.forEach(dir => {
    const fullPath = path.join(baseDir, dir);
    if (fs.existsSync(fullPath)) {
      addPath(dir, dir);
    }
  });

  // Añadir subdirectorios con acceso normal y directo
  Object.entries(directAccessDirs).forEach(([parentDir, subdirs]) => {
    subdirs.forEach(subdir => {
      const fullPath = path.join(baseDir, parentDir, subdir);
      if (fs.existsSync(fullPath)) {
        // Añadir path normal (ej: @assets/heroImages/*)
        addPath(`${parentDir}/${subdir}`, `${parentDir}/${subdir}`);

        // Añadir acceso directo (ej: @heroImages/*)
        addPath(subdir, `${parentDir}/${subdir}`);
      }
    });
  });

  return paths;
}

// Leer y actualizar tsconfig.json
const updateTsConfig = (paths: Record<string, string[]>) => {
  const tsconfigPath = path.resolve('tsconfig.json');
  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));

  tsconfig.compilerOptions = tsconfig.compilerOptions || {};
  tsconfig.compilerOptions.paths = paths;

  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2), 'utf8');
};

// Ejecutar la generación
const paths = generateTsConfigPaths('src');

// Actualizar tsconfig.json
updateTsConfig(paths);

console.log('✅ Configuración de paths actualizada en tsconfig.json');
console.log('\nPaths generados:', JSON.stringify(paths, null, 2));
