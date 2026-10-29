# Acciones antes de publicar

**No publicar comercialmente todavía.** Responsable de resolver y confirmar: titular, con asesoramiento jurídico cuando corresponda. No compartir secretos. El titular ha facilitado y autorizado la incorporación y el push de los datos identificativos públicos del aviso legal. Se guardan en `landing/src/public-identity.json`.

| Clase | Acción y criterio de cierre |
|---|---|
| BLOCKER | Nombre completo, NIF y domicilio incorporados según los datos aportados por el titular. Se identifica como profesional. Pendiente confirmar situación de alta y datos registrales/autorizaciones si corresponden; no se presupone alta de autónomo. |
| BLOCKER | Revisar adecuación del buzón Gmail y cuentas Cloudflare/Resend/WhatsApp, contratos, subencargados y transferencias. Resolver garantías antes de recibir consultas comerciales; sustituir proveedor si la cuenta no permite lo necesario. |
| BLOCKER | Establecer conservación concreta, responsables de atender derechos/borrados y configuración de logs/copias; sustituir pendientes de la política por hechos verificables. |
| BLOCKER | Acreditar permiso comercial del vídeo de ejemplo o sustituirlo. Confirmar titularidad/licencia del logo y fotografía. |
| BLOCKER | Verificar en dominio final HTTPS, cabeceras CSP, scripts/cookies/almacenamiento con Turnstile y Cloudflare. Si aparecen tecnologías no exentas, bloquearlas y habilitar consentimiento real antes de cargar. |
| BLOCKER (activar formulario) | Configurar remitente verificado y secretos, hostname permitido, Turnstile sin pre-clearance salvo revisión, protección de tasa/abuso. Probar recepción y errores con datos de prueba autorizados. No activar LEGAL_REVIEWED antes de cerrar decisiones. |
| REVIEW | Asesor revisar bases de interés legítimo, información del titular, tratamientos y normativa profesional/fiscal aplicable. No confundir configuración técnica con autorización para ejercer una actividad. |
| REVIEW | Determinar ámbito de accesibilidad de Ley 11/2023 y posibles excepciones según actividad/tamaño; evaluación de teclado, lector y contraste completa. No se certifica WCAG. |
| REVIEW | Confirmar afirmaciones de trayectoria, soporte, titularidad de activos y procesos comerciales. Revisar contratos/presupuestos posteriores y derechos de consumidores cuando proceda. |
| REVIEW | Completar pruebas de Pages Functions, CSP, móvil y correo reales. Sin acceso configurado a infraestructura no pueden darse por pasadas. |
| RECOMMENDATION | MFA, mínimos privilegios, revisión de dependencias periódica, procedimiento de incidencias y registro de tratamientos. |
| RECOMMENDATION | Tras cerrar bloqueos y obtener autorización de publicación, revisar/remover Disallow de robots y X-Robots-Tag de borrador. Noindex no restringe acceso ni asegura que una página no sea indexada. |

## Configuración una vez verificados los hechos

Los datos aportados se cargan desde `landing/src/public-identity.json`. Se pueden sobrescribir con `VITE_LEGAL_NAME`, `VITE_LEGAL_NIF` y `VITE_LEGAL_ADDRESS` en `landing/.env.production.local` (ignorado por Git). Solo al completar la revisión, definir `VITE_LEGAL_REVIEWED=true`. Son valores **públicos** incorporados a la web, no secretos. No usar valores ficticios para superar la comprobación.

`pnpm check:legal` detecta ausencias; `pnpm build:release` añade esta barrera antes del build. No es validación jurídica, ni impide a alguien ejecutar el build de preview y desplegarlo manualmente. Vincular el futuro pipeline de publicación a build:release.

En servidor: `RESEND_API_KEY`, `CONTACT_FROM`, `TURNSTILE_SECRET`, `TURNSTILE_SITE_KEY`, `CONTACT_HOSTNAME` (solo hostname exacto), `LEGAL_REVIEWED=true`. Las claves privadas nunca van en VITE_. El marcador servidor es independiente del frontend y se mantiene desactivado hasta revisión completa.

Consultar también `landing/EMAIL-SETUP.md`. No se ha desplegado ni enviado email real. El usuario ha autorizado el push de esta versión; no se ha solicitado abrir PR. Dominio definitivo todavía no disponible.
