import {bindings, defineConfig} from 'cf/config';
export default defineConfig(({mode}) => ({
  accountId: '29d185b0c37c55af23989e3eab8ba6eb',
  worker: {
    name: mode === 'develop' ? 'landing-page-develop' : 'landing-page',
    entrypoint: './worker/index.ts',
    compatibilityDate: '2026-10-30',
    workersDev: true,
    previewUrls: false,
    env: {ASSETS: bindings.assets()},
    assets: {notFoundHandling: 'single-page-application', runWorkerFirst: ['/api/*']},
    observability: {enabled: true, traces: {enabled: true}},
  },
}));
