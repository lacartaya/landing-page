import {onRequest} from '../functions/api/contact';
interface Env {ASSETS: {fetch(request: Request): Promise<Response>}; LEGAL_REVIEWED?: string}
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if(new URL(request.url).pathname === '/api/contact') return onRequest({request,env});
    if(new URL(request.url).pathname.startsWith('/api/')) return new Response('No encontrado',{status:404});
    return env.ASSETS.fetch(request);
  }
};
