/// <reference types="vite/client" />

declare interface ViteEnv {
  readonly VITE_ENV: string;
  readonly VITE_KEY_ALIVE: 'TRUE' | 'FALSE';
  readonly VITE_KEY_ALIVE_MAX_LEN: number;
  readonly VITE_BASE_URL: string;
  readonly VITE_API_KEY: string;
}

interface ImportMetaEnv extends ViteEnv {
  _: unknown;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
