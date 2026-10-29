# Auditoría legal y técnica · 30 de octubre de 2026

**Resultado: preparada para revisión, no autorizada ni lista para publicación comercial.** Auditoría del código local de `landing/`, no certificación jurídica ni auditoría de cuentas de proveedores. No se han publicado cambios ni enviado correos reales.

## Alcance y evidencia

React, TypeScript, Vite, Tailwind y Motion; Pages Function en `landing/functions/api/contact.ts`. Rutas `/`, `/aviso-legal`, `/politica-de-privacidad`, `/politica-de-cookies`. CTAs mailto, WhatsApp y LinkedIn; un asistente guiado con nueve preguntas y revisión. Sin tienda, cobros, reservas, CRM, modelos de IA, newsletter, Google Analytics, mapas ni píxeles en el código. Los servicios ofrecidos comercialmente no son integraciones instaladas.

El repositorio local no tiene commits ni remoto configurado: no fue posible actualizar una rama principal desde GitHub. Se creó `legal/landing-audit`, conservando los archivos existentes. La URL de repositorio aportada no acredita que este checkout esté sincronizado.

## Hallazgos

| Prioridad | Evidencia | Acción y estado |
|---|---|---|
| P1 | No había páginas legales ni identificación completa | Tres páginas y enlaces permanentes añadidos en `src/LegalPages.tsx` y `src/main.tsx`. **Pendiente:** nombre legal completo, NIF, domicilio y circunstancias profesionales. |
| P1 | Asistente recoge datos personales; proveedores y conservación sin validar | Primera capa y política específica, resumen revisable, borrado de respuestas, sin envío parcial. Envío bloqueado por `LEGAL_REVIEWED` en servidor. **Pendiente:** acuerdos, transferencias y calendario de borrado. |
| P1 | Recurso audiovisual remoto aportado como ejemplo sin licencia acreditada | Vídeo alojado localmente para reducir solicitudes externas. **Pendiente:** acreditar derechos o sustituirlo; copiarlo no otorga licencia. Confirmar derechos de foto y logo aportados. |
| P2 | Consentimiento obligatorio para una consulta precontractual | Casilla eliminada; base diferenciada para solicitudes propias y representantes profesionales. Sin marketing. **Resuelto en código**, evaluación de interés legítimo pendiente. |
| P2 | Google Fonts y CloudFront recibían peticiones al cargar | Fuentes y vídeo locales; licencias OFL incluidas. **Resuelto técnicamente**; no confirma derechos del vídeo. |
| P2 | Protección del endpoint incompleta | Validación cliente/servidor, límite de cuerpo de 16 KB, límites de campos, origen, JSON, destinatario fijo, texto sin HTML, Turnstile con hostname/action y token de uso único, timeouts e idempotencia. **Pendiente:** tasa y reglas de abuso en Cloudflare. |
| P2 | Cabeceras no configuradas | `_headers` incorpora CSP, nosniff, no-referrer, anti-iframe y permisos mínimos; API no-store. **Pendiente:** prueba bajo Pages/HTTPS con Turnstile real. Vite no aplica `_headers`. |
| P2 | Cookies de infraestructura desconocidas | Inventario del código abajo; no banner decorativo. **Pendiente:** captura real en dominio definitivo, Turnstile y configuración de Cloudflare. |
| P2 | Accesibilidad sin evaluación formal | Labels, focos, mensajes alert, Escape, pausa del vídeo y reduced-motion en código. Páginas legales legibles a 390 px en comprobación parcial. **Pendiente:** evaluación integral de contraste, teclado/lector y ámbito legal. |
| P3 | Logo anterior | Reemplazado por el archivo suministrado en cabecera y navegación, también en páginas legales. **Resuelto**. |
| P3 | Riesgo de publicar borradores | Avisos explícitos, `check:legal`, `build:release`, robots y cabecera noindex. **Implementado**, no sustituye control de despliegue ni restringe acceso. |

## Inventario de almacenamiento y seguimiento

Búsqueda del código fuente: no escritura propia de cookies, localStorage, sessionStorage ni IndexedDB. Respuestas y UUID de solicitud en memoria React/ref; se pierden al recargar o borrar, se limpian tras éxito. Cerrar el panel conserva respuestas hasta recargar/borrar; está explicado mediante el botón de borrado. No se registran respuestas en consola ni en base de datos propia. No se han inspeccionado logs de infraestructura ni del proveedor.

