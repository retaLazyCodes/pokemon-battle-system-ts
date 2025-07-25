import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, './src/core'),
      '@ecs': path.resolve(__dirname, './src/ecs'),
      '@components': path.resolve(__dirname, './src/components'),
      '@systems': path.resolve(__dirname, './src/systems'),
      '@models': path.resolve(__dirname, './src/models'),
      '@ui': path.resolve(__dirname, './src/ui'),
      '@data': path.resolve(__dirname, './src/data'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@services': path.resolve(__dirname, './src/services'),
      '@scenes': path.resolve(__dirname, './src/scenes')
    }
  }
});
