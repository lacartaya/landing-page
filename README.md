# Luis Cartaya · Landing personal

React, TypeScript, Tailwind CSS 4 y Motion. Landing y asistente guiado para consultas de presencia digital local. Estado: preview local, revisión legal pendiente, código subido a GitHub; sin despliegue manual ni PR.

## Desarrollo y comprobación

- `pnpm install` y `pnpm dev` para interfaz Vite.
- `pnpm build` genera preview en `dist/` tras TypeScript.
- `pnpm test` ejecuta pruebas de Pages Function con proveedores simulados.
- `pnpm check:legal` comprueba datos públicos obligatorios y marcador de revisión.
- `pnpm build:release` exige esa comprobación antes del build. No es certificación legal.
- No hay script lint configurado.

## Arquitectura

`src/main.tsx`: landing y selección de rutas. `src/LegalPages.tsx`: aviso, privacidad y cookies. `src/legal-config.ts`: datos públicos del titular. `src/ProjectAssistant.tsx`: preguntas predefinidas, no IA ni chat humano en directo. `functions/api/contact.ts`: validación y envío mediante Resend/Turnstile, deshabilitado hasta revisión.

Recursos visuales y fuentes locales en public; OFL incluidas. Sin analítica, cookies propias ni persistencia de respuestas. Enlaces a WhatsApp, mailto y LinkedIn. Sin precios públicos, testimonios ficticios, tienda o pagos. La maqueta es ilustrativa.

## Publicación pendiente

Vite no ejecuta Pages Functions ni aplica `_headers`. El futuro despliegue Pages debe servir `dist/` junto con las Functions de este proyecto; no basta alojar solo los archivos estáticos para enviar correo. Probar las rutas SPA y cabeceras en ese entorno. No existe configuración de despliegue activa en este checkout.

Consultar [activación del correo](EMAIL-SETUP.md), [auditoría](docs/legal-audit.md) y [bloqueos de lanzamiento](docs/pre-launch-legal-actions.md). El build de preview contiene textos de borrador. Robots y noindex son señales de indexación, no controles de acceso. No publicar hasta resolver pendientes.
