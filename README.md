# ARTI Guest · Hotel Almara (demo mock)

Portal digital del huésped, en modo **demo/mock**: no hay backend ni endpoints reales todavía. Todos los datos (estancia, menú, incidencias, spa, chat) se sirven desde servicios en memoria con latencia simulada (`delay()` de RxJS), pensados para sustituirse por llamadas HTTP reales sin tener que tocar los componentes.

## Stack

- Angular 17, standalone components (sin NgModules)
- SCSS, diseño propio (sin librerías de UI externas)
- PWA "de mentira": `manifest.webmanifest` + meta tags, sin service worker todavía

## Arrancar

```bash
npm install
npx ng serve
```

Abre `http://localhost:4200`, verás la pantalla de acceso (simulando escaneo de QR). Introduce cualquier número de habitación (ej. `315`) y cualquier apellido — el acceso siempre funciona, es un mock.

## Alcance de esta primera versión

Se ha priorizado el flujo comercial más demostrable en una reunión de 20 minutos:

- **Home** — tarjeta-llave digital con datos de la estancia + accesos rápidos + horarios del hotel.
- **Check-in online** — formulario de datos + confirmación.
- **Check-out** — resumen de factura simulada, solicitud de salida, valoración de la estancia.
- **Room Service** — carta por categorías, carrito, pedido con seguimiento de estado en tiempo simulado (recibido → en cocina → en camino → entregado).
- **Incidencias** — categorías tipo (aire acondicionado, TV, wifi...), descripción, foto simulada, seguimiento de estado (recibida → técnico asignado → resuelta).
- **Spa y actividades** — reserva de tratamientos/actividades con selección de hora y confirmación.
- **Asistente IA** — chat con respuestas simuladas por palabras clave (pensado para conectarse a Copilot/una base de conocimiento real más adelante).

Quedan fuera de esta versión (mencionados en el brief comercial, pendientes de una siguiente fase): llave digital, valoraciones públicas, información turística con mapa, transporte/taxi, notificaciones push reales, perfil editable del huésped, backoffice/dashboard del hotel y las integraciones con Dynamics 365 Customer Service / Field Service / Power BI.

## Dónde vive cada cosa mock

Todo lo "falso" está aislado en `core/services/*`, para que conectar el backend real sea sustituir el cuerpo de cada método sin tocar componentes ni plantillas:

- `hotel.service.ts` — configuración fija del hotel demo (nombre, colores lógicos, horarios).
- `guest.service.ts` — sesión del huésped y estancia, guardada en `sessionStorage`; simula `accessRoom`, `submitCheckin`, `requestCheckout`.
- `room-service-menu.service.ts` — carta y pedidos; `placeOrder` simula el avance de estado de un pedido con `setTimeout`.
- `incidents.service.ts` — categorías e incidencias; `create` simula la asignación técnica y resolución.
- `spa-activities.service.ts` — tratamientos/actividades y reservas.
- `chat.service.ts` — respuestas por coincidencia de palabras clave sobre una pequeña base de conocimiento hardcodeada.

## Diseño

Dirección visual "hotel boutique de 5 estrellas, digital": fondo cálido tipo papel, cabecera y navegación en tinta oscura (`--ink`), acento latón (`--brass`) para las llamadas a la acción, tipografía display *Fraunces* para títulos y *IBM Plex Mono* para datos tipo tarjeta-llave (número de habitación, horas, códigos de pedido/incidencia). El elemento distintivo es la **tarjeta-llave digital** del Home, que recuerda a una tarjeta de habitación física.

## Siguientes pasos sugeridos

1. Sustituir los servicios mock por llamadas HTTP reales contra el backend del hotel (probablemente reutilizando el patrón de interceptor + guard que ya usamos en el proyecto de reservas de restaurante).
2. Añadir el resto de módulos del brief comercial (llave digital, información turística, notificaciones push, perfil, backoffice).
3. Service worker real para que la PWA funcione offline y sea instalable de verdad.
4. Conectar el chat a Copilot Studio / una base de conocimiento real en lugar de las respuestas por palabra clave.
