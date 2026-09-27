/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Overrides the restaurant API host, e.g. to point the page at staging. */
  readonly VITE_API_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
