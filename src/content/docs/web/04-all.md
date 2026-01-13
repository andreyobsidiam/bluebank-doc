---
title: "Documentación Completa"
description: "Documentación técnica completa de Blue Bank Web Admin"
order: 4
icon: "📚"
section: "web"
---

# 🏦 BlueBank Admin Panel

<div align="center">

![BlueBank Logo](public/logo_blue.png)

**Panel de administración moderno para la gestión integral de BlueBank**

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.90-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Estructura de Directorios](#-estructura-de-directorios)
- [Getting Started](#-getting-started)
- [Features](#-features)
  - [Dashboard](#dashboard)
  - [Gestión de Usuarios](#gestión-de-usuarios)
  - [Logs de Usuarios](#logs-de-usuarios)
  - [Recargas de Tarjetas Prepago](#recargas-de-tarjetas-prepago)
  - [Internacionalización](#internacionalización)
  - [Autenticación](#autenticación)
  - [Configuraciones](#configuraciones)
- [Esquemas de Base de Datos](#-esquemas-de-base-de-datos)
- [Scripts Disponibles](#-scripts-disponibles)
- [Documentación Adicional](#-documentación-adicional)

---

## 🎯 Descripción General

BlueBank Admin es un panel de administración completo desarrollado con **Next.js 16** y **React 19** que permite gestionar todos los aspectos de la plataforma BlueBank. Proporciona herramientas para administrar usuarios, monitorear actividades, procesar solicitudes de recarga de tarjetas prepago y visualizar estadísticas del sistema.

### Características Principales

- ✅ **Dashboard interactivo** con métricas en tiempo real
- ✅ **Gestión completa de usuarios** (CRUD, ban/unban, eliminación)
- ✅ **Logs de auditoría** detallados por usuario
- ✅ **Sistema de recargas** de tarjetas prepago
- ✅ **Internacionalización** completa (Español/Inglés)
- ✅ **Autenticación segura** con roles de administrador
- ✅ **Diseño responsive** optimizado para dispositivos móviles

---

## 🛠 Stack Tecnológico

### Frontend

| Tecnología          | Versión | Descripción                                 |
| ------------------- | ------- | ------------------------------------------- |
| **Next.js**         | 16.1.1  | Framework React con App Router y Turbopack  |
| **React**           | 19.2.3  | Librería UI con las últimas características |
| **TypeScript**      | 5.x     | Tipado estático para JavaScript             |
| **TailwindCSS**     | 4.x     | Framework CSS utility-first                 |
| **Lucide React**    | 0.562.0 | Iconos modernos                             |
| **Recharts**        | 3.6.0   | Gráficos interactivos                       |
| **React Paginate**  | 8.3.0   | Paginación de tablas                        |
| **React Hot Toast** | 2.6.0   | Notificaciones toast                        |

### Backend & Data

| Tecnología               | Versión | Descripción                                            |
| ------------------------ | ------- | ------------------------------------------------------ |
| **Supabase JS**          | 2.90.1  | Cliente para Supabase (Auth, Database, Edge Functions) |
| **TanStack React Query** | 5.90.16 | Gestión de estado del servidor y caché                 |

### Internacionalización

| Tecnología    | Versión | Descripción                       |
| ------------- | ------- | --------------------------------- |
| **next-intl** | 4.7.0   | Internacionalización para Next.js |

### Herramientas de Desarrollo

| Tecnología               | Versión | Descripción                       |
| ------------------------ | ------- | --------------------------------- |
| **ESLint**               | 9.x     | Linter para JavaScript/TypeScript |
| **@tailwindcss/postcss** | 4.x     | Procesador PostCSS para Tailwind  |

---

## 🏗 Arquitectura del Proyecto

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTE (Browser)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────┐ │
│  │   Next.js App   │    │   React Query   │    │  next-intl  │ │
│  │   Router (16)   │    │   (Cache/State) │    │   (i18n)    │ │
│  └────────┬────────┘    └────────┬────────┘    └──────┬──────┘ │
│           │                      │                     │        │
│  ┌────────▼──────────────────────▼─────────────────────▼──────┐ │
│  │                     COMPONENTS                              │ │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌──────────┐│ │
│  │  │   Admin   │  │   Auth    │  │  Charts   │  │    UI    ││ │
│  │  │Components │  │Components │  │Components │  │Components││ │
│  │  └───────────┘  └───────────┘  └───────────┘  └──────────┘│ │
│  └─────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│  ┌───────────────────────────▼─────────────────────────────────┐ │
│  │                        HOOKS                                 │ │
│  │  useAuth │ useProfiles │ useRecharges │ useUserLogs │ etc.  │ │
│  └───────────────────────────┬─────────────────────────────────┘ │
│                              │                                   │
└──────────────────────────────┼───────────────────────────────────┘
                               │
┌──────────────────────────────▼───────────────────────────────────┐
│                          SUPABASE                                │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────────────┐│
│  │   Auth API    │  │   Database    │  │   Edge Functions      ││
│  │  (Admin Auth) │  │  (PostgreSQL) │  │  (request-recharge)   ││
│  └───────────────┘  └───────────────┘  └───────────────────────┘│
└──────────────────────────────────────────────────────────────────┘
```

### Patrones de Arquitectura

- **App Router (Next.js 16)**: Utiliza el nuevo sistema de rutas basado en directorios con soporte para Server Components
- **Feature-based Structure**: Componentes organizados por dominio (admin, auth, charts, ui)
- **Custom Hooks**: Lógica de negocio encapsulada en hooks reutilizables
- **React Query**: Gestión de estado del servidor con caché automático
- **Middleware Chain**: Middleware combinado para i18n y protección de rutas

---

## 📁 Estructura de Directorios

```
bluebank_admin/
├── 📄 package.json              # Dependencias y scripts
├── 📄 next.config.ts            # Configuración de Next.js con next-intl
├── 📄 tsconfig.json             # Configuración de TypeScript
├── 📄 eslint.config.mjs         # Configuración de ESLint
├── 📄 postcss.config.mjs        # Configuración de PostCSS
├── 📁 .vscode/                  # Configuración del editor
├── 📁 docs/                     # Documentación adicional
│   ├── admin-permissions-fix.md
│   ├── ban-system-implementation.md
│   └── create-admin-user.md
├── 📁 messages/                 # Archivos de traducción (i18n)
│   ├── en.json                  # Traducciones en Inglés
│   └── es.json                  # Traducciones en Español
├── 📁 public/                   # Archivos estáticos
│   ├── logo_blue.png            # Logo de BlueBank
│   ├── favicon.ico              # Ícono del sitio
│   └── *.svg                    # Íconos SVG
├── 📁 scripts/                  # Scripts de utilidad
│   ├── create-admin.js          # Script para crear usuarios admin
│   └── db/                      # Scripts de base de datos
└── 📁 src/                      # Código fuente principal
    ├── 📄 middleware.ts         # Middleware de i18n y protección de rutas
    ├── 📁 app/                  # App Router de Next.js
    │   ├── globals.css          # Estilos globales y variables CSS
    │   ├── favicon.ico
    │   └── [locale]/            # Rutas con soporte i18n
    │       ├── layout.tsx       # Layout principal con providers
    │       ├── page.tsx         # Página principal (Dashboard)
    │       ├── auth/            # Páginas de autenticación
    │       │   ├── page.tsx     # Login
    │       │   └── reset-password/
    │       ├── recharges/       # Gestión de recargas
    │       │   └── page.tsx
    │       ├── settings/        # Configuraciones
    │       │   └── page.tsx
    │       └── users/           # Gestión de usuarios
    │           ├── page.tsx
    │           └── [userId]/    # Detalle de usuario
    │               └── logs/    # Logs de usuario
    ├── 📁 components/           # Componentes React
    │   ├── admin/               # Componentes del panel admin
    │   │   ├── Header.tsx
    │   │   ├── Home.tsx         # Dashboard principal
    │   │   ├── Users.tsx        # Vista de usuarios
    │   │   ├── UsersTable.tsx   # Tabla de usuarios
    │   │   ├── UserLogs.tsx     # Visualizador de logs
    │   │   ├── Recharges.tsx    # Vista de recargas
    │   │   ├── RechargesTable.tsx
    │   │   ├── EditUserModal.tsx
    │   │   ├── BanUserModal.tsx
    │   │   ├── UnbanUserModal.tsx
    │   │   ├── DeleteAccountModal.tsx
    │   │   ├── ProcessRechargeModal.tsx
    │   │   └── RejectRechargeModal.tsx
    │   ├── auth/                # Componentes de autenticación
    │   │   ├── SignInForm.tsx
    │   │   ├── SignUpForm.tsx
    │   │   ├── ForgotPasswordForm.tsx
    │   │   └── ProtectedRoute.tsx
    │   ├── charts/              # Componentes de gráficos
    │   │   └── UsersChart.tsx   # Gráfico de usuarios por mes
    │   ├── layout/              # Componentes de layout
    │   │   └── Sidebar.tsx
    │   └── ui/                  # Componentes UI reutilizables
    │       ├── Button.tsx
    │       └── Input.tsx
    ├── 📁 hooks/                # Custom Hooks
    │   ├── useAuth.ts           # Autenticación y sesión
    │   ├── useProfiles.ts       # Gestión de perfiles
    │   ├── useRecharges.ts      # Gestión de recargas
    │   ├── useUserLogs.ts       # Logs de usuario
    │   ├── useUserActions.ts    # Acciones de usuario (ban, delete, etc.)
    │   ├── useBanUserModal.ts
    │   ├── useUnbanUserModal.ts
    │   └── useEditUserModal.ts
    ├── 📁 i18n/                 # Configuración de internacionalización
    │   ├── routing.ts           # Definición de locales (en, es)
    │   ├── request.ts           # Configuración del request
    │   └── navigation.ts        # Navegación con i18n
    ├── 📁 lib/                  # Librerías y utilidades
    │   ├── providers/           # React Context Providers
    │   │   ├── QueryProvider.tsx
    │   │   └── AuthProvider.tsx
    │   └── supabase/            # Cliente y utilidades de Supabase
    │       ├── client.ts        # Cliente de Supabase
    │       ├── admin-client.ts  # Cliente con permisos de admin
    │       ├── admin-utils.ts   # Utilidades de administrador
    │       ├── debug.ts         # Utilidades de depuración
    │       ├── create-test-admin.ts
    │       ├── api/             # Funciones de API
    │       │   ├── profiles.ts  # API de perfiles
    │       │   ├── recharges.ts # API de recargas
    │       │   └── user-logs.ts # API de logs
    │       └── schemes/         # Esquemas SQL
    │           ├── profiles.sql
    │           ├── admins.sql
    │           ├── user_logs.sql
    │           ├── add_ban_columns.sql
    │           └── auth_trigger.sql
    └── 📁 types/                # Definiciones de tipos TypeScript
        └── user.ts              # Tipos de usuario y eventos de auditoría
```

---

## 🚀 Getting Started

### Prerrequisitos

- **Node.js** 18.x o superior
- **npm** 9.x o superior (o yarn/pnpm/bun)
- Cuenta de **Supabase** con proyecto configurado

### Instalación

1. **Clonar el repositorio**

```bash
git clone <repository-url>
cd bluebank_admin
```

2. **Instalar dependencias**

```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Configurar variables de entorno**

Crear un archivo `.env.local` en la raíz del proyecto:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Supabase Service Role (para operaciones admin)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

4. **Ejecutar en desarrollo**

```bash
npm run dev
```

El servidor se iniciará en [http://localhost:3000](http://localhost:3000) usando **Turbopack** para desarrollo rápido.

### Scripts Disponibles

| Comando         | Descripción                                    |
| --------------- | ---------------------------------------------- |
| `npm run dev`   | Inicia el servidor de desarrollo con Turbopack |
| `npm run build` | Genera la build de producción                  |
| `npm run start` | Inicia el servidor de producción               |
| `npm run lint`  | Ejecuta ESLint para verificar el código        |

---

## 📦 Features

### Dashboard

El Dashboard principal (`/`) proporciona una vista general del sistema con:

**Estadísticas en Tiempo Real:**

- **Total de Usuarios**: Número total de usuarios registrados
- **Usuarios Este Mes**: Nuevos registros del mes actual
- **Crecimiento**: Porcentaje de crecimiento comparado con el mes anterior

**Gráfico de Usuarios:**

- Visualización mensual de registros usando **Recharts**
- Datos agrupados por mes con barras interactivas

**Componentes Involucrados:**

- `src/components/admin/Home.tsx`
- `src/components/charts/UsersChart.tsx`
- `src/hooks/useProfiles.ts`

---

### Gestión de Usuarios

La sección de usuarios (`/users`) permite administrar todos los usuarios de BlueBank:

**Funcionalidades:**

| Acción                | Descripción                                                   |
| --------------------- | ------------------------------------------------------------- |
| **Ver Usuarios**      | Lista paginada con información de contacto y estado           |
| **Editar Usuario**    | Modificar nombre, email y teléfono                            |
| **Banear Usuario**    | Suspender acceso temporalmente (1 día, 3 días, 7 días, 1 mes) |
| **Desbanear Usuario** | Restaurar acceso de usuario baneado                           |
| **Eliminar Usuario**  | Eliminación permanente del usuario y sus datos                |
| **Ver Logs**          | Acceder al historial de actividad del usuario                 |

**Estados de Usuario:**

- 🟢 **Activo**: Usuario con acceso normal
- 🔴 **Baneado**: Usuario suspendido temporalmente (muestra fecha de expiración)

**Tabla de Usuarios:**

- Paginación con 10 usuarios por página
- Información mostrada: Avatar, Nombre, Email, Teléfono, Estado, Fecha de registro
- Acciones contextuales por usuario

**Componentes Involucrados:**

- `src/components/admin/Users.tsx`
- `src/components/admin/UsersTable.tsx`
- `src/components/admin/EditUserModal.tsx`
- `src/components/admin/BanUserModal.tsx`
- `src/components/admin/UnbanUserModal.tsx`
- `src/components/admin/DeleteAccountModal.tsx`
- `src/hooks/useProfiles.ts`
- `src/hooks/useUserActions.ts`
- `src/lib/supabase/api/profiles.ts`

**API de Perfiles (`profiles.ts`):**

```typescript
interface UserProfile {
  id: string;
  created_at: string;
  logon_id: string | null;
  name: string | null;
  email: string | null;
  phone_number: string | null;
  is_banned?: boolean;
  banned_until?: string | null;
}

// Funciones disponibles:
getProfiles(): Promise<UserProfile[]>
getProfile(userId: string): Promise<UserProfile>
updateUser(userId: string, updates: UpdateUserProfile): Promise<UserProfile>
banUser(userId: string, duration?: number): Promise<void>
unbanUser(userId: string): Promise<void>
deleteUser(userId: string): Promise<void>
```

---

### Logs de Usuarios

El sistema de logs (`/users/[userId]/logs`) permite auditar todas las actividades de cada usuario:

**Tipos de Eventos Auditados:**

| Evento                      | Descripción                     | Ícono |
| --------------------------- | ------------------------------- | ----- |
| `login_success`             | Inicio de sesión exitoso        | 🔓    |
| `login_failure`             | Intento de login fallido        | 🔒    |
| `logout`                    | Cierre de sesión                | 🚪    |
| `otp_verification`          | Verificación de código OTP      | 📱    |
| `profile_update`            | Actualización de perfil         | ✏️    |
| `profile_photo_update`      | Cambio de foto de perfil        | 📷    |
| `transaction_created`       | Transacción creada              | 💸    |
| `password_reset_success`    | Restablecimiento de contraseña  | 🔑    |
| `open_checking_account`     | Apertura de cuenta corriente    | 📄    |
| `open_savings_account`      | Apertura de cuenta de ahorro    | 📄    |
| `open_blue_reserve_account` | Apertura de cuenta Blue Reserve | 🛡️    |
| `request_credit_card`       | Solicitud de tarjeta de crédito | 💳    |
| `request_debit_card`        | Solicitud de tarjeta de débito  | 💳    |
| `add_new_beneficiary`       | Agregado de beneficiario        | 👤    |
| `remove_beneficiary`        | Eliminación de beneficiario     | 👤    |

**Información del Log:**

- **Evento**: Tipo de actividad con ícono y color distintivo
- **Fecha y Hora**: Timestamp del evento
- **Dirección IP**: IP desde donde se realizó la acción
- **Dispositivo**: Información del dispositivo (modelo, OS, versión)
- **Detalles**: JSON expandible con información adicional

**Componentes Involucrados:**

- `src/components/admin/UserLogs.tsx`
- `src/hooks/useUserLogs.ts`
- `src/lib/supabase/api/user-logs.ts`
- `src/types/user.ts`

**Estructura de Log:**

```typescript
interface UserLog {
  id: string;
  user_id: string;
  event_type: AuditEventType;
  details: Record<string, any> | null;
  device_info: Record<string, any> | null;
  ip_address: string | null;
  created_at: string;
}
```

---

### Recargas de Tarjetas Prepago

La sección de recargas (`/recharges`) permite gestionar las solicitudes de recarga de tarjetas prepago:

**Flujo de Recargas:**

```
Usuario solicita recarga → Estado: PENDING → Admin revisa
                                           ↓
                                    ┌──────────────┐
                                    │   Procesar   │ → Estado: PROCESSED
                                    └──────────────┘
                                    ┌──────────────┐
                                    │   Rechazar   │ → Estado: REJECTED
                                    └──────────────┘
```

**Estados de Solicitud:**

- 🟡 **PENDING**: Pendiente de revisión
- 🟢 **PROCESSED**: Recarga procesada exitosamente
- 🔴 **REJECTED**: Solicitud rechazada

**Información de Recarga:**

- **Folio**: Número único de identificación
- **Usuario**: Nombre y email del solicitante
- **Cuenta Origen**: Cuenta de donde se toman los fondos
- **Tarjeta Destino**: Tarjeta prepago a recargar
- **Monto**: Cantidad a recargar (USD)
- **Estado**: Estado actual de la solicitud
- **Fecha**: Fecha de creación de la solicitud

**Acciones Disponibles:**

- **Procesar**: Aprobar y ejecutar la recarga
- **Rechazar**: Denegar la solicitud de recarga

**Componentes Involucrados:**

- `src/components/admin/Recharges.tsx`
- `src/components/admin/RechargesTable.tsx`
- `src/components/admin/ProcessRechargeModal.tsx`
- `src/components/admin/RejectRechargeModal.tsx`
- `src/hooks/useRecharges.ts`
- `src/lib/supabase/api/recharges.ts`

**API de Recargas:**

```typescript
interface RechargeRequest {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  origin_account: string;
  destination_card: string;
  amount: number;
  status: 'PENDING' | 'PROCESSED' | 'REJECTED';
  folio: number;
  profiles?: {
    name: string | null;
    email: string | null;
  };
}

// Funciones (via Edge Functions):
getRechargeRequests(): Promise<RechargeRequest[]>
updateRechargeStatus(id: string, status: 'PROCESSED' | 'REJECTED'): Promise<RechargeRequest>
```

---

### Internacionalización

El sistema soporta múltiples idiomas gracias a **next-intl**:

**Idiomas Soportados:**

- 🇺🇸 **Inglés** (`en`) - Idioma por defecto
- 🇪🇸 **Español** (`es`)

**Configuración de Rutas:**

```
/en/           → Dashboard en Inglés
/es/           → Dashboard en Español
/en/users      → Usuarios en Inglés
/es/users      → Usuarios en Español
/en/recharges  → Recargas en Inglés
/es/recharges  → Recargas en Español
```

**Archivos de Traducción:**

- `messages/en.json` - Traducciones en Inglés (~275 claves)
- `messages/es.json` - Traducciones en Español (~275 claves)

**Secciones Traducidas:**

- Sidebar y navegación
- Formularios de autenticación
- Tablas de usuarios y recargas
- Modales de acciones
- Mensajes de error y éxito
- Gráficos y estadísticas
- Configuraciones

**Implementación:**

```typescript
// En componentes
import { useTranslations } from "next-intl";

const Component = () => {
  const t = useTranslations("Users");
  return <h1>{t("title")}</h1>;
};
```

**Archivos de Configuración:**

- `src/i18n/routing.ts` - Definición de locales
- `src/i18n/request.ts` - Configuración del request
- `src/i18n/navigation.ts` - Navegación i18n
- `src/middleware.ts` - Middleware de internacionalización

---

### Autenticación

El sistema de autenticación está construido sobre **Supabase Auth** con verificación de rol de administrador:

**Flujo de Autenticación:**

```
Usuario ingresa credenciales
         ↓
   Supabase Auth verifica
         ↓
   ¿Existe en tabla 'admins'?
         ↓
    SI → Acceso concedido
    NO → Sesión cerrada + Mensaje de error
```

**Funcionalidades:**

- **Login**: Autenticación con email y contraseña
- **Registro**: Creación de cuenta (requiere asignación de rol admin)
- **Recuperar Contraseña**: Reset via email
- **Logout**: Cierre de sesión seguro
- **Protección de Rutas**: Middleware y componente `ProtectedRoute`

**Verificación de Admin:**

```typescript
// Solo usuarios en la tabla 'admins' pueden acceder
const checkAdminStatus = async (userId: string): Promise<boolean> => {
  const { data: adminData } = await supabase
    .from("admins")
    .select("id")
    .eq("id", userId)
    .single();

  return !!adminData;
};
```

**Componentes Involucrados:**

- `src/components/auth/SignInForm.tsx`
- `src/components/auth/SignUpForm.tsx`
- `src/components/auth/ForgotPasswordForm.tsx`
- `src/components/auth/ProtectedRoute.tsx`
- `src/hooks/useAuth.ts`
- `src/lib/providers/AuthProvider.tsx`

**Hook useAuth:**

```typescript
const {
  // Estado
  user,
  session,
  isAuthenticated,
  isAdmin,
  isLoading,

  // Acciones
  signIn,
  signUp,
  signOut,
  resetPassword,

  // Estados de mutación
  isSigningIn,
  isSigningUp,
  isSigningOut,
  isResettingPassword,

  // Errores
  signInError,
  signUpError,
  signOutError,
  resetPasswordError,
} = useAuth();
```

---

### Configuraciones

La página de configuraciones (`/settings`) permite personalizar la experiencia del usuario:

**Opciones Disponibles:**

- **Idioma**: Cambiar entre Inglés y Español
- **Información de Versión**: Ver versión actual de la aplicación

**Componente:**

- `src/app/[locale]/settings/page.tsx`

---

## 🗄 Esquemas de Base de Datos

### Tabla `profiles`

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  logon_id TEXT,
  name TEXT,
  email TEXT,
  phone_number TEXT,
  is_banned BOOLEAN DEFAULT FALSE,
  banned_until TIMESTAMPTZ
);
```

### Tabla `admins`

```sql
CREATE TABLE admins (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Tabla `user_logs`

```sql
CREATE TABLE user_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  event_type TEXT NOT NULL,
  details JSONB,
  device_info JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Tabla `recharge_requests`

```sql
CREATE TABLE recharge_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES profiles(id),
  origin_account TEXT NOT NULL,
  destination_card TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'PENDING',
  folio SERIAL
);
```

---

## 📚 Scripts Disponibles

### `npm run dev`

Inicia el servidor de desarrollo con **Turbopack** para recargas rápidas.

### `npm run build`

Genera la build optimizada para producción.

### `npm run start`

Inicia el servidor de producción.

### `npm run lint`

Ejecuta ESLint para verificar errores y estilo de código.

### Script de Admin (`scripts/create-admin.js`)

Crea un usuario administrador en el sistema.

---

## 📖 Documentación Adicional

| Documento                                                         | Descripción                              |
| ----------------------------------------------------------------- | ---------------------------------------- |
| [create-admin-user.md](docs/create-admin-user.md)                 | Guía para crear usuarios administradores |
| [ban-system-implementation.md](docs/ban-system-implementation.md) | Implementación del sistema de ban        |
| [admin-permissions-fix.md](docs/admin-permissions-fix.md)         | Solución de permisos de admin            |

---

## 🚀 Despliegue

### Vercel (Recomendado)

La forma más sencilla de desplegar es usando [Vercel Platform](https://vercel.com/new):

1. Conectar repositorio de GitHub/GitLab/Bitbucket
2. Configurar variables de entorno en Vercel Dashboard
3. Desplegar automáticamente

### Variables de Entorno en Producción

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

</div>
