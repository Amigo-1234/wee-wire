/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_INDEXING?: string;
  readonly PUBLIC_SHOW_REVIEW_MARKERS?: string;
  readonly PUBLIC_FORM_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
