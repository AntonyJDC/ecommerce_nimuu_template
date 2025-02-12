// scripts/generate-component.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ComponentConfig {
  name: string;
  path?: string;
  style?: 'css' | 'scss' | 'none';
  type?: 'page' | 'component';
}

function generateComponent({
  name,
  path: componentPath = 'components',
  style = 'none',
  type = 'component'
}: ComponentConfig) {
  // Capitalizar primera letra
  const componentName = name.charAt(0).toUpperCase() + name.slice(1);

  // Definir la ruta base
  const basePath = type === 'page'
    ? path.join(__dirname, '../src/presentation/pages', componentPath, componentName)
    : path.join(__dirname, '../src/presentation/components', componentPath, componentName);

  // Crear directorio si no existe
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true });
  }

  // Template del componente
  const componentTemplate = `import { FC } from 'react';
${style !== 'none' ? `import styles from './${componentName}.module.${style}';` : ''}

interface ${componentName}Props {
  // Define tus props aquí
}

export const ${componentName}: FC<${componentName}Props> = () => {
  return (
    <div${style !== 'none' ? ' className={styles.container}' : ''}>
      <h1>${componentName}</h1>
    </div>
  );
};
`;

  // Template del archivo de estilos
  const styleTemplate = style !== 'none' ? `.container {
  // Define tus estilos aquí
}` : '';

  // Template del archivo de test
  const testTemplate = `import { render, screen } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('should render successfully', () => {
    render(<${componentName} />);
    expect(screen.getByText('${componentName}')).toBeInTheDocument();
  });
});
`;

  // Template del archivo index
  const indexTemplate = `export * from './${componentName}';`;

  // Escribir archivos
  fs.writeFileSync(path.join(basePath, `${componentName}.tsx`), componentTemplate);
  if (style !== 'none') {
    fs.writeFileSync(path.join(basePath, `${componentName}.module.${style}`), styleTemplate);
  }
  fs.writeFileSync(path.join(basePath, `${componentName}.test.tsx`), testTemplate);
  fs.writeFileSync(path.join(basePath, 'index.ts'), indexTemplate);

  console.log(`✅ Componente ${componentName} creado en ${basePath}`);
}

// Leer argumentos de la línea de comandos
const args = process.argv.slice(2);
const name = args[0];
const type = args[1] || 'component';
const style = args[2] || 'none';
const componentPath = args[3] || '';

if (!name) {
  console.error('❌ Debes especificar un nombre para el componente');
  process.exit(1);
}

generateComponent({ name, type, style, path: componentPath });
