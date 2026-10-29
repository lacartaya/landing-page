# Flujo de datos personales

Fecha: 30-10-2026. Estado previsto y código revisado; servicios de producción sin activar/verificar.

1. **Visita:** navegador → alojamiento. IP, agente de usuario y metadatos pueden ser tratados por el hosting; configuración y conservación de logs pendientes. Fuentes, logo, foto y vídeo locales. Sin analítica de aplicación.
2. **Asistente:** respuestas → memoria de la pestaña. Negocio, situación digital, objetivo, necesidad, plazo, nombre, email; web/redes y teléfono/disponibilidad opcionales. Sin transcripción en backend, almacenamiento persistente ni modelo de IA. El visitante puede revisar, editar y borrar. Cerrar conserva; recargar borra.
3. **Revisión, si se habilita:** navegador → Cloudflare Turnstile. Señales técnicas para antiabuso; no se pasan las respuestas como argumentos al widget. Configuración y tratamiento contractual pendientes.
4. **Enviar a Luis:** navegador → `/api/contact` por POST del mismo origen. El servidor comprueba configuración legal antes de procesar el cuerpo. Validación de campos y token; servidor → Siteverify; si falla no se envía email.
5. **Email:** servidor → Resend → buzón Gmail de Luis, destinatario fijo `cartayala@gmail.com`. Resumen y correo de respuesta; sin HTML del visitante. Resend/Google pueden conservar mensajes y metadatos conforme a sus cuentas y políticas. No existe base de datos propia.
6. **Después:** Luis atiende consulta/propuesta y gestiona borrado/derechos. Debe fijar plazos operativos y obligaciones aplicables; no basta borrar el estado React.
7. **Canales alternativos:** clic en WhatsApp/LinkedIn lleva fuera del sitio; mailto abre el cliente de email. Estos canales tienen tratamiento propio que debe incorporarse al registro del titular. No hay calendario/CRM integrado.

## Finalidades y bases previstas

- Consulta/propuesta solicitada por potencial cliente: medidas precontractuales, art. 6.1.b RGPD.
- Interlocutor de una entidad: interés legítimo profesional, art. 6.1.f, sujeto a evaluación y oposición.
- Seguridad antiabuso: interés legítimo, documentando necesidad y proporcionalidad.
- Obligaciones y reclamaciones: concretar normas y periodos aplicables; no extender conservación indefinidamente.
- No se recaba autorización publicitaria ni se usa la consulta para suscribir al visitante.

## Minimización y operaciones pendientes

No solicitar datos de pacientes, clientes, contraseñas o categorías especiales. Confirmar que todos los campos obligatorios son necesarios. Configurar acceso mínimo y MFA en buzón/proveedores, responsables de derechos, calendario de revisión y borrado, gestión de incidencias, logs y copias. Revisar contratos de encargo, subencargados, transferencias y garantías antes de habilitar. No imprimir cargas del formulario en logs futuros.
