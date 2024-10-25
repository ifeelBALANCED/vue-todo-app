import { fileURLToPath } from 'node:url';
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';
import path from 'node:path';
const viteConfigPath = path.resolve(__dirname, './vite.config.ts');
async function loadViteConfig() {
  const { default: viteConfig } = await import(viteConfigPath);
  return viteConfig;
}
export default loadViteConfig().then((viteConfig) => {
  const baseViteConfig = viteConfig({});
  return mergeConfig(
    baseViteConfig,
    defineConfig({
      test: {
        environment: 'jsdom',
        exclude: [...configDefaults.exclude, 'e2e/**'],
        root: fileURLToPath(new URL('./', import.meta.url)),
      },
    }),
  );
});
