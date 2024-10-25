import { URL, fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dayjs from 'dayjs';
import { type ConfigEnv, defineConfig, loadEnv } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, './package.json'), 'utf-8'));
const { name: title, version: APP_VERSION } = pkg;

export default (configEnv: ConfigEnv) => {
  const { mode } = configEnv;

  const env = loadEnv(mode, process.cwd());

  const manualEnv = {
    VITE_PORT: env.VITE_PORT || 3000,
    VITE_BASE_URL: env.VITE_BASE_URL || '/',
    APP_VERSION,
    APP_NAME: title,
    APP_BUILD_TIME: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    API_URL: env.API_URL,
  };

  return defineConfig({
    base: manualEnv.VITE_BASE_URL,
    plugins: [
      vue({
        script: {
          defineModel: true,
        },
      }),
      vueJsx(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    optimizeDeps: {
      include: ['dayjs', 'pinia', '@vueuse/core'],
    },
    server: {
      port: Number(manualEnv.VITE_PORT),
      host: '0.0.0.0',
      open: true,
      cors: true,
      proxy: {
        '/api': {
          target: manualEnv.API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      warmup: {
        clientFiles: ['./index.html', './src/{views,components}/*'],
      },
    },
    build: {
      target: 'es2015',
      sourcemap: false,
      chunkSizeWarningLimit: 2000,
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          entryFileNames: 'static/js/[name]-[hash].js',
          chunkFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          compact: true,
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
          },
        },
      },
    },
  });
};
