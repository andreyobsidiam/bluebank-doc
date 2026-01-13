---
title: "Base de Datos"
description: "Esquema de base de datos PostgreSQL con migraciones y Row Level Security"
order: 3
icon: "🗃️"
section: "api"
---

# 🗃️ Migraciones de Base de Datos

Las migraciones definen el esquema de la base de datos y se ejecutan en orden secuencial.

## Historial de Migraciones

| #   | Archivo                                   | Descripción                                                     |
| --- | ----------------------------------------- | --------------------------------------------------------------- |
| 1   | `0001_initial_schema.sql`                 | Esquema inicial: `admins`, `profiles`, `user_logs`, tipos y RLS |
| 2   | `0002_add_profiles_insert_policy.sql`     | Política de inserción para perfiles                             |
| 3   | `0003_create_beneficiaries_table.sql`     | Tabla de beneficiarios con RLS completo                         |
| 4   | `0004_create_countries_table.sql`         | Catálogo de países                                              |
| 5   | `0005_create_recharge_requests_table.sql` | Solicitudes de recarga de tarjetas                              |
| 6   | `0006_add_admin_policies_recharges.sql`   | Políticas de admin para recargas                                |
| 7   | `0007_fix_recharge_profiles_relation.sql` | Relación entre recargas y perfiles                              |

---

## 📊 Esquema de Base de Datos

### Tabla: `admins`

| Columna        | Tipo          | Descripción                 |
| -------------- | ------------- | --------------------------- |
| `id`           | `uuid` PK FK  | ID del usuario (auth.users) |
| `created_at`   | `timestamptz` | Fecha de creación           |
| `email`        | `text` UNIQUE | Email del administrador     |
| `name`         | `text`        | Nombre completo             |
| `phone_number` | `text`        | Número de teléfono          |

### Tabla: `profiles`

| Columna        | Tipo          | Descripción                 |
| -------------- | ------------- | --------------------------- |
| `id`           | `uuid` PK FK  | ID del usuario (auth.users) |
| `created_at`   | `timestamptz` | Fecha de creación           |
| `logon_id`     | `text`        | ID de login único           |
| `name`         | `text`        | Nombre completo             |
| `email`        | `text`        | Email                       |
| `phone_number` | `text`        | Teléfono                    |
| `is_banned`    | `boolean`     | Estado de baneo             |
| `banned_until` | `timestamptz` | Fecha hasta baneo           |

### Tabla: `user_logs`

| Columna       | Tipo               | Descripción                  |
| ------------- | ------------------ | ---------------------------- |
| `id`          | `bigint` PK        | ID auto-incremental          |
| `created_at`  | `timestamptz`      | Timestamp del evento         |
| `user_id`     | `uuid` FK          | Usuario que generó el evento |
| `event_type`  | `audit_event_type` | Tipo de evento               |
| `details`     | `jsonb`            | Detalles adicionales         |
| `device_info` | `jsonb`            | Información del dispositivo  |
| `ip_address`  | `inet`             | Dirección IP                 |

### Tabla: `beneficiaries`

| Columna          | Tipo      | Descripción                |
| ---------------- | --------- | -------------------------- |
| `id`             | `uuid` PK | ID del beneficiario        |
| `user_id`        | `uuid` FK | Propietario                |
| `name`           | `text`    | Nombre del beneficiario    |
| `nickname`       | `text`    | Alias                      |
| `type`           | `text`    | `bluePay` o `wireTransfer` |
| `account_number` | `text`    | Número de cuenta           |
| `bank_name`      | `text`    | Nombre del banco           |
| `swift_code`     | `text`    | Código SWIFT               |
| `address`        | `text`    | Dirección                  |
| `country`        | `text`    | País                       |
| `currency`       | `text`    | Moneda                     |
| `bank_address`   | `text`    | Dirección del banco        |
| `bank_code_type` | `text`    | Tipo de código bancario    |

### Tabla: `recharge_requests`

| Columna            | Tipo            | Descripción            |
| ------------------ | --------------- | ---------------------- |
| `id`               | `uuid` PK       | ID de la solicitud     |
| `created_at`       | `timestamptz`   | Fecha de creación      |
| `updated_at`       | `timestamptz`   | Última actualización   |
| `user_id`          | `uuid` FK       | Usuario solicitante    |
| `origin_account`   | `varchar(30)`   | Cuenta origen          |
| `destination_card` | `varchar(30)`   | Tarjeta destino        |
| `amount`           | `numeric(10,2)` | Monto                  |
| `status`           | `varchar(50)`   | Estado de la solicitud |
| `folio`            | `serial`        | Número de folio        |

---

## 🔒 Row Level Security (RLS)

Todas las tablas tienen RLS habilitado para garantizar la seguridad de los datos.

### Políticas Principales

| Tabla               | Política      | Descripción                                |
| ------------------- | ------------- | ------------------------------------------ |
| `profiles`          | SELECT/UPDATE | Usuarios solo ven/editan su propio perfil  |
| `admins`            | SELECT/UPDATE | Admins solo ven/editan su registro         |
| `user_logs`         | INSERT        | Usuario o service_role pueden insertar     |
| `user_logs`         | SELECT        | Todos pueden leer (para auditoría)         |
| `beneficiaries`     | ALL           | CRUD completo solo sobre propios registros |
| `recharge_requests` | ALL           | Usuarios solo acceden a sus solicitudes    |
