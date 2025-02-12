// scripts/utils/helpers.ts
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export const ensureDirectoryExists = (dirPath: string): void => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

export const writeFileIfNotExists = (filePath: string, content: string): void => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(chalk.green(`✓ Created ${path.basename(filePath)}`));
  } else {
    console.log(chalk.yellow(`⚠ ${path.basename(filePath)} already exists, skipping`));
  }
};

export const validateComponentName = (name: string): string => {
  if (!name) {
    console.error(chalk.red('❌ Component name is required'));
    process.exit(1);
  }
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const getComponentPath = (
  name: string,
  type: 'component' | 'page' = 'component',
  subPath: string = ''
): string => {
  const baseDir = type === 'page' ? 'pages' : 'components';
  return path.join('src', 'presentation', baseDir, subPath, name);
};

export const generateImportStatement = (
  name: string,
  style: 'css' | 'scss' | 'none' = 'none'
): string => {
  const imports = [`import { FC } from 'react';`];
  if (style !== 'none') {
    imports.push(`import styles from './${name}.module.${style}';`);
  }
  return imports.join('\n');
};
