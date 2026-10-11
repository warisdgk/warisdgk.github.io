---
title: Structuring a production Compose app
description: How I split a Kotlin and Jetpack Compose app so a feature can ship without turning the project into one large module.
publishedAt: "2026-03-12"
tags:
  - Kotlin
  - Jetpack Compose
  - Android
pinned: true
published: false
cover: images/module-boundaries.svg
coverAlt: Three boxes labeled app, feature, and core. Arrows run from app to feature, and from feature to core.
---

A Compose app stays easier to change when module boundaries match how the work ships. I keep the app module thin and put each feature in its own Gradle module.

## Start with the app module

The app module owns navigation, the application class, and the dependency injection setup. Screens do not live there. When a screen grows its own state, it moves into a feature module.

## Keep UI state next to the screen

Each screen gets a ViewModel and a small UiState data class. The composable reads that state and sends events back up. I do not pass a repository into a composable just because that saves a file.

```kotlin title="CheckoutViewModel.kt" {6}
data class CheckoutUiState(
    val amountLabel: String = "",
    val submitting: Boolean = false,
)

class CheckoutViewModel : ViewModel() {
    // Screen events land here, not in the composable.
}
```

## When a module should split

Split a module when two features share code only by accident. A `core:design` module for the theme is worth keeping. A `core:common` module that every feature depends on usually is not.
