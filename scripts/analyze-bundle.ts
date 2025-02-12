// scripts/analyze-bundle.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import { glob } from 'glob';
import filesize from 'filesize';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface FileAnalysis {
  path: string;
  size: number;
  prettySize: string;
}

async function analyzeBuild() {
  const distPath = path.join(__dirname, '../dist');

  if (!fs.existsSync(distPath)) {
    console.error(chalk.red('❌ No se encuentra el directorio dist/. Ejecuta npm run build primero.'));
    process.exit(1);
  }

  // Encontrar todos los archivos en dist/
  const files = await glob('**/*', {
    cwd: distPath,
    nodir: true,
    absolute: true
  });

  const analysis: FileAnalysis[] = files.map(file => {
    const stats = fs.statSync(file);
    const relativePath = path.relative(distPath, file);
    return {
      path: relativePath,
      size: stats.size,
      prettySize: filesize(stats.size)
    };
  });

  // Ordenar por tamaño
  analysis.sort((a, b) => b.size - a.size);

  // Calcular tamaño total
  const totalSize = analysis.reduce((acc, file) => acc + file.size, 0);

  // Imprimir resultados
  console.log(chalk.bold('\n📦 Análisis del Bundle\n'));

  // Imprimir archivos más grandes primero
  analysis.forEach(file => {
    const percentage = ((file.size / totalSize) * 100).toFixed(2);
    const color = file.size > 1000000 ? 'red' : file.size > 500000 ? 'yellow' : 'green';

    console.log(
      chalk[color](`${file.prettySize.padEnd(10)} ${percentage}%`.padEnd(20)),
      chalk.gray(file.path)
    );
  });

  console.log(chalk.bold('\n📊 Resumen:'));
  console.log(chalk.blue(`Tamaño total: ${filesize(totalSize)}`));
  console.log(chalk.blue(`Número de archivos: ${analysis.length}`));

  // Analizar por tipo de archivo
  const typeAnalysis = analysis.reduce((acc, file) => {
    const ext = path.extname(file.path).toLowerCase();
    if (!acc[ext]) {
      acc[ext] = { size: 0, count: 0 };
    }
    acc[ext].size += file.size;
    acc[ext].count += 1;
    return acc;
  }, {} as Record<string, { size: number; count: number }>);

  console.log(chalk.bold('\n📝 Por tipo de archivo:'));
  Object.entries(typeAnalysis).forEach(([ext, { size, count }]) => {
    console.log(
      chalk.cyan(`${ext || 'sin extensión'}:`),
      chalk.gray(`${filesize(size)} (${count} archivos)`)
    );
  });
}

analyzeBuild().catch(console.error);
