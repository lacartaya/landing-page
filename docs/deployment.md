# Entornos privados en Cloudflare Workers

- main → landing-page.cartayala.workers.dev, versión estable.
- develop → landing-page-develop.cartayala.workers.dev, pruebas.
- Ambos protegidos con Cloudflare Access, correo permitido cartayala@gmail.com, sesión 24 horas.
- Cada push ejecuta tests, build Vite con plugin Cloudflare y cf deploy --prebuilt. develop selecciona el modo develop; no cambia producción.
- Para promover: abrir una PR develop → main, revisar la preview y fusionar solo tras aprobación de Luis. No hay promoción automática entre ramas.
- Al comprar dominio, configurar el dominio y revisar Access explícitamente antes de publicar. Noindex sigue activo. El envío del asistente continúa deshabilitado.
- La API existente de Pages se reutiliza mediante worker/index.ts, sin duplicar validación.
- El build de Workers genera .cloudflare/output/v0, no dist. build:release conserva la barrera legal para el lanzamiento comercial futuro.
- Cloudflare Access introduce cookies de autenticación necesarias en este entorno privado; revisar inventario y privacidad al cambiar el acceso.
