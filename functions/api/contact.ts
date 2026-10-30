export interface InquiryDB {prepare(sql:string):{bind(...values:unknown[]):{run():Promise<{success:boolean}>}}}
type Env={DB?:InquiryDB;TURNSTILE_SECRET?:string;TURNSTILE_SITE_KEY?:string;LEGAL_REVIEWED?:string;CONTACT_HOSTNAME?:string};
const fields=['business','presence','website','goal','details','timing','name','email','phone'];
const required=['business','presence','goal','details','timing','name','email'];
const reply=(status:number,error:string)=>Response.json({ok:false,error},{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'}});
export async function onRequest({request,env}:{request:Request;env:Env}):Promise<Response>{
 if(request.method==='GET')return Response.json({siteKey:env.LEGAL_REVIEWED==='true'?env.TURNSTILE_SITE_KEY||null:null,enabled:env.LEGAL_REVIEWED==='true'&&Boolean(env.DB&&env.TURNSTILE_SECRET&&env.CONTACT_HOSTNAME)},{headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'}});
 if(request.method!=='POST')return reply(405,'Método no permitido.');
 if(request.headers.get('Origin')!==new URL(request.url).origin)return reply(403,'Origen no permitido.');
 if(!request.headers.get('Content-Type')?.includes('application/json'))return reply(415,'Formato no permitido.');
 if(env.LEGAL_REVIEWED!=='true')return reply(503,'El formulario todavía no está habilitado para recibir solicitudes. Puedes contactar por correo.');
 const reader=request.body?.getReader();if(!reader)return reply(400,'Faltan datos.');let size=0;const chunks:Uint8Array[]=[];
 while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>16000){await reader.cancel();return reply(413,'Solicitud demasiado larga.')}chunks.push(value)}
 let data;try{const bytes=new Uint8Array(size);let offset=0;for(const c of chunks){bytes.set(c,offset);offset+=c.length}data=JSON.parse(new TextDecoder().decode(bytes))}catch{return reply(400,'Datos inválidos.')}
 const a=data?.answers;if(!a||typeof a!=='object')return reply(400,'Revisa los datos de la solicitud.');
 for(const key of fields){if(a[key]!==undefined&&(typeof a[key]!=='string'||a[key].length>(key==='details'?2000:500)))return reply(400,'Revisa la longitud de tus respuestas.')}
 if(required.some(key=>typeof a[key]!=='string'||!a[key].trim())||!/^\S+@[^\s@]+\.[^\s@]+$/.test(a.email)||/[\r\n]/.test(a.email))return reply(400,'Completa los datos obligatorios y un correo válido.');
 if(typeof data.requestId!=='string'||! /^[0-9a-f-]{36}$/i.test(data.requestId))return reply(400,'Identificador inválido.');
 if(!env.DB)return reply(503,'El envío aún no está disponible. Tus respuestas se conservan mientras mantengas esta página abierta.');
 // Require bot protection before enabling public inquiry submission.
 if(!env.TURNSTILE_SECRET||!env.CONTACT_HOSTNAME||typeof data.token!=='string'||data.token.length>2048)return reply(503,'El envío seguro aún no está activado. Contacta directamente con Luis.');
 try{
 const check=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:new URLSearchParams({secret:env.TURNSTILE_SECRET,response:data.token}),signal:AbortSignal.timeout(10000)});const verified=await check.json() as {success:boolean;hostname?:string;action?:string};if(!verified.success||verified.hostname!==env.CONTACT_HOSTNAME||verified.action!=='contact')return reply(400,'No se pudo verificar el envío. Inténtalo de nuevo.');
 const record=Object.fromEntries(fields.map(key=>[key,a[key]?.trim()||'']));
 const result=await env.DB.prepare('INSERT INTO inquiries (id, created_at, status, name, email, answers_json) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO NOTHING').bind(data.requestId,new Date().toISOString(),'new',record.name,record.email,JSON.stringify(record)).run();
 if(!result.success)return reply(502,'No se pudo enviar. Inténtalo de nuevo en unos minutos.');return Response.json({ok:true},{headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'}});
 }catch{return reply(502,'No se pudo conectar con el registro de solicitudes. Inténtalo de nuevo.');}
}
