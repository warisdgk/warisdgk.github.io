---
title: Session state in an Android fintech app
description: Where a session token should live, and what the app should do when refresh fails while a screen is still open.
publishedAt: "2026-06-02"
published: false
updatedAt: "2026-07-18"
tags:
  - Android
  - Security
  - Fintech
---

A fintech app should end the session as soon as the token cannot be trusted. The hard part is doing that while a screen is still open.

## Store the token outside the UI

I keep the access token in encrypted storage, behind one SessionStore. Composables never read the token. A screen asks an authenticated repository for data, and that repository asks the store.

![Session check before a screen reads account data](images/session-flow.svg)

## One place decides the session is over

Refresh can fail for two different reasons. A 401 means the session is over.[^401] A timeout means the network failed, and the old session may still be valid. Those two paths should not share a catch block.

```kotlin title="SessionRefresher.kt" {3}
sealed interface RefreshResult {
    data class Updated(val accessToken: String) : RefreshResult
    data object SignedOut : RefreshResult
    data object RetryLater : RefreshResult
}
```

When the result is `SignedOut`, the app opens the lock screen and clears the cached account data. The in-memory screen state goes with it.

[^401]: I treat 401 this way only after the refresh call itself has failed.
