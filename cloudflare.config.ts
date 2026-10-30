import {bindings, defineConfig} from 'cf/config';
export default defineConfig(({mode}) => ({
  accountId: '29d185b0c37c55af23989e3eab8ba6eb',
  worker: {
    name: mode === 'develop' ? 'landing-page-develop' : 'landing-page',
    entrypoint: './worker/index.ts',
    compatibilityDate: '2026-10-30',
    workersDev: true,
    previewUrls: false,
    env: {ASSETS: bindings.assets(), ...(mode === 'develop' ? {PRIVATE_INQUIRIES: bindings.json('true'), ACCESS_AUD: bindings.json('64e2dece8f99b0bec2650bd02c8eab863612a7960da5853eb9ee84e3076a51c7'), DB: bindings.d1({id: '45ff7ea5-7aef-4340-a65f-21f585e6e8d4', name: 'landing-inquiries-develop'})} : {})},
    assets: {notFoundHandling: 'single-page-application', runWorkerFirst: true},
    observability: {enabled: true, traces: {enabled: true}},
  },
}));
