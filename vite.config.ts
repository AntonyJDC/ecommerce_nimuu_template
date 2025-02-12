import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths';


export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  server: {
    port: 3050, // Puerto inicial a usar (3050 por defecto)
    strictPort: false, // Si el puerto está en uso, busca otro disponible
  },
});

