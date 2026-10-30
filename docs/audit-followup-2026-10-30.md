# Seguimiento de auditoría — 30 octubre 2026

Cambios locales sobre la versión de develop. Sin push, merge ni despliegue en esta revisión. La URL publicada conserva su versión anterior. No se certifica cumplimiento legal ni accesibilidad completa.

| Hallazgo | Resolución / límite |
|---|---|
| LEG-01 | Se mantienen las advertencias y el bloqueo de captación. Textos actualizados a Workers/D1. Pendiente confirmar alta/situación profesional, contratos, transferencias, retención, logs/copias y licencias. No es posible acreditar estos hechos cambiando código. |
| UX-01 | Contacto usa overflow:clip, sin scroll interno al enfocar enlaces. Decoraciones no interceptan clics. |
| A11Y-01 | Banda de servicios estática, sin repetición ni animación infinita; se adapta en varias filas. |
| SEO-01 | Privado por defecto: noindex y robots Disallow. Script de build admite publicación solo con PUBLIC_INDEXING=true, PUBLIC_SITE_URL HTTPS definitivo y VITE_LEGAL_REVIEWED=true. develop permanece privado incluso con esas variables. Access sigue siendo la protección de acceso; robots no es control de seguridad. |
| SEO-02 | Sitemap y canonical preparados para dominio definitivo; sitemap privado vacío. Worker devuelve 404 para rutas HTML desconocidas y API desconocida. |
| UX-02 | Progreso de preguntas 1–9; resumen al 100%, sin pregunta 10 ficticia. |
| UX-03 | Se elimina la segunda copia del aviso de privacidad en el resumen. |
| SEO-03 | Favicon, metadatos Open Graph y Twitter añadidos; URLs absolutas de imagen/social al configurar dominio público. |
| UX-04 | CTA principal Hablemos → contacto; formulario guiado y correo prioritarios. Servicios abren correo con asunto específico. WhatsApp y LinkedIn conservados. |
| UX-05 | Teléfono/disponibilidad opcionales en asistente. No se añade calendario de terceros; la llamada se acuerda al responder. |
| Legibilidad | Texto secundario y contenido de FAQ/proceso ampliados. |

## Solicitudes

Backend cambiado de envío de email a consultas parametrizadas D1, con validación de campos, límite de cuerpo, mismo origen, comprobación de Turnstile y deduplicación por identificador. Base de desarrollo UE creada y esquema aplicado, cero solicitudes. Binding solo develop. No existe endpoint de lectura pública; consultar mediante panel Cloudflare. Pasos y comparativa de correo en EMAIL-SETUP.md.

## Validación

Pruebas automatizadas del endpoint; compilación TypeScript y build develop. Comprobación visual/DOM a 320, 375, 390, 768 y 1440: scrollWidth igual al ancho, banda sin animación y apertura desde contacto. No equivale a una auditoría completa con lector de pantalla, dispositivos físicos o tráfico del dominio público. Prueba real de Turnstile + registro y revisión de cookies/cabeceras con configuración final siguen pendientes.

## Lo que requiere decisiones del titular

Dominio definitivo; situación profesional exacta; derechos comerciales de vídeo/foto/logo; plazos de conservación y proceso de borrado; revisión de cuentas/contratos y garantías de proveedores. Mantener captación desactivada hasta cerrar esos puntos. No añadir valores inventados para superar controles.
