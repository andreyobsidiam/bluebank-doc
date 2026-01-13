---
title: "Web Components"
description: "Componentes del panel de administración: tablas, modales y formularios"
order: 2
icon: "🧱"
section: "web"
---

# 🧱 Componentes Web

Componentes React del panel de administración Blue Bank.

---

## Componentes Admin

| Componente           | Descripción                                 |
| -------------------- | ------------------------------------------- |
| `Home.tsx`           | Dashboard principal con estadísticas        |
| `UsersTable.tsx`     | Tabla de usuarios con paginación y acciones |
| `UserLogs.tsx`       | Historial de actividad de un usuario        |
| `RechargesTable.tsx` | Tabla de solicitudes de recarga             |
| `Header.tsx`         | Cabecera con navegación                     |

---

## Modales

### Gestión de Usuarios

| Modal                    | Descripción                                 |
| ------------------------ | ------------------------------------------- |
| `EditUserModal.tsx`      | Editar información del perfil               |
| `BanUserModal.tsx`       | Bannear usuario con duración personalizable |
| `UnbanUserModal.tsx`     | Remover ban de un usuario                   |
| `DeleteAccountModal.tsx` | Confirmación de eliminación de cuenta       |

### Gestión de Recargas

| Modal                      | Descripción                   |
| -------------------------- | ----------------------------- |
| `ProcessRechargeModal.tsx` | Aprobar solicitud de recarga  |
| `RejectRechargeModal.tsx`  | Rechazar solicitud de recarga |

---

## UsersTable

Tabla principal de gestión de usuarios con:

- **Paginación:** Navegación entre páginas de resultados
- **Ordenamiento:** Por nombre, email, fecha de registro
- **Filtros:** Por estado de ban
- **Acciones:** Editar, bannear, desbanear, eliminar

### Columnas

| Columna  | Descripción                     |
| -------- | ------------------------------- |
| ID       | Identificador único del usuario |
| Nombre   | Nombre completo                 |
| Email    | Correo electrónico              |
| Teléfono | Número de contacto              |
| Estado   | Activo/Banneado                 |
| Acciones | Botones de gestión              |

---

## UserLogs

Visualización del historial de actividad:

- **Tipos de evento:** Login, logout, transferencias, cambios de perfil
- **Información del dispositivo:** JSON formateado y colapsable
- **Detalles:** Datos adicionales del evento
- **IP:** Dirección IP del evento
- **Fecha:** Timestamp del evento

---

## RechargesTable

Gestión de solicitudes de recarga de tarjetas prepago:

### Columnas

| Columna         | Descripción                  |
| --------------- | ---------------------------- |
| Folio           | Número de referencia         |
| Usuario         | Nombre del solicitante       |
| Cuenta Origen   | Cuenta de débito             |
| Tarjeta Destino | Tarjeta a recargar           |
| Monto           | Cantidad solicitada          |
| Estado          | PENDING, PROCESSED, REJECTED |
| Fecha           | Fecha de solicitud           |
| Acciones        | Aprobar/Rechazar             |

### Estados

| Estado      | Descripción                  |
| ----------- | ---------------------------- |
| `PENDING`   | En espera de procesamiento   |
| `PROCESSED` | Recarga aprobada y ejecutada |
| `REJECTED`  | Solicitud rechazada          |
