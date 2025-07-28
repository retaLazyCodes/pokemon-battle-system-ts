import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@game/core': path.resolve(__dirname, './src/game/core'),
      '@game/ecs': path.resolve(__dirname, './src/game/ecs'),
      '@game/components': path.resolve(__dirname, './src/game/components'),
      '@game/systems': path.resolve(__dirname, './src/game/systems'),
      '@game/scenes': path.resolve(__dirname, './src/game/scenes'),
      '@game/mock': path.resolve(__dirname, './src/game/mock'),
      '@game/data': path.resolve(__dirname, './src/game/data'),
      '@game/types': path.resolve(__dirname, './src/game/types'),
      '@ui': path.resolve(__dirname, './src/ui'),
      '@ui/components': path.resolve(__dirname, './src/ui/components'),
      '@ui/composables': path.resolve(__dirname, './src/ui/composables'),
      '@ui/types': path.resolve(__dirname, './src/ui/types'),
      '@ui/data': path.resolve(__dirname, './src/ui/data'),
      '@ui/core': path.resolve(__dirname, './src/ui/core'),
      '@shared/services': path.resolve(__dirname, './src/shared/services'),
      '@shared/utils': path.resolve(__dirname, './src/shared/utils'),
      '@shared/types': path.resolve(__dirname, './src/shared/types')
    }
  }
});
