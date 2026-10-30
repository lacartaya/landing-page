import {readFileSync,writeFileSync} from 'node:fs';
import {loadEnv} from 'vite';
const env={...loadEnv('production',process.cwd(),''),...process.env};
const publicSite=process.argv[2]!=='develop' && env.PUBLIC_INDEXING==='true';
let origin='';
if(publicSite){
 const u=new URL(env.PUBLIC_SITE_URL||'');
 if(u.protocol!=='https:'||u.pathname!=='/'||u.search||u.hash||u.username||u.password||/\.(workers|pages)\.dev$/.test(u.hostname)||env.VITE_LEGAL_REVIEWED!=='true')throw Error('Indexación pública requiere dominio HTTPS definitivo y revisión legal.');
 origin=u.origin;
}
const dir='.cloudflare/output/v0/workers/default/assets';
let html=readFileSync(dir+'/index.html','utf8');
if(publicSite)html=html.replace('content="noindex,nofollow"','content="index,follow"').replace('</head>',`<link rel="canonical" href="${origin}/"/><meta property="og:url" content="${origin}/"/><meta property="og:image" content="${origin}/images/logo.png"/><meta name="twitter:image" content="${origin}/images/logo.png"/></head>`);
writeFileSync(dir+'/index.html',html);
const routes=['/','/aviso-legal','/politica-de-privacidad','/politica-de-cookies','/servicios/presencia-digital','/servicios/seo-local','/servicios/automatizacion','/servicios/agentes-ia'];
writeFileSync(dir+'/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+(publicSite?routes.map(p=>`<url><loc>${origin}${p}</loc></url>`).join(''):'')+'</urlset>');
writeFileSync(dir+'/robots.txt',publicSite?`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${origin}/sitemap.xml\n`:'User-agent: *\nDisallow: /\n');
if(publicSite)writeFileSync(dir+'/_headers',readFileSync(dir+'/_headers','utf8').replace(/.*X-Robots-Tag:.*\n?/g,''));
