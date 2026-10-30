import {onRequest, type InquiryDB} from '../functions/api/contact';
interface Env {DB?:InquiryDB;ASSETS: {fetch(request: Request): Promise<Response>}; LEGAL_REVIEWED?: string}
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if(new URL(request.url).pathname === '/api/contact') return onRequest({request,env});
    if(new URL(request.url).pathname.startsWith('/api/')) return new Response('No encontrado',{status:404});
    const path=new URL(request.url).pathname.replace(/\/$/,'') || '/';
    const response=await env.ASSETS.fetch(request);
    if(response.headers.get('Content-Type')?.includes('text/html') && !['/','/aviso-legal','/politica-de-privacidad','/politica-de-cookies','/servicios/presencia-digital','/servicios/seo-local','/servicios/automatizacion','/servicios/agentes-ia'].includes(path)) {
      const headers=new Headers(response.headers);headers.set('X-Robots-Tag','noindex');
      return new Response(response.body,{status:404,headers});
    }
    return response;
  }
};
