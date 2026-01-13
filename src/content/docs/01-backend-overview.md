---
title: "Backend Overview"
description: "Documentación completa del backend de BlueBank International construido sobre Supabase"
order: 1
icon: "🏦"
---

# 🏦 BlueBank International

## Backend de Servicios Financieros

Backend completo para la plataforma bancaria BlueBank construido sobre Supabase con Edge Functions en TypeScript/Deno, migraciones PostgreSQL, y scripts de automatización.

| Información                 | Detalle                   |
| :-------------------------- | :------------------------ |
| 📅 **Última Actualización** | Enero 2026                |
| 👥 **Equipo**               | BlueBank Development Team |
| 🌐 **Ambiente**             | Producción / Desarrollo   |
| 📧 **Contacto**             | dev@bluebank.com          |

---

## 📁 Estructura del Proyecto

```
SUPABASE_BLUEBANK/
├── 📂 db/                          # Respaldos de base de datos
├── 📂 doc/                         # Documentación técnica
├── 📂 scripts/                     # Scripts de automatización y despliegue
├── 📂 supabase/                    # Núcleo de Supabase
│   ├── 📂 functions/               # Edge Functions (API serverless)
│   └── 📂 migrations/              # Migraciones de base de datos
├── 📄 .env.local                   # Variables de entorno (desarrollo)
├── 📄 .env.production              # Variables de entorno (producción)
├── 📄 package.json                 # Dependencias del proyecto
└── 📄 README.md                    # Este archivo
```

---

## 📂 Detalle de Carpetas y Archivos

### 🗄️ `/db` - Respaldos de Base de Datos

| Archivo          | Descripción                                                   |
| ---------------- | ------------------------------------------------------------- |
| `current_db.sql` | Esquema SQL actual de la base de datos para referencia rápida |

### 📖 `/doc` - Documentación Técnica

| Archivo                    | Descripción                                                 |
| -------------------------- | ----------------------------------------------------------- |
| `auth-manager-function.md` | Documentación detallada de la función de autenticación      |
| `flutter-integration.md`   | Guía de integración con la aplicación Flutter               |
| `profile-creation-fix.md`  | Documentación sobre correcciones en la creación de perfiles |

### 🔧 `/scripts` - Scripts de Automatización

| Script                    | Descripción                                   | Uso                                     |
| ------------------------- | --------------------------------------------- | --------------------------------------- |
| `auth.sh`                 | Autenticación con Supabase CLI                | `./scripts/auth.sh`                     |
| `deploy_all_functions.sh` | Despliegue masivo de todas las Edge Functions | `./scripts/deploy_all_functions.sh`     |
| `deploy_function.sh`      | Despliegue de una función específica          | `./scripts/deploy_function.sh <nombre>` |
| `init_environment.sh`     | Inicialización del entorno de desarrollo      | `./scripts/init_environment.sh`         |
| `migration_repair.sh`     | Reparación de migraciones fallidas            | `./scripts/migration_repair.sh`         |
| `push_db.sh`              | Push de cambios a la base de datos remota     | `./scripts/push_db.sh`                  |
| `unban_ips.sh`            | Desbloqueo de IPs baneadas por rate limiting  | `./scripts/unban_ips.sh`                |
