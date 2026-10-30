# Registro de leads

Ambos canales usan POST /api/contact y la tabla inquiries existente en D1. Formulario: nombre, email y consulta obligatorios; teléfono y disponibilidad opcionales. Chat: preguntas actuales. answers_json incluye source (form/assistant), details, phone y availability, además del contexto del chat. No se guardan borradores ni pulsaciones. No hay envío automático de correo ni suscripción publicitaria.

Consulta privada desde Cloudflare D1 o REST API con credencial de servidor. Nunca incluir esa credencial en el navegador. SQL para preparar exportación CSV al CRM:

```sql
SELECT id, created_at, status, name, email,
 json_extract(answers_json, '$.source') AS source,
 json_extract(answers_json, '$.phone') AS phone,
 json_extract(answers_json, '$.availability') AS availability,
 json_extract(answers_json, '$.details') AS message,
 answers_json
FROM inquiries ORDER BY created_at;
```

Las filas antiguas sin source pueden devolver NULL. La clave id permite deduplicar importaciones. La limpieza tras exportar no está automatizada: primero verificar importación y definir conservación/borrado, incluyendo copias. No se han eliminado solicitudes.

La base develop ya existe en jurisdicción UE. El backend conserva barreras LEGAL_REVIEWED y Turnstile, mismo origen, consultas parametrizadas y deduplicación por requestId. Activación real pendiente de completar esos requisitos y protección de tasa. El esquema inicial está en migrations/0001_inquiries.sql; no hace falta alterar la tabla para los nuevos campos JSON. Producción debe usar base propia.

D1 es una base gestionada con semántica SQLite, accesible por binding de Worker o API autenticada, no mediante una conexión SQLite remota abierta. Tiene capa gratuita sujeta a límites: https://developers.cloudflare.com/d1/platform/pricing/ . No se ha contratado ningún plan.

## Desarrollo privado habilitado
El modo develop incluye PRIVATE_INQUIRIES y la audiencia concreta de Cloudflare Access. El backend verifica firma RSA del JWT con las claves públicas de la organización, emisor, audiencia, caducidad y nbf; solo lo acepta en el hostname exacto de develop. Sin una sesión válida, no habilita la recepción privada. La captación pública mantiene la barrera de revisión y Turnstile. La base no tiene API de lectura pública.

Esquema versionado: 0001_inquiries.sql crea tabla e índice; 0002_leads_export.sql añade vista de exportación. Aplicados a la base develop. Consultar SELECT * FROM leads_export; desde el panel privado de Cloudflare o API autenticada.
