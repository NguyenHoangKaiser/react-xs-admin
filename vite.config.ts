import type { ConfigEnv, UserConfig } from 'vite';
import { createViteBuild } from './build/vite/build';
import { createVitePlugins } from './build/vite/plugins';
import { createViteResolve } from './build/vite/resolve';
import { createViteServer } from './build/vite/server';

// https://vitejs.dev/config/
export default (configEnv: ConfigEnv): UserConfig => {
  const { command } = configEnv;

  const isBuild = command === 'build';

  return {
    // Parsing configuration
    resolve: createViteResolve(__dirname),
    // Plug -in configuration
    plugins: createVitePlugins(isBuild, configEnv),
    // Package configuration
    build: createViteBuild(),
    // Service configuration
    server: createViteServer(),
  };
};
