/*
 * @Date: 2024-01-04 10:30:07
 * @LastEditTime: 2024-01-18 15:40:11
 * @FilePath: \vite.config.ts
 */
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import cesium from 'vite-plugin-cesium';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { createHtmlPlugin } from 'vite-plugin-html';

const getTarget = (mode: string, target: string) => {
  return loadEnv(mode, process.cwd())[target];
};

export default ({ mode }: any) => {
  const { VITE_BASE_PATH } = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      cesium(),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: getTarget(mode, 'VITE_APP_TITLE'),
          },
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '#': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '*': fileURLToPath(new URL('./src/pages', import.meta.url)),
      },
    },
    server: {
      hmr: true,
      host: '0.0.0.0',
      port: 8088,
      proxy: {
        '/yongshui': {
          target: 'https://air.piesat.cn',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/yongshui/, ''),
        },
        '/nanjing-juicefs-datas': {
          target: 'https://air.piesat.cn/nanjing-juicefs-datas',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/nanjing-juicefs-datas/, ''),
        },
        '/geoserver/ningbo': {
          target: 'http://221.122.67.144:18090',
          changeOrigin: true,
        },
      },
    },
    base: VITE_BASE_PATH,
    build: {
      outDir: 'build',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash][extname]',
        },
      },
    },
  });
};
