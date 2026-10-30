import {bindings, defineConfig} from 'cf/config';
export default defineConfig(({mode}) => ({
  accountId: '29d185b0c37c55af23989e3eab8ba6eb',
  worker: {
    name: mode === 'develop' ? 'landing-page-develop' : 'landing-page',
    entrypoint: './worker/index.ts',
    compatibilityDate: '2026-10-30',
    workersDev: true,
    previewUrls: false,
    env: {ASSETS: bindings.assets(), ...(mode === 'develop' ? {DB: bindings.d1({id: '45ff7ea5-7aef-4340-a65f-21f585e6e8d4', name: 'landing-inquiries-develop'})} : {})},
    assets: {notFoundHandling: 'single-page-application', runWorkerFirst: true},
    observability: {enabled: true, traces: {enabled: true}},
  },
}));
