declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {

  readonly VITE_APP_BASE_API: string;
  
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
