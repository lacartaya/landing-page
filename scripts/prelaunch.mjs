import {loadEnv} from 'vite';
import {readFileSync} from 'node:fs';
const identity=JSON.parse(readFileSync(new URL('../src/public-identity.json',import.meta.url),'utf8'));
const env={...loadEnv('production',process.cwd(),''),...process.env};
const fields={VITE_LEGAL_NAME:env.VITE_LEGAL_NAME||identity.name,VITE_LEGAL_NIF:env.VITE_LEGAL_NIF||identity.nif,VITE_LEGAL_ADDRESS:env.VITE_LEGAL_ADDRESS||identity.address};
const missing=Object.entries(fields).filter(([,value])=>!value?.trim()).map(([key])=>key);
if(env.VITE_LEGAL_REVIEWED!=='true')missing.push('VITE_LEGAL_REVIEWED=true (revisión pendiente)');
if(missing.length){console.error('Publicación bloqueada. Pendientes: '+missing.join(', '));process.exit(1)}
console.log('Configuración identificativa presente. Esto no certifica cumplimiento ni sustituye el checklist.');
