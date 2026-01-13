---
title: "Edge Functions"
description: "Documentación de las Edge Functions serverless del backend BlueBank"
order: 2
icon: "⚡"
---

# ⚡ Edge Functions

Las Edge Functions son funciones serverless ejecutadas en el edge (Deno runtime). Procesan solicitudes HTTP y se comunican con la base de datos Supabase.

---

## 📁 `_shared/` - Código Compartido

| Archivo   | Descripción                                         |
| --------- | --------------------------------------------------- |
| `cors.ts` | Headers CORS reutilizables para todas las funciones |

```typescript
// Configuración CORS exportada
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
```

---

## 🔐 `auth_manager/` - Gestión de Autenticación

**Archivo principal:** `index.ts` (426 líneas)

Función central de autenticación que maneja login, creación de usuarios y sincronización.

### Acciones Disponibles

| Acción   | Descripción                                         | Campos Requeridos                    |
| -------- | --------------------------------------------------- | ------------------------------------ |
| `login`  | Autenticar usuario existente                        | `identifier`, `password`             |
| `create` | Crear nuevo usuario                                 | `identifier`, `logon_id`, `password` |
| `sync`   | Sincronizar usuario (crear o actualizar contraseña) | `identifier`, `logon_id`, `password` |

### Interfaces TypeScript

```typescript
interface AuthRequest {
  action: AuthAction; // "login" | "create" | "sync"
  identifier: string; // Email del usuario
  logon_id?: string; // ID de inicio de sesión único
  password: string; // Contraseña
  name?: string; // Nombre (opcional)
  phone_number?: string; // Teléfono (opcional)
}

interface AuthResponse {
  user: any; // Datos del usuario de Supabase Auth
  session?: any; // Sesión JWT
  user_profile: Profile; // Perfil del usuario
  message: string; // Mensaje de estado
}
```

### Códigos de Error

| Error                            | HTTP | Descripción            |
| -------------------------------- | ---- | ---------------------- |
| `action_must_be_login_or_create` | 400  | Acción inválida        |
| `identifier_is_required`         | 400  | Falta identificador    |
| `password_is_required`           | 400  | Falta contraseña       |
| `no_user_found`                  | 401  | Usuario no encontrado  |
| `invalid_login_credentials`      | 401  | Credenciales inválidas |
| `logon_id_already_exists`        | 409  | El logon_id ya existe  |

---

## 👥 `beneficiaries/` - Gestión de Beneficiarios

**Archivo principal:** `index.ts` (168 líneas)

API RESTful completa para gestionar beneficiarios de transferencias.

### Endpoints

| Método   | Descripción                      | Body/Params                       |
| -------- | -------------------------------- | --------------------------------- |
| `GET`    | Listar beneficiarios del usuario | -                                 |
| `POST`   | Crear nuevo beneficiario         | `Beneficiary` object              |
| `DELETE` | Eliminar beneficiario            | `?id=<uuid>` o `{ id: "<uuid>" }` |

### Interfaz de Beneficiario

```typescript
interface Beneficiary {
  id?: string; // UUID (auto-generado)
  name: string; // Nombre del beneficiario (requerido)
  nickname?: string; // Alias
  type: "bluePay" | "wireTransfer"; // Tipo de transferencia
  account_number: string; // Número de cuenta (requerido)
  // Campos para Wire Transfer:
  bank_name?: string; // Nombre del banco
  swift_code?: string; // Código SWIFT
  address?: string; // Dirección del beneficiario
  country?: string; // País
  currency?: string; // Moneda
  bank_address?: string; // Dirección del banco
  bank_code_type?: string; // Tipo de código bancario (ABA, IBAN, etc.)
}
```

---

## 🌍 `get-countries/` - Catálogo de Países

**Archivo principal:** `index.ts` (46 líneas)

Obtiene la lista de países disponibles desde la base de datos.

### Endpoint

| Método | Descripción             | Respuesta                            |
| ------ | ----------------------- | ------------------------------------ |
| `GET`  | Listar todos los países | Array de países ordenados por nombre |

---

