import react from '@vitejs/plugin-react';
// import react from '@vitejs/plugin-react-swc';
import { splitVendorChunkPlugin, type ConfigEnv, type PluginOption } from 'vite';
// import { configMockPlugin } from './mock';

// svg配置
import { configSvgPlugin } from './svg';

export function createVitePlugins(_isBuild = false, _configEnv: ConfigEnv) {
  const vitePlugins: PluginOption[] = [];

  vitePlugins.push(
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    // visualizer({ template: 'network' }) as unknown as PluginOption,
    splitVendorChunkPlugin(),
  );

  vitePlugins.push(configSvgPlugin());

  // vitePlugins.push(configMockPlugin(_isBuild));

  return vitePlugins;
}
