---
title: "Core Module"
description: "Módulo central de Blue Bank App con utilidades, servicios y configuraciones transversales"
order: 2
icon: "⚙️"
section: "mobile"
---

# ⚙️ Módulo Core

**Ubicación:** `lib/src/core/`

El módulo `core` contiene toda la lógica base, configuraciones, utilidades y servicios **transversales** a todas las funcionalidades.

---

## Estructura

```
core/
├── common/
│   ├── utils/          # 15 archivos de utilidades
│   └── widgets/        # 3 widgets reutilizables globales
├── config/
│   ├── router/         # GoRouter configuration
│   ├── supabase/       # Cliente Supabase
│   ├── sentry/         # Monitoreo de errores
│   └── deep_link/      # Deep Links
├── di/                 # Inyección de dependencias (get_it + injectable)
├── error/              # Excepciones y Failures
├── l10n/               # Internacionalización (arb files)
├── network/            # Cliente HTTP (Dio)
├── services/           # Servicios de infraestructura
└── usecases/           # Clase base UseCase
```

---

## Utils Principales

| Archivo                       | Descripción                               |
| ----------------------------- | ----------------------------------------- |
| `account_utils.dart`          | Funciones para datos de cuentas bancarias |
| `amount_input_formatter.dart` | Formateadores de montos monetarios        |
| `currency_converter.dart`     | Conversión de divisas                     |
| `currency_formatter.dart`     | Formateo visual de monedas                |
| `date_formatter.dart`         | Formateo de fechas según locale           |
| `logger.dart`                 | Sistema de logging (`AppLogger`)          |
| `whatsapp_launcher.dart`      | Soporte al cliente via WhatsApp           |

---

## Servicios

### BiometricService

Abstracción sobre `local_auth` para autenticación biométrica.

| Método           | Descripción                             |
| ---------------- | --------------------------------------- |
| `isAvailable()`  | Verifica disponibilidad de biometría    |
| `authenticate()` | Ejecuta autenticación con huella/FaceID |

### SecureStorageService

Abstracción sobre `flutter_secure_storage` para persistencia encriptada.

**Datos almacenados:** Access Token, Refresh Token, User ID, PIN encriptado

### AuditLoggerService

Sistema de auditoría para cumplimiento normativo.

**Eventos auditados:** `login`, `logout`, `transfer_completed`, `card_blocked`, `password_changed`

---

## Error Handling

### Excepciones (Data Layer)

```dart
class ServerException implements Exception {
  final String? message;
  final int? statusCode;
}
```

### Failures (Domain Layer)

| Categoría          | Failures                                                   |
| ------------------ | ---------------------------------------------------------- |
| **Generales**      | `ServerFailure`, `CacheFailure`, `NetworkFailure`          |
| **Autenticación**  | `InvalidCredentialsFailure`, `SessionExpiredFailure`       |
| **Transferencias** | `InsufficientFundsFailure`, `TransferLimitExceededFailure` |

---

## Network (Dio Client)

Wrapper personalizado de Dio con:

- **Interceptores Auth:** Inyección automática de tokens
- **Refresh Token:** Renovación automática de tokens expirados
- **Logging:** `PrettyDioLogger` para debug
- **Sentry:** Captura automática de errores de red