| Nombre observado/tecnología | Proveedor | Finalidad | Duración | Tipo / consentimiento |
|---|---|---|---|---|
| Respuestas y UUID en memoria | Aplicación | Recorrido solicitado e idempotencia | Pestaña, borrado o envío correcto | Estado transitorio necesario; sin cookie persistente |
| Token de Turnstile (solo al habilitar) | Cloudflare | Verificación antiabuso | Temporal; validación de un uso, caducidad del proveedor de 300 s | Seguridad; confirmar configuración y proporcionalidad antes de activar |
| Cookies/identificadores del alojamiento | Cuenta Cloudflare aún sin inspeccionar | Depende de configuración | No medido | Pendiente; no se inventan nombres ni se declara exención global |

No se carga Turnstile hasta revisar el resumen y recibir configuración habilitada del servidor. Pre-clearance debe permanecer desactivado salvo revisión específica. No hay preferencias de consentimiento que persistir o revocar en esta versión. Si se incorporan tecnologías no exentas, bloquearlas antes de consentimiento y añadir aceptación/rechazo equivalentes, granularidad y retirada; no basta actualizar el texto.

## Contenido comercial

La maqueta «estudio calma» aparece como concepto ilustrativo; no se atribuye a un cliente real. No se han encontrado testimonios, certificaciones, cifras de resultados, precios públicos, garantía de posicionamiento ni una sociedad ficticia. La trayectoria general y las condiciones prometidas (activos a nombre del cliente, supervisión y soporte acordado) requieren confirmación del titular. No hay contratación electrónica integrada; las propuestas y contratos posteriores requieren su propia revisión, especialmente si se trabaja con consumidores.

## Verificación realizada

- TypeScript frontend y compilación separada de la Pages Function: correctos.
- Build Vite: correcto; advertencias de directivas «use client» de Motion, no errores.
- Siete pruebas automatizadas de API: correctas; revisión legal ausente, origen ajeno, validación de campos, tamaño excesivo, éxito simulado, hostname incorrecto y error del proveedor. Sin envío real.
- `pnpm audit --json`: 0 vulnerabilidades conocidas notificadas, 118 dependencias, a fecha de revisión; no prueba ausencia de vulnerabilidades.
- `check:legal`: falla como está previsto al faltar identificación/revisión; evita `build:release` por defecto.
- Navegador local: navegación por footer a las tres páginas, apertura del asistente y primera capa, campo obligatorio vacío rechazado, avance con dato de prueba y borrado/reinicio, cierre con Escape, screenshots de aviso y asistente a 390 × 844, consola consultada sin errores/avisos.
- Revalidación final: `node --test tests/*.test.mjs`, `node node_modules/typescript/bin/tsc --noEmit` y `node node_modules/vite/bin/vite.js build` correctos. El lanzador pnpm del entorno intentó reinstalar dependencias y se detuvo por falta de TTY; se ejecutaron directamente las herramientas ya instaladas, sin reinstalación.
- No existe script lint configurado; no se presenta como ejecutado.
- Pendientes: entrega real de email, widget Turnstile, HTTPS, CSP efectiva de producción, rate limiting, cookies/red en dominio real, accesibilidad integral, pruebas en dispositivos físicos. La inspección local no cubre scripts que una cuenta Cloudflare pueda inyectar.

## Fuentes oficiales consultadas

- [LSSI-CE, arts. 10, 21 y 22](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758).
- [RGPD, arts. 5, 6, 12–22, 28, 32 y 44 y siguientes](https://www.boe.es/doue/2016/119/L00001-00088.pdf).
- [LOPDGDD](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673).
- [Guía de cookies AEPD, mayo de 2024](https://www.aepd.es/guias/guia-cookies.pdf).
- [Modelo de cláusula informativa AEPD](https://www.aepd.es/guias/guia-modelo-clausula-informativa.pdf), marcado «en revisión»; no usado como certificación.
- [Ley 11/2023: accesibilidad de productos y servicios](https://www.boe.es/buscar/act.php?id=BOE-A-2023-11022). Determinar ámbito, servicio ofrecido y posibles excepciones con datos reales del negocio; no presumir exención ni conformidad WCAG.
- [Validación de Turnstile](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).


## Actualización posterior: identificación y autorización de push

El titular aportó nombre completo, NIF y domicilio, confirmó contactos y se identificó como profesional. Incorporados en `landing/src/public-identity.json`; comprobada letra de control del NIF, sin verificar identidad o alta. No existe dominio definitivo todavía. Se mantienen bloqueos de revisión y del envío. La situación profesional administrativa continúa pendiente. El usuario autorizó el push; se integra `landing/` en una rama del remoto existente, preservando la plantilla original. Los hallazgos anteriores describen el estado inicial de la auditoría.
