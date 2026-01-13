---
title: "Mobile App Overview"
description: "Documentación completa de Blue Bank App construida con Flutter y Clean Architecture"
order: 1
icon: "📱"
section: "mobile"
---

# 📱 Blue Bank App - Resumen

**Blue Bank App** es una plataforma de banca móvil construida con **Flutter**, diseñada para proporcionar una experiencia de usuario segura, rápida e intuitiva.

| Característica   | Detalle            |
| ---------------- | ------------------ |
| **SDK Flutter**  | ^3.10.0            |
| **Dart SDK**     | ^3.10.0            |
| **Arquitectura** | Clean Architecture |
| **Estado**       | Producción         |

---

## Características Clave

| Área           | Descripción                                                          |
| -------------- | -------------------------------------------------------------------- |
| **Seguridad**  | Autenticación biométrica (FaceID/TouchID), almacenamiento encriptado |
| **UX Moderno** | Material 3 con modos Light/Dark y Alto Contraste                     |
| **Modular**    | Estructura feature-first para trabajo paralelo                       |
| **Global**     | Internacionalización (i18n) integrada                                |
| **Monitoreo**  | Sentry para errores y Firebase Analytics                             |

---

## Estructura del Proyecto

```
bluebank_app/
├── lib/
│   ├── main.dart                    # Punto de entrada
│   ├── firebase_options.dart        # Configuración Firebase
│   └── src/
│       ├── core/                    # Módulo central (40 archivos)
│       ├── ds/                      # Sistema de Diseño (12 archivos)
│       └── features/                # Funcionalidades (261 archivos)
├── assets/                          # Recursos estáticos
├── test/                            # Tests unitarios
└── doc/                             # Documentación técnica
```

---

## Clean Architecture

La aplicación sigue el patrón de **Clean Architecture** con tres capas:

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

> **Regla de Dependencia:** Ningún módulo de `feature` debe depender de otro `feature`. Todos dependen únicamente del módulo `core`.
