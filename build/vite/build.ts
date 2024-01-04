import type { BuildOptions } from 'vite';

export function createViteBuild(): BuildOptions {
  const viteBuild = {
    target: 'es2015',
    // Specify the output path
    outDir: 'dist',
    cssTarget: 'chrome80',

    // Specify the storage path that generates static resources
    assetsDir: 'static',
    // Enable/disable the CSS code split. When it is enabled, the CSS guided by the asynchronous Chunk will connect the inner couplet to the asynchronous Chunk itself, and insert it when the block is loaded. If it is disabled, all CSS in the entire project will be extracted into a CSS file.
    cssCodeSplit: true,
    // Whether to generate a source maP file after construction。
    sourcemap: false,
    // Enable/disable Brotli compression large report. Compressed large output files may be slow, so disable this function may improve the construction performance of large projects.
    brotliSize: false,
    // minify: 'terser',
    // terserOptions: {
    //   compress: {
    //     // Package Console
    //     drop_console: true,
    //   },
    // },
    // The limitation of chunk size warning (in KBS unit)
    chunkSizeWarningLimit: 2000,
  };
  return viteBuild;
}
