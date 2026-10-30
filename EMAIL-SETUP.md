# Solicitudes sin envío automático de correo

El asistente conserva respuestas en memoria y registra el resumen en Cloudflare D1 únicamente al pulsar «Guardar solicitud». No usa IA ni atención humana en directo. El correo del visitante permite responderle después manualmente.

## Desarrollo

Base creada: `landing-inquiries-develop`, UUID `45ff7ea5-7aef-4340-a65f-21f585e6e8d4`, jurisdicción `eu`, sin replicación. Tabla `inquiries` e índice inicializados; sin datos personales. El binding `DB` se incluye únicamente al compilar en modo develop. Producción requiere una base independiente: no debe reutilizar la de desarrollo.

Para ver solicitudes: Cloudflare → Storage & databases → D1 → landing-inquiries-develop → Console. Consulta:

```sql
SELECT id, created_at, status, name, email, answers_json
FROM inquiries ORDER BY created_at DESC LIMIT 100;
```

No hay API pública de lectura ni panel administrativo dentro de la landing. La consulta requiere iniciar sesión en Cloudflare. Los estados admitidos son `new`, `contacted`, `closed`; el panel permite gestionarlos. Acordar y aplicar plazos de borrado, incluyendo logs y copias.

## Activación pendiente

- Resolver `docs/pre-launch-legal-actions.md` y actualizar información de privacidad con los hechos comprobados.
- Configurar TURNSTILE_SECRET (secreto), TURNSTILE_SITE_KEY y CONTACT_HOSTNAME exacto por entorno; pre-clearance desactivado. El servidor verifica hostname y action=contact.
- Configurar límite de tasa antes de habilitar recepción pública.
- Tras revisión, LEGAL_REVIEWED=true en servidor; VITE_LEGAL_REVIEWED=true en frontend. Nunca introducir secretos en variables VITE_.
- Desplegar primero develop y probar registro real con datos sintéticos y Turnstile. Esta revisión no ha desplegado ni activado la recepción.

Las pruebas automatizadas simulan Turnstile y D1. Verifican errores y parámetros; no acreditan una recepción real. El identificador único evita duplicar una misma solicitud reintentada. Las respuestas parciales no se envían.

## Alternativas de correo

- `mailto:` abre la aplicación de correo del visitante: él redacta/envía desde su cuenta; no requiere servicio de envío del sitio.
- Cloudflare Email Service permite enviar desde servidor, con configuración de dominio/remitente y destinatarios verificados o capacidad de envío general según plan. Email Routing sirve para recibir y reenviar; no equivale a un buzón completo.
- D1 evita el correo automático: guarda solicitudes para consultarlas. Es la opción implementada. El visitante puede usar también el enlace de correo, WhatsApp o LinkedIn.

Referencias: [Email Service](https://developers.cloudflare.com/email-service/), [D1](https://developers.cloudflare.com/d1/get-started/), [configuración cf](https://developers.cloudflare.com/cf/projects/config-explorer/).
