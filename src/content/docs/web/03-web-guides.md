---
title: "Web Guides"
description: "Guías de implementación: sistema de baneo, permisos y creación de admins"
order: 3
icon: "📖"
section: "web"
---

# 📖 Guías de Implementación

Documentación técnica para configuración y operaciones del panel admin.

---

## Sistema de Baneo de Usuarios

El sistema utiliza la API nativa de Supabase Auth para baneo temporal/permanente.

### Características

- **Duración personalizable:** Especificar horas de ban (24h, 168h, 720h)
- **API nativa de Supabase:** `supabase.auth.admin.updateUserById()`
- **Reversible:** Desbanear usuarios fácilmente
- **Interfaz visual:** Indicadores de estado y fecha de expiración

### Funciones

```typescript
// Bannear por 24 horas (por defecto)
await banUser("user-id");

// Bannear por 1 semana
await banUser("user-id", 168);

// Remover ban
await unbanUser("user-id");
```

### Migración Requerida

```sql
ALTER TABLE public.profiles
ADD COLUMN is_banned boolean DEFAULT false,
ADD COLUMN banned_until timestamp with time zone DEFAULT null;
```

---

## Permisos de Administrador

Las operaciones de administrador requieren la **service role key** de Supabase.

### Configuración

1. Agregar variable de entorno:

```env
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui
```

2. Obtener la key desde Supabase Dashboard → Settings → API

> ⚠️ **IMPORTANTE:** Nunca exponer la service role key en el cliente.

### Verificación de Permisos

```typescript
import { isCurrentUserAdmin } from "@/lib/supabase/admin-utils";

// Verificar si el usuario es admin
const isAdmin = await isCurrentUserAdmin();
```

---

## Crear Usuario Admin de Prueba

### Método 1: Script Node.js (Recomendado)

```bash
node scripts/create-admin.js
```

### Método 2: SQL en Supabase Dashboard

```sql
-- Verificar usuario admin
SELECT id, email, raw_user_meta_data
FROM auth.users
WHERE email = 'admin@test.com';

-- Verificar en tabla admins
SELECT * FROM public.admins
WHERE email = 'admin@test.com';
```

### Credenciales de Prueba

| Campo    | Valor            |
| -------- | ---------------- |
| Email    | `admin@test.com` |
| Password | `admin123`       |
| Nombre   | `Admin Test`     |

> 🛡️ En producción, cambiar la contraseña por una más segura.

---

## Flujo de Seguridad

1. **Verificación de Admin:** Usuario debe estar en tabla `admins`
2. **Cliente Correcto:** Usar `supabaseAdmin` con service role key
3. **Actualización de Perfil:** Sincronizar estado en tabla `profiles`

### Errores Comunes

| Error                       | Causa                   | Solución                 |
| --------------------------- | ----------------------- | ------------------------ |
| "User not allowed"          | Usando clave anónima    | Usar `supabaseAdmin`     |
| "No tienes permisos"        | Usuario no es admin     | Agregar a tabla `admins` |
| "Service role key required" | Variable no configurada | Agregar a `.env.local`   |
