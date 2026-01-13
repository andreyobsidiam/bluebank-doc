---
title: "Design System"
description: "Sistema de diseño de Blue Bank App basado en Material 3 con Atomic Design"
order: 4
icon: "🎨"
section: "mobile"
---

# 🎨 Sistema de Diseño

**Ubicación:** `lib/src/ds/`

Blue Bank implementa un sistema de diseño propio basado en **Material 3**, siguiendo la metodología **Atomic Design**.

---

## Estructura

```
ds/
├── ds.dart                     # Barrel file de exportaciones
├── theme.dart                  # Definición de temas (13.6KB)
├── util.dart                   # Extensiones de contexto
├── atom/                       # Componentes atómicos
│   ├── box.dart
│   ├── dropdown_atom.dart
│   └── text_field_atom.dart
└── molecules/                  # Componentes moleculares
    ├── ds_beneficiary_tile.dart
    ├── transaction_item.dart
    ├── recharge_transaction_item.dart
    └── snackbar.dart
```

---

## Modos de Tema

| Modo                      | Descripción                               |
| ------------------------- | ----------------------------------------- |
| **Standard Light**        | Modo claro para uso diurno                |
| **Standard Dark**         | Modo oscuro para uso nocturno             |
| **Medium Contrast Light** | Contraste medio (accesibilidad)           |
| **Medium Contrast Dark**  | Contraste medio oscuro                    |
| **High Contrast Light**   | Alto contraste para dificultades visuales |
| **High Contrast Dark**    | Alto contraste oscuro                     |

---

## Atoms

Componentes base indivisibles:

| Componente      | Descripción                                     |
| --------------- | ----------------------------------------------- |
| `BoxAtom`       | Contenedor base con estilos predefinidos        |
| `DropdownAtom`  | Dropdown estandarizado                          |
| `TextFieldAtom` | Input con validación, iconos y estados de error |

---

## Molecules

Combinaciones de átomos con funcionalidad específica:

| Componente                | Descripción                                        |
| ------------------------- | -------------------------------------------------- |
| `DsBeneficiaryTile`       | Celda de información de beneficiario               |
| `TransactionItem`         | Item de lista para movimientos bancarios           |
| `RechargeTransactionItem` | Item para recargas de tarjetas prepago             |
| `DsSnackbar`              | Snackbar con tipos (success, error, warning, info) |

---

## Extensiones de Contexto

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