## 📝 `log-event/` - Registro de Auditoría

**Archivo principal:** `index.ts` (88 líneas)

Sistema centralizado de logging para eventos de auditoría.

### Payload de Evento

```typescript
interface LogEventPayload {
  event_type: string; // Tipo de evento (ver enum audit_event_type)
  details?: Record<string, any>; // Detalles adicionales (JSON)
  device_info?: Record<string, any>; // Información del dispositivo (JSON)
}
```

### Tipos de Eventos Soportados

```sql
-- audit_event_type enum
'login_success', 'login_failure', 'logout', 'otp_verification',
'linked_account_add', 'profile_update', 'profile_photo_update',
'transaction_created', 'password_reset_success',
'open_checking_account', 'open_savings_account', 'open_blue_reserve_account',
'request_credit_card', 'request_debit_card',
'add_new_beneficiary', 'remove_beneficiary'
```

### Información Capturada Automáticamente

- `user_id`: ID del usuario autenticado
- `ip_address`: Dirección IP (desde header `x-forwarded-for`)
- `created_at`: Timestamp del evento

---

## 💳 `request-recharge/` - Recargas de Tarjetas Prepago

**Archivo principal:** `index.ts` (245 líneas)

Sistema completo para solicitudes de recarga de tarjetas prepago con panel de administración.

### Acciones Disponibles

| Acción                   | Rol     | Descripción                       |
| ------------------------ | ------- | --------------------------------- |
| `requestRecharge`        | Usuario | Solicitar nueva recarga           |
| `getRechargeHistory`     | Usuario | Ver historial de recargas propias |
| `getAllRechargeRequests` | Admin   | Ver todas las solicitudes         |
| `updateRechargeStatus`   | Admin   | Procesar/Rechazar solicitud       |

### Payload de Solicitud

```typescript
interface RechargeRequestPayload {
  action: Action;
  origin_account?: string; // Cuenta origen
  destination_card?: string; // Tarjeta destino
  amount?: number; // Monto a recargar
  id?: string; // ID de solicitud (para actualizar)
  status?: "PROCESSED" | "REJECTED"; // Nuevo estado
}
```

### Estados de Recarga

| Estado      | Descripción                          |
| ----------- | ------------------------------------ |
| `PENDING`   | Solicitud en espera de procesamiento |
| `PROCESSED` | Recarga aprobada y ejecutada         |
| `REJECTED`  | Solicitud rechazada                  |

---

## 📧 `send-otp/` - Envío de Códigos OTP

**Archivo principal:** `index.ts` (70 líneas)

Envío de códigos OTP (One-Time Password) por email usando MailerSend.

### Configuración Requerida

| Variable de Entorno  | Descripción           |
| -------------------- | --------------------- |
| `MAILERSEND_API_KEY` | API Key de MailerSend |
| `SENDER_EMAIL`       | Email del remitente   |

### Payload

```typescript
{
  email: string; // Email destino
  subject: string; // Asunto del correo
  template_id: string; // ID del template en MailerSend
}
```

### Respuesta

```typescript
{
  otp: string; // Código OTP de 6 dígitos generado
}
```

---

## 🛡️ `sumsub-proxy/` - Proxy para Verificación KYC

**Archivo principal:** `index.ts` (107 líneas)

Proxy seguro para la API de SumSub (verificación KYC/AML).

### Configuración Requerida

| Variable de Entorno   | Descripción                    |
| --------------------- | ------------------------------ |
| `SUMSUB_APP_TOKEN`    | Token de aplicación SumSub     |
| `SUMSUB_SECRET_TOKEN` | Token secreto para firmas HMAC |

### Funcionalidad

1. Recibe solicitud con `levelName` (nivel de verificación KYC)
2. Genera firma HMAC-SHA256 con timestamp
3. Solicita link de WebSDK a SumSub
4. Retorna URL para iniciar verificación KYC

### Flujo de Firma

```typescript
const dataToSign = `${timestamp}${method}${endpoint}${requestBody}`;
const signature = HMAC_SHA256(dataToSign, secretKey);
```
