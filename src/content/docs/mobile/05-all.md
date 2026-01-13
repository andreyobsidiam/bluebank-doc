---
title: "Documentación Completa"
description: "Documentación técnica completa de Blue Bank App"
order: 5
icon: "📚"
section: "mobile"
---

# Blue Bank App - Documentación Técnica Completa

**Versión:** 2.0  
**Fecha:** Enero 2026  
**Cliente:** Blue Bank International  
**SDK Flutter:** ^3.10.0  
**Dart SDK:** ^3.10.0

---

## 📋 Resumen Ejecutivo

**Blue Bank App** es una plataforma de banca móvil construida con **Flutter**, diseñada para proporcionar una experiencia de usuario segura, rápida e intuitiva. La aplicación sigue estándares de ingeniería estrictos, utilizando **Clean Architecture** para asegurar escalabilidad, testeabilidad y mantenibilidad a largo plazo.

### Características Clave

| Área           | Descripción                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------------------- |
| **Seguridad**  | Autenticación biométrica (FaceID/TouchID), almacenamiento encriptado, límites de autorización por acción |
| **UX Moderno** | Sistema de Diseño Material 3 con soporte para modos Light/Dark y accesibilidad (Alto Contraste)          |
| **Modular**    | Estructura feature-first permitiendo trabajo paralelo sin conflictos                                     |
| **Global**     | Internacionalización (i18n) integrada y soporte multi-región                                             |
| **Monitoreo**  | Integración con Sentry para errores en tiempo real y Firebase Analytics                                  |

---

## 📑 Tabla de Contenidos

1. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
2. [Módulo Core](#módulo-core)
3. [Sistema de Diseño (DS)](#sistema-de-diseño-ds)
4. [Módulos de Features](#módulos-de-features)
5. [Infraestructura y DevOps](#infraestructura-y-devops)
6. [Dependencias del Proyecto](#dependencias-del-proyecto)
7. [Guía de Inicio Rápido](#guía-de-inicio-rápido)

---

# Arquitectura del Proyecto

## 📂 Estructura General del Directorio

```
bluebank_app/
├── lib/
│   ├── main.dart                    # Punto de entrada de la aplicación
│   ├── firebase_options.dart        # Configuración de Firebase
│   ├── gen/                         # Código generado (flutter_gen)
│   └── src/
│       ├── core/                    # Módulo central (40 archivos)
│       ├── ds/                      # Sistema de Diseño (12 archivos)
│       └── features/                # Funcionalidades (261 archivos)
├── assets/                          # Recursos estáticos (25 items)
├── scripts/                         # Scripts de automatización
├── test/                            # Tests unitarios (61 archivos)
├── doc/                             # Documentación técnica
├── android/                         # Configuración nativa Android
├── ios/                             # Configuración nativa iOS
└── web/                             # Configuración web
```

## 📐 Patrón Arquitectónico: Clean Architecture

Cada módulo (`core` y cada `feature`) sigue el patrón de **Clean Architecture** con tres capas claramente separadas:

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                       │
│  (Pages, Widgets, Blocs, States, Events)                   │
├─────────────────────────────────────────────────────────────┤
│                      DOMAIN LAYER                           │
│  (Entities, Repositories Interfaces, UseCases)             │
├─────────────────────────────────────────────────────────────┤
│                       DATA LAYER                            │
│  (Models, DataSources, Repositories Implementations)        │
└─────────────────────────────────────────────────────────────┘
```

### Regla de Dependencia

> **Importante:** Ningún módulo de `feature` debe depender de otro `feature`. Todos pueden (y deben) depender únicamente del módulo `core`.

---

# Módulo Core

**Ubicación:** `lib/src/core/`

El módulo `core` es el corazón de la aplicación Blue Bank. Contiene toda la lógica base, configuraciones, utilidades y servicios que son **transversales** a todas las funcionalidades de la aplicación.

## 📂 Estructura del Directorio Core

```
core/
├── common/
│   ├── utils/          # 15 archivos de utilidades
│   └── widgets/        # 3 widgets reutilizables globales
├── config/
│   ├── router/         # Configuración de GoRouter
│   ├── supabase/       # Inicialización del cliente Supabase
│   ├── sentry/         # Monitoreo de errores
│   └── deep_link/      # Manejo de Deep Links
├── di/                 # Inyección de dependencias (get_it + injectable)
├── error/              # Manejo de excepciones y failures
├── l10n/               # Internacionalización (arb files)
├── network/            # Cliente HTTP (Dio)
├── services/           # Servicios de infraestructura
└── usecases/           # Clase base UseCase
```

---

## 1. Common (`/common`)

Contiene elementos de uso general necesarios para la UI y lógica auxiliar.

### Utils (`/common/utils`) - 15 archivos

| Archivo                             | Descripción                                                                            |
| ----------------------------------- | -------------------------------------------------------------------------------------- |
| `account_utils.dart`                | Funciones auxiliares para manejo de datos de cuentas bancarias                         |
| `amount_input_formatter.dart`       | Formateadores para inputs de montos monetarios con validación                          |
| `context_extensions.dart`           | Extensiones sobre `BuildContext` para acceso rápido a tema, media query y traducciones |
| `currency_converter.dart`           | Lógica para conversión de divisas entre diferentes monedas                             |
| `currency_formatter.dart`           | Formateo visual de monedas (símbolos, separadores de miles, decimales)                 |
| `date_formatter.dart`               | Formateo de fechas y horas según locale del usuario                                    |
| `logger.dart`                       | Sistema de logging centralizado (`AppLogger`) usando `debugPrint`                      |
| `navigation.dart`                   | Helpers para navegación común en la aplicación                                         |
| `responsive_breakpoints_utils.dart` | Constantes y funciones para diseño responsivo en diferentes tamaños de pantalla        |
| `scaffolds.dart`                    | Configuraciones base para las pantallas                                                |
| `screen.dart`                       | Utilidades relacionadas con las dimensiones de la pantalla                             |
| `share_utils.dart`                  | Funcionalidad para compartir contenido nativo (share_plus)                             |
| `time.dart`                         | Utilidades de manejo de tiempo                                                         |
| `utils.dart`                        | Utilidades generales misceláneas                                                       |
| `whatsapp_launcher.dart`            | Utilidad para abrir chats de WhatsApp (soporte al cliente)                             |

### Widgets (`/common/widgets`) - 3 widgets

| Widget                         | Descripción                                                                                                                                  |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `main_scaffold.dart`           | Estructura base de página usada por la mayoría de las pantallas. Incluye AppBar configurable, BottomNavigationBar y gestión de SafeArea      |
| `account_selection_modal.dart` | Modal estandarizado para selección de cuentas de origen/destino en transferencias y pagos. Incluye visualización de saldos y tipos de cuenta |
| `selected_account_card.dart`   | Widget para visualizar una cuenta seleccionada con toda su información relevante                                                             |

---

## 2. Config (`/config`)

Configuración centralizada de servicios e infraestructura de la aplicación.

### Router (`/config/router/`)

- Configuración completa de **GoRouter** con todas las rutas de la aplicación
- Implementación de Guards de autenticación
- Redirecciones condicionales basadas en estado de sesión
- Manejo de rutas protegidas y públicas

### Supabase (`/config/supabase/`)

- Inicialización del cliente de **Supabase**
- Configuración de Base de Datos y Auth
- Gestión de sesiones y tokens
- Conexión con Edge Functions

### Sentry (`/config/sentry/`)

- Monitoreo de errores en tiempo real
- Captura automática de excepciones
- Upload de debug symbols y source maps
- Configuración de proyecto: `blue-bank-international`

### Deep Link (`/config/deep_link/`)

- Manejo de Deep Links externos
- Redirecciones desde emails (Magic Links)
- Flujo de recuperación de contraseña
- Verificación de email

---

## 3. Dependency Injection (`/di`)

Gestión de dependencias mediante `get_it` e `injectable`, permitiendo desacoplamiento total entre las capas.

| Archivo                | Descripción                                                                                                                   |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `injector.dart`        | Punto de entrada `configureDependencies()` para registrar todas las dependencias al inicio de la app                          |
| `injector.config.dart` | Archivo generado automáticamente por `injectable_generator` con todas las inyecciones                                         |
| `register_module.dart` | Módulo para registrar dependencias de terceros (`Dio`, `FlutterSecureStorage`, `SharedPreferences`) que no son clases propias |

### Uso de Inyección

```dart
// Obtener una dependencia
final authRepository = getIt<AuthRepository>();

// En un Bloc (usando injectable)
@injectable
class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final LoginUseCase _loginUseCase;

  AuthBloc(this._loginUseCase) : super(AuthInitial());
}
```

---

## 4. Error Handling (`/error`)

Sistema de manejo de errores alineado con Clean Architecture.

### Exceptions (`exceptions.dart`)

Excepciones lanzadas por la capa de **Data**:

```dart
class ServerException implements Exception {
  final String? message;
  final int? statusCode;
}

class CacheException implements Exception {}
```

### Failures (`failures.dart`)

Clases `Failure` usadas en la capa de **Domain** para retornar errores de forma funcional usando `Either<Failure, Success>`:

| Categoría          | Failures                                                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Generales**      | `ServerFailure`, `CacheFailure`, `NetworkFailure`                                                                                    |
| **Autenticación**  | `InvalidCredentialsFailure`, `UserDisabledFailure`, `InvalidOneTimePasswordFailure`, `SessionExpiredFailure`, `AccountLockedFailure` |
| **Autorización**   | `AuthenticationFailure`, `InvalidAuthenticationCodeFailure`, `BiometricFailure`                                                      |
| **Transferencias** | `InsufficientFundsFailure`, `TransferLimitExceededFailure`                                                                           |

---

## 5. Localization (`/l10n`)

Manejo de internacionalización (i18n) de la aplicación.

### Estructura

```
l10n/
├── arb/
│   ├── app_en.arb      # Traducciones en inglés
│   ├── app_es.arb      # Traducciones en español
│   └── ...
└── l10n.dart           # Configuración de delegados y locales soportados
```

### Idiomas Soportados

- **Español (es)** - Idioma principal
- **Inglés (en)** - Idioma secundario

### Configuración

Definida en `l10n.yaml`:

```yaml
arb-dir: lib/src/core/l10n/arb
template-arb-file: app_en.arb
output-localization-file: app_localizations.dart
```

---

## 6. Network (`/network`)

Capa de comunicación HTTP basada en **Dio**.

### DioClient (`dio_client.dart`)

Wrapper personalizado de Dio que incluye:

| Característica         | Descripción                                                         |
| ---------------------- | ------------------------------------------------------------------- |
| **Interceptores Auth** | Inyección automática de tokens de sesión en headers                 |
| **Refresh Token**      | Loop automático de renovación de tokens expirados                   |
| **Logging**            | `PrettyDioLogger` para depuración detallada de requests/responses   |
| **Timeouts**           | Configuración de timeouts globales (connection, receive, send)      |
| **Error Handling**     | Manejo centralizado de errores HTTP (400, 401, 403, 404, 500, etc.) |
| **Sentry Integration** | `sentry_dio` para captura automática de errores de red              |

---

## 7. Services (`/services`)

Servicios de infraestructura que interactúan con APIs del sistema o SDKs externos.

### BiometricService (`biometric_service.dart`)

Abstracción sobre `local_auth` para autenticación biométrica.

| Método                     | Descripción                                           |
| -------------------------- | ----------------------------------------------------- |
| `isAvailable()`            | Verifica si el dispositivo tiene biometría disponible |
| `authenticate()`           | Ejecuta autenticación con huella/FaceID               |
| `getAvailableBiometrics()` | Lista tipos de biometría disponibles                  |

### SecureStorageService (`secure_storage_service.dart`)

Abstracción sobre `flutter_secure_storage` para persistencia encriptada.

| Método              | Descripción                     |
| ------------------- | ------------------------------- |
| `write(key, value)` | Guarda un valor encriptado      |
| `read(key)`         | Lee un valor encriptado         |
| `delete(key)`       | Elimina un valor                |
| `deleteAll()`       | Limpia todo el storage (logout) |

**Datos almacenados:**

- Access Token
- Refresh Token
- User ID
- PIN encriptado
- Preferencias de biometría

### SumsubService (`sumsub_service.dart`)

Integración con **Sumsub** para verificación KYC (Know Your Customer).

| Método             | Descripción                                                  |
| ------------------ | ------------------------------------------------------------ |
| `getAccessToken()` | Obtiene token de acceso desde el backend                     |
| `launchSdk()`      | Inicia el SDK móvil de Sumsub para verificación de identidad |
| `handleResult()`   | Procesa el resultado de la verificación                      |

### AuditLoggerService (`audit_logger_service.dart`)

Sistema de auditoría para cumplimiento normativo.

| Método                                  | Descripción                                 |
| --------------------------------------- | ------------------------------------------- |
| `logEvent(action, details, deviceInfo)` | Registra una acción del usuario en Supabase |

**Eventos auditados:**

- `login`, `logout`, `login_failed`
- `transfer_initiated`, `transfer_completed`, `transfer_failed`
- `card_blocked`, `card_unblocked`
- `password_changed`, `pin_changed`
- `request_credit_card`, `request_debit_card`

**Información capturada:**

- Timestamp
- User ID
- Tipo de acción
- Detalles de la operación
- Información del dispositivo (device_info_plus)

---

## 8. UseCases (`/usecases`)

Definiciones base para la capa de Dominio.

### UseCase Base (`usecase.dart`)

```dart
abstract class UseCase<Type, Params> {
  Future<Either<Failure, Type>> call(Params params);
}

class NoParams extends Equatable {
  @override
  List<Object?> get props => [];
}
```

Todos los casos de uso extienden esta clase, asegurando una interfaz consistente que retorna `Future<Either<Failure, Type>>`.

---

# Sistema de Diseño (DS)

**Ubicación:** `lib/src/ds/`

Blue Bank implementa un sistema de diseño propio basado en **Material 3**, asegurando consistencia visual y soporte para accesibilidad.

## 📂 Estructura del Design System

```
ds/
├── ds.dart                     # Barrel file de exportaciones
├── theme.dart                  # Definición de temas (13.6KB)
├── util.dart                   # Extensiones de contexto
├── atom/                       # Componentes atómicos (4 archivos)
│   ├── atom.dart
│   ├── box.dart
│   ├── dropdown_atom.dart
│   └── text_field_atom.dart
└── molecules/                  # Componentes moleculares (5 archivos)
    ├── molecules.dart
    ├── ds_beneficiary_tile.dart
    ├── recharge_transaction_item.dart
    ├── snackbar.dart
    └── transaction_item.dart
```

---

## 🎨 Tokenización y Tema

### Modos de Tema Soportados

| Modo                      | Descripción                                            |
| ------------------------- | ------------------------------------------------------ |
| **Standard Light**        | Modo claro para uso diurno                             |
| **Standard Dark**         | Modo oscuro para uso nocturno                          |
| **Medium Contrast Light** | Contraste medio (accesibilidad)                        |
| **Medium Contrast Dark**  | Contraste medio oscuro                                 |
| **High Contrast Light**   | Alto contraste para usuarios con dificultades visuales |
| **High Contrast Dark**    | Alto contraste oscuro                                  |

### Estructura Atómica (Atomic Design)

El Design System sigue la metodología **Atomic Design**:

#### Atoms (`/atom`)

Componentes base indivisibles:

| Componente      | Descripción                                                         |
| --------------- | ------------------------------------------------------------------- |
| `BoxAtom`       | Contenedor base con estilos predefinidos (bordes, sombras, padding) |
| `DropdownAtom`  | Dropdown estandarizado con estilos del theme                        |
| `TextFieldAtom` | Input de texto con validación, iconos y estados de error            |

#### Molecules (`/molecules`)

Combinaciones de átomos con funcionalidad específica:

| Componente                | Descripción                                                               |
| ------------------------- | ------------------------------------------------------------------------- |
| `DsBeneficiaryTile`       | Celda para mostrar información de un beneficiario (nombre, cuenta, banco) |
| `TransactionItem`         | Item de lista para movimientos bancarios (fecha, monto, concepto, estado) |
| `RechargeTransactionItem` | Item especializado para recargas de tarjetas prepago                      |
| `DsSnackbar`              | Snackbar personalizado con tipos (success, error, warning, info)          |

### Extensiones de Contexto (`util.dart`)

Acceso rápido a tokens del tema:

```dart
// Colores
context.colors.primary
context.colors.onSurface
context.colors.error

// Tipografía
context.typography.headlineLarge
context.typography.bodyMedium
context.typography.labelSmall
```

---

# Módulos de Features

**Ubicación:** `lib/src/features/`

La aplicación se divide en **9 módulos funcionales independientes**, cada uno con su propia estructura de Clean Architecture.

```
features/
├── auth/                # 36 archivos - Autenticación
├── home/                # 21 archivos - Dashboard principal
├── cards/               # 38 archivos - Gestión de tarjetas
├── transfer/            # 81 archivos - Transferencias
├── profile/             # 25 archivos - Perfil y configuración
├── account_details/     # 27 archivos - Detalles de cuentas
├── action_authorization/ # 12 archivos - Autorización de acciones
├── onboarding/          # 12 archivos - Bienvenida y verificación
└── localization/        # 9 archivos - Gestión de idioma
```

---

## 1. Auth Feature (Autenticación)

**Ubicación:** `lib/src/features/auth/`

Gestiona el ciclo de vida de la sesión del usuario, la seguridad de acceso y la gestión de identidad.

### 📂 Estructura

```
auth/
├── data/
│   ├── datasources/
│   │   ├── auth_remote_datasource.dart
│   │   └── auth_local_datasource.dart
│   ├── models/
│   └── repositories/
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── usecases/
│       ├── login_usecase.dart
│       ├── logout_usecase.dart
│       ├── create_user_usecase.dart
│       ├── reset_password_usecase.dart
│       ├── update_password_usecase.dart
│       ├── verify_session_usecase.dart
│       ├── get_user_profile_usecase.dart
│       └── get_security_questions_usecase.dart
└── presentation/
    ├── bloc/
    │   ├── auth_bloc.dart
    │   └── user_profile_bloc.dart
    ├── pages/
    │   ├── login_page.dart
    │   ├── forgot_password_page.dart
    │   ├── otp_validation_page.dart
    │   ├── update_password_page.dart
    │   ├── link_account_page.dart
    │   └── session_verification_page.dart
    └── widgets/
```

### Use Cases

| UseCase                       | Descripción                                                                                                                      |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `LoginUseCase`                | Gestiona inicio de sesión con validaciones de credenciales y manejo de errores específicos (cuenta bloqueada, password expirado) |
| `LogoutUseCase`               | Cierra la sesión y limpia el almacenamiento seguro                                                                               |
| `CreateUserUseCase`           | Registro de nuevos usuarios                                                                                                      |
| `ResetPasswordUseCase`        | Solicita envío de correo de recuperación                                                                                         |
| `UpdatePasswordUseCase`       | Cambia la contraseña usando token de recuperación                                                                                |
| `VerifySessionUseCase`        | Comprueba al inicio si existe una sesión válida persistida                                                                       |
| `GetUserProfileUseCase`       | Obtiene datos del perfil del usuario autenticado                                                                                 |
| `GetSecurityQuestionsUseCase` | Recupera preguntas de seguridad para flujos de recuperación                                                                      |

### Flujos Críticos

1. **Auto-Login**: Al abrir la app, `SessionVerificationPage` invoca `VerifySessionUseCase`. Si es exitoso, redirige a `Home`; si falla, a `LoginPage`.

2. **Login Complejo**: El `LoginUseCase` maneja múltiples escenarios:

   - Bloqueo temporal de cuenta
   - Primer login (requiere cambio de password)
   - Password expirado
   - MFA/2FA requerido

3. **Autenticación Biométrica**: Integración con FaceID/TouchID para login rápido después del primer acceso.

---

## 2. Home Feature (Dashboard)

**Ubicación:** `lib/src/features/home/`

Módulo principal de la aplicación, encargado de mostrar el dashboard inicial del usuario.

### 📂 Estructura

```
home/
├── data/
│   ├── datasources/
│   ├── models/
│   └── repositories/
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── usecases/
│       └── get_user_account_list_usecase.dart
└── presentation/
    ├── bloc/
    ├── pages/
    │   └── home_page.dart
    └── widgets/
        ├── account_carousel/
        ├── quick_actions/
        └── recent_transactions/
```

### Componentes de la HomePage

| Componente              | Descripción                                                             |
| ----------------------- | ----------------------------------------------------------------------- |
| **Header**              | Saludo personalizado y notificaciones                                   |
| **Account Carousel**    | Carrusel horizontal de cuentas y tarjetas con saldos                    |
| **Quick Actions**       | Accesos directos a operaciones frecuentes (Transferir, Recargar, Pagar) |
| **Recent Transactions** | Resumen de últimos movimientos                                          |

### Dependencias

Este módulo orquesta información de múltiples dominios (Auth, Accounts, Cards) para presentar una visión unificada sin realizar lógica de negocio compleja.

---

## 3. Cards Feature (Tarjetas)

**Ubicación:** `lib/src/features/cards/`

Gestiona la visualización y operaciones de tarjetas (Crédito, Débito, Prepago) así como cuentas de ahorro y reserva.

### 📂 Estructura

```
cards/
├── data/
│   ├── datasources/
│   ├── models/
│   └── repositories/
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── usecases/
│       └── get_cards_usecase.dart
└── presentation/
    ├── bloc/
    │   ├── cards_bloc.dart
    │   └── ...
    ├── pages/
    │   ├── cards_page.dart
    │   ├── credit_card_page.dart
    │   ├── debit_card_page.dart
    │   ├── saving_account_page.dart
    │   ├── blue_reserve_account_page.dart
    │   ├── prepaid_card_account_page.dart
    │   └── transfer_detail_page.dart
    ├── recharge/           # Subflujo de recarga de tarjetas prepago
    │   ├── bloc/
    │   ├── pages/
    │   └── widgets/
    └── widgets/
        └── request_new_product_card_modal.dart
```

### Páginas Principales

| Página                   | Descripción                                                   |
| ------------------------ | ------------------------------------------------------------- |
| `CardsPage`              | Dashboard principal de tarjetas y productos                   |
| `CreditCardPage`         | Detalle de tarjeta de crédito (cupos, fechas de corte, pagos) |
| `DebitCardPage`          | Detalle de tarjeta de débito                                  |
| `SavingAccountPage`      | Vista para cuentas de ahorro                                  |
| `BlueReserveAccountPage` | Vista para cuentas de reserva "Blue Reserve"                  |
| `PrepaidCardAccountPage` | Vista para tarjetas prepago con opción de recarga             |

### Subflujo de Recarga de Tarjetas Prepago (`/recharge`)

Flujo completo para recargar tarjetas prepago desde cuentas del usuario:

- Selección de cuenta origen
- Ingreso de monto
- Validación de fondos suficientes
- Confirmación y procesamiento

---

## 4. Transfer Feature (Transferencias)

**Ubicación:** `lib/src/features/transfer/`

El motor financiero de la aplicación, responsable de orquestar el movimiento de fondos.

### 📂 Estructura

```
transfer/
├── data/
│   ├── datasources/
│   ├── models/
│   └── repositories/
├── domain/
│   ├── entities/
│   │   ├── transfer_entity.dart
│   │   ├── beneficiary_entity.dart
│   │   ├── country_entity.dart
│   │   ├── fee_entity.dart
│   │   └── ...
│   ├── repositories/
│   ├── usecases/
│   │   ├── do_transfer_usecase.dart
│   │   ├── get_transfer_usecase.dart
│   │   ├── get_user_account_list_usecase.dart
│   │   ├── get_countries_usecase.dart
│   │   ├── get_payment_receiver_fee_list_usecase.dart
│   │   └── get_payment_reference_category_list_usecase.dart
│   └── utils/
└── presentation/
    ├── bloc/
    │   ├── transfer_bloc.dart
    │   └── ...
    ├── between_my_account/     # Transferencias entre cuentas propias
    ├── bluepay_request/        # Solicitudes de pago BluePay
    ├── bluepay_transfer/       # Transferencias P2P BluePay
    ├── external_tranfers/      # Transferencias internacionales
    ├── top_up/                 # Recarga de saldo
    ├── wire_transfer_request/  # Solicitudes de transferencia wire
    ├── pages/
    │   └── transfer_page.dart
    └── widgets/
```

### Use Cases

| UseCase                                  | Descripción                                                                       |
| ---------------------------------------- | --------------------------------------------------------------------------------- |
| `DoTransferUseCase`                      | Ejecuta una transacción. Coordina validaciones de saldo, límites y autorizaciones |
| `GetTransferUseCase`                     | Obtiene detalle histórico de una transferencia específica por ID                  |
| `GetUserAccountListUseCase`              | Filtra y recupera cuentas válidas como origen de fondos (con caché de 5 minutos)  |
| `GetCountriesUseCase`                    | Provee listado de países soportados para transferencias SWIFT/Wire                |
| `GetPaymentReceiverFeeListUseCase`       | Calcula comisiones según tipo de transacción y destino                            |
| `GetPaymentReferenceCategoryListUseCase` | Obtiene categorías para clasificar el motivo de la transferencia                  |

### Tipos de Transferencia

| Tipo                      | Descripción                                                       | Ubicación                |
| ------------------------- | ----------------------------------------------------------------- | ------------------------ |
| **Entre Mis Cuentas**     | Movimiento entre cuentas propias del usuario                      | `/between_my_account`    |
| **BluePay (P2P)**         | Transferencia a otros usuarios Blue Bank usando email/teléfono/ID | `/bluepay_transfer`      |
| **Solicitud BluePay**     | Solicitar pago a otro usuario                                     | `/bluepay_request`       |
| **Externa/Internacional** | Transferencia a bancos externos (SWIFT/IBAN/ABA)                  | `/external_tranfers`     |
| **Wire Transfer**         | Solicitudes de transferencia wire                                 | `/wire_transfer_request` |
| **Top Up**                | Recarga de saldo                                                  | `/top_up`                |

### Flujo Wizard de Transferencia

```
1. Selección de Tipo de Transferencia
       ↓
2. Selección de Cuenta Origen
       ↓
3. Selección de Beneficiario (Agenda o Nuevo)
       ↓
4. Ingreso de Monto y Detalle
       ↓
5. Cálculo de Comisiones (Fee Calculator)
       ↓
6. Confirmación (Resumen completo)
       ↓
7. Autorización (PIN/Biometría si > umbral)
       ↓
8. Ejecución y Recibo Digital
```

### Seguridad

- Todas las transacciones por encima de un umbral definido ($1000) requieren confirmación secundaria mediante `ActionAuthorization` (PIN o Biometría)
- Validación de fondos suficientes antes de procesar
- Encriptación de payloads sensibles

---

## 5. Profile Feature (Perfil)

**Ubicación:** `lib/src/features/profile/`

Permite al usuario gestionar su cuenta personal, seguridad y configuraciones.

### 📂 Estructura

```
profile/
├── data/
│   ├── datasources/
│   ├── models/
│   └── repositories/
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── usecases/
│       ├── get_user_profile_usecase.dart
│       ├── reset_password_usecase.dart
│       └── reset_user_contact_information_usecase.dart
└── presentation/
    ├── bloc/
    ├── pages/
    │   ├── profile_page.dart
    │   ├── personal_information_page.dart
    │   ├── security_settings_page.dart
    │   ├── support_page.dart
    │   ├── terms_and_conditions_page.dart
    │   └── preferred_language_page.dart
    └── widgets/
```

### Páginas

| Página                    | Descripción                                            |
| ------------------------- | ------------------------------------------------------ |
| `ProfilePage`             | Menú principal de configuración                        |
| `PersonalInformationPage` | Edición de nombre, teléfono, email                     |
| `SecuritySettingsPage`    | Gestión de PIN, biometría, cambio de contraseña        |
| `SupportPage`             | Centro de ayuda con FAQ y enlace a WhatsApp de soporte |
| `TermsAndConditionsPage`  | Visualización de documentos legales (PDF viewer)       |
| `PreferredLanguagePage`   | Cambio de idioma de la aplicación                      |

### Seguridad

La edición de información sensible requiere re-autenticación mediante `ActionAuthorizationFeature` antes de proceder.

---

## 6. Account Details Feature (Detalles de Cuenta)

**Ubicación:** `lib/src/features/account_details/`

Gestiona la visualización de detalles de cuentas incluyendo saldos, movimientos y configuraciones específicas.

### 📂 Estructura

```
account_details/
├── data/
│   ├── datasources/
│   ├── models/
│   └── repositories/
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── usecases/
│       ├── get_account_summary_usecase.dart
│       └── refresh_account_summary_usecase.dart
└── presentation/
    ├── bloc/
    │   └── account_details_bloc.dart
    ├── pages/
    │   ├── account_page.dart
    │   ├── account_detail_page.dart
    │   ├── bluepay_account_page.dart
    │   ├── prepaid_card_account_page.dart
    │   └── transfer_detail_page.dart
    └── widgets/
```

### Características Clave

- Visualización de saldo actual y disponible
- Historial de transacciones con scroll infinito
- Detalles técnicos de la cuenta (IBAN, SWIFT, número de cuenta)
- Soporte para diferentes tipos de productos financieros:
  - Cuentas Corrientes
  - Tarjetas de Crédito/Débito
  - BluePay
  - Tarjetas Prepago

---

## 7. Action Authorization Feature (Autorización de Acciones)

**Ubicación:** `lib/src/features/action_authorization/`

Capa de seguridad interceptora para validar la identidad del usuario antes de permitir operaciones sensibles.

### 📂 Estructura

```
action_authorization/
├── data/
│   ├── datasources/
│   └── repositories/
├── domain/
│   ├── repositories/
│   └── usecases/
│       └── get_action_authorization_usecase.dart
└── presentation/
    ├── bloc/
    │   └── action_authorization_bloc.dart
    └── pages/
        └── action_authorization_page.dart
```

### Flujo de Seguridad

```
┌─────────────────────────────────────────────────────────────┐
│  Feature (e.g., Transfer) solicita autorización             │
└─────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│  Navegación a ActionAuthorizationPage                       │
└─────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│  Usuario ingresa PIN o usa biometría                        │
└─────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────┐
│  Si exitoso → retorna `true` a la feature solicitante       │
│  Si fallido → retorna `false` con mensaje de error          │
└─────────────────────────────────────────────────────────────┘
```

### Operaciones que Requieren Autorización

- Cualquier transferencia
- Cambio de contraseña o PIN
- Bloqueo/desbloqueo de tarjetas
- Actualización de información de contacto
- Solicitud de nuevos productos

---

## 8. Onboarding Feature (Bienvenida)

**Ubicación:** `lib/src/features/onboarding/`

Responsable de la experiencia inicial del usuario y el arranque de la aplicación.

### 📂 Estructura

```
onboarding/
├── data/
│   ├── datasources/
│   └── repositories/
├── domain/
│   ├── repositories/
│   └── usecases/
│       └── check_user_eligibility_usecase.dart
└── presentation/
    ├── bloc/
    └── pages/
        ├── splash_screen.dart
        ├── curacao_citizen_page.dart
        ├── onboarding_pending_page.dart
        └── service_unavailable_page.dart
```

### Páginas

| Página                   | Descripción                                                                    |
| ------------------------ | ------------------------------------------------------------------------------ |
| `SplashScreen`           | Pantalla de carga inicial con video de splash. Orquesta verificación de sesión |
| `CuracaoCitizenPage`     | Validación de residencia en Curazao (flujo regulatorio)                        |
| `OnboardingPendingPage`  | Pantalla para usuarios esperando aprobación manual tras completar KYC          |
| `ServiceUnavailablePage` | Pantalla de error global para caídas del sistema                               |

### Flujo de Arranque

```
1. SplashScreen → VerifySessionUseCase (Auth Feature)
       ↓
2. Si NO hay sesión → LoginPage
       ↓
3. Si HAY sesión → Verificar estado del perfil
       ↓
   ├── status == APPROVED → HomePage
   ├── status == PENDING → OnboardingPendingPage
   └── error → ServiceUnavailablePage
```

---

## 9. Localization Feature (Idioma)

**Ubicación:** `lib/src/features/localization/`

Maneja la selección y persistencia del idioma preferido por el usuario.

### 📂 Estructura

```
localization/
├── data/
│   ├── datasources/
│   └── repositories/
├── domain/
│   └── repositories/
└── presentation/
    ├── bloc/
    │   └── language_bloc.dart
    └── pages/
        └── language_selector_page.dart
```

### Integración

- Trabaja en conjunto con `core/l10n`
- `core/l10n` provee los recursos (strings en archivos ARB)
- Esta feature provee la **lógica de negocio** para cambiar y recordar la selección
- Persistencia local usando `SharedPreferences`
- Cambio de idioma en tiempo real sin reiniciar la app

---

# Infraestructura y DevOps

**Ubicación:** `/scripts/`

El proyecto incluye herramientas de automatización para facilitar el ciclo de vida del desarrollo.

## 🛠 Scripts Disponibles

```
scripts/
├── build_runner.sh              # Generación de código
├── build_web.sh                 # Build para web
├── build_web_firebase_deploy.sh # Build y deploy a Firebase
├── check_dsym.sh                # Verificación de debug symbols
├── coverage.sh                  # Ejecución de tests con cobertura
├── coverage_exclusions.txt      # Archivos excluidos de cobertura
├── create_feature.sh            # Generador CLI de features
├── rename_project.sh            # Renombrar proyecto
└── intl/                        # Scripts de internacionalización
```

### Generación de Código (`build_runner.sh`)

```bash
./scripts/build_runner.sh
# Equivalente a:
dart run build_runner build -d
```

Genera:

- Modelos JSON (`@JsonSerializable`)
- Clases Freezed (`@freezed`)
- Configuración de inyección de dependencias (`@injectable`)
- Clientes Retrofit (`@RestApi`)

### Creación de Features (`create_feature.sh`)

Generador CLI que crea automáticamente la estructura de carpetas para nuevas funcionalidades:

```bash
./scripts/create_feature.sh new_feature_name
```

Crea:

```
features/new_feature_name/
├── data/
│   ├── datasources/
│   ├── models/
│   └── repositories/
├── domain/
│   ├── entities/
│   ├── repositories/
│   └── usecases/
├── presentation/
│   ├── bloc/
│   ├── pages/
│   └── widgets/
└── README.md
```

### Cobertura de Tests (`coverage.sh`)

```bash
./scripts/coverage.sh
```

- Ejecuta la suite de tests
- Genera reportes de cobertura (lcov)
- Aplica exclusiones definidas en `coverage_exclusions.txt`

### Build Web (`build_web.sh`)

```bash
./scripts/build_web.sh
```

Construye la versión web optimizada para producción.

### Deploy Firebase (`build_web_firebase_deploy.sh`)

```bash
./scripts/build_web_firebase_deploy.sh
```

Construye y despliega automáticamente a Firebase Hosting.

---

## 🧪 Testing

**Ubicación:** `/test/`

La suite de tests incluye 61 archivos de pruebas unitarias.

### Herramientas de Testing

| Paquete        | Uso                       |
| -------------- | ------------------------- |
| `flutter_test` | Framework de testing base |
| `mocktail`     | Mocking de dependencias   |
| `bloc_test`    | Testing de Blocs          |

### Estructura de Tests

```
test/
├── core/
│   ├── services/
│   └── utils/
└── features/
    ├── auth/
    ├── transfer/
    └── ...
```

### Ejecución de Tests

```bash
# Todos los tests
flutter test

# Con cobertura
./scripts/coverage.sh

# Test específico
flutter test test/features/auth/login_usecase_test.dart
```

---

## 📊 Análisis Estático

**Configuración:** `analysis_options.yaml`

Reglas estrictas de linting incluyendo:

- `avoid_print` - Previene uso de print (usar AppLogger)
- Reglas de Flutter recomendadas
- Reglas personalizadas para el proyecto

---

# Dependencias del Proyecto

**Archivo:** `pubspec.yaml`

## Dependencias Principales

### Core Flutter

| Paquete        | Versión  | Uso                       |
| -------------- | -------- | ------------------------- |
| `flutter_bloc` | ^9.1.1   | Gestión de estado         |
| `go_router`    | ^17.0.0  | Navegación declarativa    |
| `get_it`       | ^9.0.5   | Inyección de dependencias |
| `injectable`   | ^2.7.1+4 | Generación de DI          |

### Networking

| Paquete             | Versión  | Uso                        |
| ------------------- | -------- | -------------------------- |
| `dio`               | ^5.5.0+1 | Cliente HTTP               |
| `retrofit`          | ^4.9.1   | Generación de clientes API |
| `pretty_dio_logger` | ^1.4.0   | Logging de requests        |

### Backend

| Paquete              | Versión | Uso                  |
| -------------------- | ------- | -------------------- |
| `supabase_flutter`   | ^2.10.3 | Base de datos y Auth |
| `firebase_core`      | ^4.2.1  | Firebase SDK         |
| `firebase_messaging` | ^16.0.4 | Push notifications   |
| `firebase_analytics` | ^12.0.4 | Analytics            |

### Seguridad

| Paquete                  | Versión | Uso                       |
| ------------------------ | ------- | ------------------------- |
| `local_auth`             | ^3.0.0  | Autenticación biométrica  |
| `flutter_secure_storage` | ^9.2.4  | Almacenamiento encriptado |
| `crypto`                 | ^3.0.5  | Funciones criptográficas  |

### Monitoreo

| Paquete          | Versión | Uso                        |
| ---------------- | ------- | -------------------------- |
| `sentry_flutter` | ^9.9.2  | Monitoreo de errores       |
| `sentry_dio`     | ^9.9.2  | Integración Sentry con Dio |

### UI/UX

| Paquete                | Versión  | Uso                        |
| ---------------------- | -------- | -------------------------- |
| `google_fonts`         | ^6.2.1   | Tipografías personalizadas |
| `flutter_svg`          | ^2.0.17  | Renderizado de SVG         |
| `skeletonizer`         | ^2.1.0+1 | Loading skeletons          |
| `percent_indicator`    | ^4.2.5   | Indicadores de progreso    |
| `auto_size_text`       | ^3.0.0   | Texto auto-ajustable       |
| `responsive_framework` | ^1.4.1   | Diseño responsivo          |

### KYC

| Paquete                             | Versión | Uso                    |
| ----------------------------------- | ------- | ---------------------- |
| `flutter_idensic_mobile_sdk_plugin` | ^1.39.0 | SDK de Sumsub para KYC |

### Utilidades

| Paquete                 | Versión | Uso                             |
| ----------------------- | ------- | ------------------------------- |
| `fpdart`                | ^1.1.0  | Programación funcional (Either) |
| `freezed_annotation`    | ^3.1.0  | Modelos inmutables              |
| `json_annotation`       | ^4.9.0  | Serialización JSON              |
| `intl`                  | ^0.20.2 | Internacionalización            |
| `url_launcher`          | ^6.3.0  | Abrir URLs externas             |
| `share_plus`            | ^12.0.1 | Compartir contenido             |
| `video_player`          | ^2.9.2  | Reproducción de video (splash)  |
| `flutter_pdfview`       | ^1.4.3  | Visualización de PDFs           |
| `flutter_cache_manager` | ^3.4.1  | Caché de archivos               |
| `device_info_plus`      | ^12.3.0 | Información del dispositivo     |
| `easy_mask`             | ^2.0.1  | Máscaras de input               |
| `uuid`                  | ^4.5.2  | Generación de UUIDs             |

## Dependencias de Desarrollo

| Paquete                  | Versión | Uso                          |
| ------------------------ | ------- | ---------------------------- |
| `build_runner`           | ^2.10.4 | Generación de código         |
| `freezed`                | ^3.2.3  | Generador de modelos         |
| `json_serializable`      | ^6.11.2 | Generador de serialización   |
| `injectable_generator`   | ^2.9.1  | Generador de DI              |
| `retrofit_generator`     | 10.1.0  | Generador de clientes API    |
| `mocktail`               | ^1.0.4  | Mocking en tests             |
| `bloc_test`              | ^10.0.0 | Testing de Blocs             |
| `flutter_gen_runner`     | ^5.12.0 | Generación de assets         |
| `flutter_launcher_icons` | ^0.14.4 | Generación de iconos         |
| `sentry_dart_plugin`     | ^3.2.0  | Plugin de Sentry para builds |

---

# Guía de Inicio Rápido

## 🚀 Prerrequisitos

- **Flutter SDK**: Versión `^3.10.0` o superior
- **Dart SDK**: Incluido con Flutter
- **IDE**: VS Code (recomendado) o Android Studio
- **Xcode**: Para desarrollo iOS (solo macOS)
- **Android Studio**: Para desarrollo Android

## 📝 Pasos de Instalación

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd bluebank_app
```

### 2. Instalar dependencias

```bash
flutter pub get
```

### 3. Configurar variables de entorno

Crear archivo `.env` en la raíz del proyecto:

```env
SUPABASE_URL=<your-supabase-url>
SUPABASE_ANON_KEY=<your-supabase-anon-key>
SENTRY_DSN=<your-sentry-dsn>
```

### 4. Generación de código (CRÍTICO)

Este paso es **obligatorio**. El proyecto usa generación de código para inyección de dependencias y modelos JSON.

```bash
./scripts/build_runner.sh
# O manualmente:
dart run build_runner build -d
```

### 5. Ejecutar la aplicación

```bash
# iOS Simulator
flutter run -d ios

# Android Emulator
flutter run -d android

# Web
flutter run -d chrome
```

## 🔧 Comandos Útiles

| Comando                          | Descripción           |
| -------------------------------- | --------------------- |
| `flutter pub get`                | Instalar dependencias |
| `dart run build_runner build -d` | Generar código        |
| `flutter analyze`                | Análisis estático     |
| `flutter test`                   | Ejecutar tests        |
| `./scripts/coverage.sh`          | Tests con cobertura   |
| `flutter build apk`              | Build Android         |
| `flutter build ios`              | Build iOS             |
| `flutter build web`              | Build Web             |

© 2026 Blue Bank International. Todos los derechos reservados.
