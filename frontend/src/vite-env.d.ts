/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_BACKEND_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

const baseURL = import.meta.env.VITE_BACKEND_URL;
console.log('Backend URL:', baseURL);