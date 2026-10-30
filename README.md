# Luis Cartaya · Landing personal

React, TypeScript, Tailwind CSS 4 y Motion. Landing y asistente guiado para consultas de presencia digital local. Estado: preview local, revisión legal pendiente, código subido a GitHub; sin despliegue manual ni PR.

## Desarrollo y comprobación

- `pnpm install` y `pnpm dev` para interfaz Vite.
- `pnpm build` genera preview en `.cloudflare/output/` tras TypeScript.
- `pnpm test` ejecuta pruebas de endpoint con Turnstile y D1 simulados.
- `pnpm check:legal` comprueba datos públicos obligatorios y marcador de revisión.
- `pnpm build:release` exige esa comprobación antes del build. No es certificación legal.
- No hay script lint configurado.

## Arquitectura

`src/main.tsx`: landing y selección de rutas. `src/LegalPages.tsx`: aviso, privacidad y cookies. `src/legal-config.ts`: datos públicos del titular. `src/ProjectAssistant.tsx`: preguntas predefinidas, no IA ni chat humano en directo. `functions/api/contact.ts`: validación y registro mediante D1/Turnstile, deshabilitado hasta revisión.

Recursos visuales y fuentes locales en public; OFL incluidas. Sin analítica, cookies propias ni persistencia de respuestas. Enlaces a WhatsApp, mailto y LinkedIn. Sin precios públicos, testimonios ficticios, tienda o pagos. La maqueta es ilustrativa.

## Publicación pendiente

El proyecto usa Workers con Static Assets y el plugin Cloudflare de Vite. El formulario guarda solicitudes en D1; su recepción permanece bloqueada hasta completar privacidad y configuración. Consulta el seguimiento de esta revisión en [auditoría 30-10-2026](docs/audit-followup-2026-10-30.md).

Consultar [activación del correo](EMAIL-SETUP.md), [auditoría](docs/legal-audit.md) y [bloqueos de lanzamiento](docs/pre-launch-legal-actions.md). El build de preview contiene textos de borrador. Robots y noindex son señales de indexación, no controles de acceso. No publicar hasta resolver pendientes.


## Entornos Cloudflare

Consultar [flujo main/develop y acceso privado](docs/deployment.md). El despliegue actual usa Workers con Static Assets, no Pages; las referencias históricas a Pages describen la implementación inicial. El código de contacto se reutiliza desde worker/index.ts.


## Flujo de promoción

Desarrolla en `develop`; sus pushes disparan el pipeline del entorno privado de pruebas (la última configuración requiere resolver el rechazo inicial de sobrescritura de cf antes de confirmar despliegues exitosos). Para preparar una versión, ejecuta manualmente **Prepare production promotion** en GitHub Actions y escribe `PROMOTE`. La Action pasa tests y build, luego abre una PR de `develop` a `main`. Revisa y fusiona esa PR para publicar; Cloudflare despliega `main` tras el merge. GitHub bloquea los pushes directos a `main`.
