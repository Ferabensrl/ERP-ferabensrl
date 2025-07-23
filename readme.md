# 📦 Feraben Inventory & Facturation App

Sistema PWA completo para gestión de inventario, armado de pedidos y exportación para facturación electrónica de Feraben SRL.

---

## 🏢 Contexto del Negocio

Feraben SRL es una empresa uruguaya que importa productos desde China y vende a mayoristas (supermercados, farmacias, boutiques). Esta aplicación tiene como objetivo optimizar el trabajo de depósito y administración conectando escáner de códigos, control de stock y generación de pedidos en un solo flujo.

---

## 🎯 Objetivo Principal

Crear una PWA (Progressive Web App) optimizada para celular que maneje todo el flujo desde recepción de pedidos por WhatsApp hasta exportación para facturación electrónica, priorizando la velocidad del operario de depósito.

---

## 🔄 Flujo de Trabajo Completo

### PASO 1: Recepción (Administración - PC)

- Recepción de pedido por WhatsApp con formato específico
- Conversor automático interpreta: cliente, códigos, variantes, cantidades
- Se crea pedido con estado `pendiente`

### PASO 2: Preparación (Depósito - Celular) ⭐ NÚCLEO

- Interfaz táctil tipo checklist inteligente
- Flujo: Tocar producto → Pop-up confirmación → Un toque para confirmar
- Estados visuales: Verde (completo), Rojo (sin stock), Gris (pendiente)

### PASO 3: Facturación (Administración - PC)

- Vista resumen con cantidades reales preparadas
- Aplicar descuentos si necesario
- Exportar Excel con formato exacto para importación al facturador electrónico

---

## 🧠 Reglas clave del sistema

- El pedido llega por WhatsApp con desglose por variantes (color, surtido, sinColor, C1–C10)
- El depósito debe ver ese desglose, pero el stock y la factura son por código general
- El sistema debe consolidar la cantidad total al exportar, sin incluir el detalle de color
- El código de barras debe aparecer en la columna `Descripción` del Excel

---

## 🛠️ Stack Tecnológico

- **Frontend:** React + TypeScript + Tailwind CSS
- **Base de datos:** Supabase (PostgreSQL)
- **Autenticación:** Supabase Auth
- **PWA:** Service Workers + Manifest
- **Escáner:** html5-qrcode (EAN-13)
- **Exportación Excel:** xlsx
- **UI:** Lucide React icons

---

## 📁 Estructura de carpetas

```
src/
├── api/           # Supabase client y funciones
├── components/    # Componentes reutilizables
├── context/       # React Context (PedidosContext, ProductosContext)
├── hooks/         # Hooks personalizados
├── modules/       # Módulos principales
│   ├── Dashboard/
│   ├── Pedidos/
│   │   ├── PedidosModule.tsx
│   │   ├── PedidoDetail.tsx
│   │   └── PedidoItem.tsx ⭐
│   ├── Scanner/
│   ├── WhatsApp/
│   └── Inventario/
└── App.tsx
```

---

## 📱 Módulos de la Aplicación

1. **Dashboard**
   - Estadísticas: pedidos pendientes, en preparación, stock bajo
2. **Inventario**
   - Lista de productos
   - Importación desde Excel
   - Control de stock
3. **Gestión de Pedidos**
   - Vista y edición por estados
   - PedidoDetail + PedidoItem (confirmación por toque)
4. **Escáner Móvil**
   - Agregar productos escaneando
   - Buscar por código de barras
5. **Conversor WhatsApp**
   - Analiza pedidos por mensaje
   - Reconoce variantes y cantidades
   - Consolida cantidades totales para stock y factura

---

## 📊 Base de Datos (Supabase)

### `productos`

```ts
id, codigo_producto, codigo_barras, descripcion, categoria,
stock, precio_venta, proveedor, activo, stock_valija
```

### `pedidos`

```ts
id, cliente, fecha, estado, comentario_final
```

### `pedido_items`

```ts
id, pedido_id, producto_id, cantidad_pedida, cantidad_preparada,
variantes_json, comentario
```

### `movimientos_stock`

```ts
id, producto_id, tipo ('entrada'|'salida'), cantidad, fecha,
pedido_id, usuario_id, observaciones
```

---

## 📤 Formato de exportación Excel

```
Codigo | Nombre | Cantidad | Precio un | % descuento | InfFact | Descripcion
H008   | Producto X | 24     | 120.00     | 0           | 3       | 7799888877766
```

- `% descuento`: Se agrega manualmente en facturación
- `InfFact`: siempre es `3`
- `Descripcion`: debe ser el código de barras del producto

---

## 🔐 Roles de Usuario

- **Admin**: Acceso total (Fernando)
- **Depósito**: Ver inventario + preparar pedidos
- **Facturación**: Descargar Excel + aplicar descuentos

---

## 🚀 Plan de implementación

### Fase 1: Fundación

- Reestructurar carpetas y React Context
- Crear PedidoItem con pop-up táctil
- Diseño móvil-first

### Fase 2: Integración

- Conexión real con Supabase
- Escáner de códigos (html5-qrcode)
- Service workers y manifest

### Fase 3: Optimización

- Exportador Excel final
- Gestión de usuarios
- Reportes y analytics
- Testing y despliegue final

---

## 🧩 Próximos pasos para Codex u otro desarrollador

1. Leer y respetar toda la lógica del presente README
2. Crear carpeta `public/` para alojar logo si es necesario
3. Usar los archivos `productos.xlsx` y `formato_factura.xlsx` si se encuentran en el repositorio para generar la base de datos
4. Crear la app como PWA desde cero siguiendo esta estructura

---

**Feraben SRL - Sistema modular, claro y adaptable. ¡Listo para construir!**

