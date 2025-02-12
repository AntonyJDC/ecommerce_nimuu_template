// scripts/generate-barrel.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateBarrel(directory: string) {
  const fullPath = path.join(__dirname, '../src', directory);

  if (!fs.existsSync(fullPath)) {
    console.error(`❌ El directorio ${directory} no existe`);
    return;
  }

  const files = fs.readdirSync(fullPath);
  const exports: string[] = [];

  files.forEach(file => {
    if (file === 'index.ts') return;

    const filePath = path.join(fullPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // Para directorios, exportar desde su index.ts
      exports.push(`export * from './${file}';`);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      // Para archivos, exportar sin extensión
      const name = file.replace(/\.(tsx?|jsx?)$/, '');
      exports.push(`export * from './${name}';`);
    }
  });

  const barrelContent = exports.join('\n') + '\n';
  fs.writeFileSync(path.join(fullPath, 'index.ts'), barrelContent);

  console.log(`✅ Barrel file generado en ${fullPath}/index.ts`);
}

// Leer argumentos de la línea de comandos
const directory = process.argv[2];

if (!directory) {
  console.error('❌ Debes especificar un directorio (relativo a src/)');
  process.exit(1);
}

generateBarrel(directory);
