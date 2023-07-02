import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('nord-')
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': '/src' // Example alias for the '/src' directory
    }
  }
});
