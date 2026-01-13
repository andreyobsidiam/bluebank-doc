---
title: "Features Modules"
description: "Módulos funcionales de Blue Bank App: Auth, Home, Cards, Transfer, Profile y más"
order: 3
icon: "🧩"
section: "mobile"
---

# 🧩 Módulos de Features

**Ubicación:** `lib/src/features/`

La aplicación se divide en **9 módulos funcionales independientes**, cada uno con su propia estructura de Clean Architecture.

---

## Resumen de Módulos

| Feature                  | Archivos | Descripción                        |
| ------------------------ | -------- | ---------------------------------- |
| **auth**                 | 36       | Autenticación y gestión de sesión  |
| **home**                 | 21       | Dashboard principal                |
| **cards**                | 38       | Gestión de tarjetas                |
| **transfer**             | 81       | Transferencias de fondos           |
| **profile**              | 25       | Perfil y configuración             |
| **account_details**      | 27       | Detalles de cuentas                |
| **action_authorization** | 12       | Autorización de acciones sensibles |
| **onboarding**           | 12       | Bienvenida y verificación KYC      |
| **localization**         | 9        | Gestión de idioma                  |

---

## Auth Feature

Gestiona el ciclo de vida de la sesión del usuario.

### Use Cases

| UseCase                | Descripción                            |
| ---------------------- | -------------------------------------- |
| `LoginUseCase`         | Inicio de sesión con manejo de errores |
| `LogoutUseCase`        | Cierra sesión y limpia storage         |
| `ResetPasswordUseCase` | Solicita correo de recuperación        |
| `VerifySessionUseCase` | Comprueba sesión válida persistida     |

### Flujos Críticos

1. **Auto-Login:** Al abrir la app, verifica sesión existente
2. **Login Complejo:** Maneja bloqueo temporal, primer login, MFA
3. **Biometría:** FaceID/TouchID para login rápido

---

## Cards Feature

Gestiona visualización y operaciones de tarjetas.

### Páginas

| Página                   | Descripción                       |
| ------------------------ | --------------------------------- |
| `CardsPage`              | Dashboard de tarjetas y productos |
| `CreditCardPage`         | Detalle de tarjeta de crédito     |
| `DebitCardPage`          | Detalle de tarjeta de débito      |
| `PrepaidCardAccountPage` | Tarjetas prepago con recarga      |

### Subflujo de Recarga

Flujo completo para recargar tarjetas prepago:

- Selección de cuenta origen
- Ingreso de monto
- Validación de fondos
- Confirmación y procesamiento

---

## Transfer Feature

El motor financiero de la aplicación.

### Tipos de Transferencia

| Tipo                      | Descripción                             |
| ------------------------- | --------------------------------------- |
| **Entre Mis Cuentas**     | Movimiento entre cuentas propias        |
| **BluePay (P2P)**         | Transferencia a usuarios Blue Bank      |
| **Externa/Internacional** | Transferencia a bancos externos (SWIFT) |
| **Wire Transfer**         | Solicitudes de transferencia wire       |

### Flujo Wizard

```
1. Selección de Tipo → 2. Cuenta Origen → 3. Beneficiario
     ↓
4. Monto y Detalle → 5. Cálculo de Comisiones → 6. Confirmación
     ↓
7. Autorización (PIN/Biometría si > $1000) → 8. Recibo Digital
```

---

## Profile Feature

Gestión de cuenta personal y configuraciones.

### Páginas

| Página                    | Descripción                          |
| ------------------------- | ------------------------------------ |
| `ProfilePage`             | Menú principal de configuración      |
| `PersonalInformationPage` | Edición de datos personales          |
| `SecuritySettingsPage`    | PIN, biometría, cambio de contraseña |
| `SupportPage`             | Centro de ayuda y WhatsApp           |
| `TermsAndConditionsPage`  | Documentos legales (PDF viewer)      |
| `PreferredLanguagePage`   | Cambio de idioma                     |

---

## Seguridad

- Transacciones > $1000 requieren confirmación PIN/Biometría
- Validación de fondos suficientes antes de procesar
- Encriptación de payloads sensibles
- Sistema de auditoría para todas las operaciones
