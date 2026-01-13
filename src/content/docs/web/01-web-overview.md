---
title: "Web Admin Overview"
description: "Panel de administración de Blue Bank construido con Next.js 16 y React 19"
order: 1
icon: "🌐"
section: "web"
---

# 🌐 Blue Bank Admin Panel

Panel de administración web para gestionar usuarios, recargas y operaciones del sistema Blue Bank.

---

## Stack Tecnológico

| Tecnología       | Versión | Descripción                    |
| ---------------- | ------- | ------------------------------ |
| **Next.js**      | 16.1.1  | Framework React con App Router |
| **React**        | 19.2.3  | Biblioteca de UI               |
| **TypeScript**   | ^5      | Tipado estático                |
| **TailwindCSS**  | ^4      | Estilos utilitarios            |
| **React Query**  | ^5.90   | Gestión de estado del servidor |
| **Supabase**     | ^2.90   | Backend as a Service           |
| **Lucide React** | ^0.562  | Iconos                         |

---

## Estructura del Proyecto

```
bluebank_admin/
├── src/
│   ├── app/
│   │   └── [locale]/           # Rutas internacionalizadas
│   │       ├── page.tsx        # Dashboard principal
│   │       ├── auth/           # Login/Logout
│   │       ├── users/          # Gestión de usuarios
│   │       ├── recharges/      # Solicitudes de recarga
│   │       └── settings/       # Configuración
│   ├── components/
│   │   ├── admin/              # Componentes de administración
│   │   ├── auth/               # Componentes de autenticación
│   │   ├── charts/             # Gráficos y visualizaciones
│   │   └── ui/                 # Componentes UI genéricos
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilidades y configuraciones
│   └── i18n/                   # Internacionalización
├── messages/                   # Archivos de traducción
└── docs/                       # Documentación técnica
```

---

## Rutas Principales

| Ruta          | Descripción                          |
| ------------- | ------------------------------------ |
| `/`           | Dashboard con estadísticas generales |
| `/auth/login` | Inicio de sesión de administrador    |
| `/users`      | Tabla de usuarios con acciones       |
| `/users/[id]` | Logs de actividad por usuario        |
| `/recharges`  | Gestión de solicitudes de recarga    |
| `/settings`   | Configuración del sistema            |

---

## Características

### Gestión de Usuarios

- Visualización de todos los usuarios registrados
- Edición de información de perfil
- Sistema de baneo temporal/permanente
- Historial de actividad (logs)
- Eliminación de cuentas

### Gestión de Recargas

- Lista de solicitudes de recarga de tarjetas prepago
- Aprobación/Rechazo de solicitudes
- Filtros por estado y fecha
- Información de usuario y monto

### Internacionalización

- Soporte para Español e Inglés
- Cambio de idioma dinámico
- Archivos de mensajes en `/messages`
