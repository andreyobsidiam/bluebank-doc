---
title: "Configuración y Comandos"
description: "Variables de entorno, comandos de desarrollo y arquitectura del sistema"
order: 4
icon: "⚙️"
section: "api"
---

# ⚙️ Configuración

## Variables de Entorno Requeridas

```bash
# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# MailerSend (para OTP)
MAILERSEND_API_KEY=mlsn.xxx
SENDER_EMAIL=noreply@bluebank.com

# SumSub (para KYC)
SUMSUB_APP_TOKEN=sbx:xxx
SUMSUB_SECRET_TOKEN=xxx

# Proyecto
PROJECT_REF=pteefblczredmbefsjyw
```

---

## 🚀 Comandos de Desarrollo

```bash
# Iniciar Supabase localmente
supabase start

# Aplicar migraciones
supabase db push

# Servir funciones localmente
supabase functions serve

# Desplegar una función
supabase functions deploy <nombre-funcion>

# Desplegar todas las funciones
./scripts/deploy_all_functions.sh

# Ver logs de funciones
supabase functions logs <nombre-funcion>
```

---

## 📦 Dependencias

```json
{
  "@supabase/supabase-js": "^2.39.0"
}
```

---

## 🏗️ Arquitectura

El sistema está diseñado con una arquitectura modular:

### Componentes Principales

| Componente         | Tecnología        | Función                        |
| ------------------ | ----------------- | ------------------------------ |
| **Edge Functions** | Deno / TypeScript | API serverless                 |
| **Base de Datos**  | PostgreSQL        | Almacenamiento persistente     |
| **Autenticación**  | Supabase Auth     | Gestión de usuarios y sesiones |
| **Storage**        | Supabase Storage  | Archivos y media               |
| **Email**          | MailerSend        | Envío de OTPs y notificaciones |
| **KYC**            | SumSub            | Verificación de identidad      |

### Flujo de Datos

```
Cliente (Flutter/Admin)
    ↓
Edge Functions (Deno)
    ↓
PostgreSQL + Auth + Storage
    ↓
Servicios Externos (MailerSend, SumSub)
```

### Seguridad

- **Row Level Security (RLS)**: Políticas a nivel de base de datos
- **JWT Tokens**: Autenticación stateless
- **CORS**: Control de origen cruzado
- **Service Role**: Operaciones privilegiadas aisladas

---

## 📄 Licencia

© 2026 Blue Bank International. Todos los derechos reservados.
