import { type ConfigEnv, type UserConfig } from 'vite';
import { createViteBuild } from './build/vite/build';
import { createVitePlugins } from './build/vite/plugins';
import { createViteResolve } from './build/vite/resolve';
import { createViteServer } from './build/vite/server';

// https://vitejs.dev/config/
export default (configEnv: ConfigEnv): UserConfig => {
  const { command } = configEnv;
  // const { command, mode } = configEnv;
  const isBuild = command === 'build';
  // const env = loadEnv(mode, process.cwd(), '');
  return {
    // define: {
    //   __APP_ENV__: JSON.stringify(env.APP_ENV),
    // },
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
