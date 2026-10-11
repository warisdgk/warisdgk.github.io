---
title: Markdown style guide
description: A sample post that shows every heading level and the other Markdown elements this blog supports.
publishedAt: "2026-09-20"
published: false
tags:
  - Android
  - Kotlin
cover: images/markdown-style-guide-cover.svg
coverAlt: A browser window sketch with Markdown heading markers from H1 to H6.
---

This is a sample post. Use it to check how each Markdown element looks before you write a real one.

# Heading level 1

The article title is already the page H1, so most posts start body sections at H2. This one exists so you can see how an H1 looks inside the body.

## Heading level 2

H2 headings appear in the table of contents. Use them for the main sections of a post.

### Heading level 3

H3 headings also appear in the table of contents, indented under their H2.

#### Heading level 4

H4 is good for a short subsection inside an H3.

##### Heading level 5

H5 is rarely needed. It renders as a small label.

###### Heading level 6

H6 is the smallest heading Markdown supports.

## Text and lists

Text can be **bold**, *italic*, or ~~struck through~~. Inline code looks like `viewModelScope.launch { }`.

- Keep screens small
- Move shared code into a core module
  - Theme and typography
  - Common test helpers
- Name modules after features

1. Write the failing test
2. Make it pass
3. Clean up

- [x] Add a cover image
- [ ] Replace this sample post

> A quote stands apart from the body text with an accent rule on the left.

## Code

```kotlin title="Greeting.kt" {2}
fun greeting(name: String): String {
    return "Hello, $name"
}
```

## Table

| Element | Markdown | Notes |
| --- | --- | --- |
| Heading | `## Title` | H2 and H3 go in the contents list |
| Image | `![alt](images/file.svg)` | Files live in public/blog/images |
| Footnote | `[^1]` | Notes collect at the end |

## Side notes

Footnotes keep side notes out of the main text.[^sample]

[^sample]: This note appears at the bottom of the post.
