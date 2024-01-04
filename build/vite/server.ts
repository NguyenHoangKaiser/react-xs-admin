import type { ServerOptions } from 'vite';

export function createViteServer(): ServerOptions {
  const viteServer: ServerOptions = {
    // Server host name, if external access is allowed, it can be set to "0.0.0.0"
    host: true,
    // Server port number
    port: 5173,
    //Whether the port has been occupied to use the next available port TRUE: exit directly instead of trying the next available port FALSE: try the next available port
    strictPort: false,
    // Boolean | String automatically opens the application in the browser when starting the project; if it is string, such as "/index.html", it will open http: // localhost: 5173/index.html
    // open: true,
    // Boolean | Corsoption configure CORS for the development server. By default and allow any source, pass a option object to adjust the behavior or set it to false to indicate disable.
    // cors: true,
    // Set to True forced dependence to rely on preparatory construction.
    // force: false,
    // Customized proxy rules
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  };
  return viteServer;
}
