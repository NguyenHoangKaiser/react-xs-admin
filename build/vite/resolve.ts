import path from 'path';
import type { AliasOptions, ResolveOptions } from 'vite';

type myResolveOptions = ResolveOptions & { alias?: AliasOptions };

export function createViteResolve(myDirname: string): myResolveOptions {
  const viteResolve: myResolveOptions = {
    // Quote the all -name configuration
    alias: {
      // Configure@Alias
      '@': `${path.resolve(myDirname, 'src')}`,
      // Configuration#Alias
      '#': `${path.resolve(myDirname, 'types')}`,
    },
    // The list of expansion that wants to omitted when imported.Note that it is not recommended to ignore the expansion name (for example: .vue), because it interferes with IDE and type support.
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  };

  return viteResolve;
}
