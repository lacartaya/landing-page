# Activar el asistente y correo

El asistente guía y conserva respuestas solo en memoria de la pestaña. No transmite conversaciones parciales. Envía el resumen únicamente tras confirmación; el destino fijo es cartayala@gmail.com. No usa un modelo de IA ni finge atención humana en directo.

La ruta `functions/api/contact.ts` funciona como Cloudflare Pages Function. Un despliegue estático de dist sin functions no permite enviar. El servidor Vite actual sirve la interfaz, no Pages Functions: el envío mostrará un error informativo y conservará las respuestas.

Para activar en Pages, configurar en servidor:
- RESEND_API_KEY: secreto de Resend con permiso de envío.
- CONTACT_FROM: remitente de un dominio verificado en Resend.
- TURNSTILE_SECRET: clave secreta de Turnstile.
- TURNSTILE_SITE_KEY: clave pública del widget para el dominio de despliegue.
- CONTACT_HOSTNAME: hostname exacto del dominio permitido, sin protocolo ni ruta.
- LEGAL_REVIEWED: mantener ausente/false hasta resolver los bloqueos de docs/pre-launch-legal-actions.md; true habilita tras revisión y configuración completa.

Mantener pre-clearance desactivado salvo revisión específica. El servidor comprueba hostname y action=contact en Siteverify. Configurar límites de tasa en el edge antes de habilitar el endpoint público. Las cabeceras de public/_headers se aplican a estáticos; la Function define las suyas.

No poner secretos en variables VITE_ ni en Git. Configurar ambos ambientes por separado. Antes de publicación, completar/revisar la información de privacidad aplicable al prestador y al proveedor de email y establecer controles de tasa en Cloudflare.

Prueba final pendiente: configurar credenciales, pasar Turnstile y comprobar recepción real en el buzón de Luis. Las pruebas locales utilizan fetch simulado: no prueban entrega real.

Referencias: https://resend.com/docs/api-reference/emails/send-email y https://developers.cloudflare.com/pages/functions/get-started/
