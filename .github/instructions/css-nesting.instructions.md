---
description: "CSS organization using native nesting with hierarchy matching HTML structure. Use when: modifying, creating, or reviewing CSS files; refactoring stylesheets; adding new component styles."
applyTo: "**/*.css"
---

# CSS Nesting & Hierarchical Organization Guide

## Overview

This project uses **native CSS nesting** to organize styles hierarchically, mirroring the HTML DOM structure. This approach makes it easy to find and maintain styles by following the same path in both HTML and CSS files.

## Key Principles

### 1. Match CSS Structure to HTML Hierarchy

**Rule:** CSS nesting should reflect the HTML DOM tree exactly.

**Why:** 
- Reduce cognitive load when maintaining styles
- Find any style by following the HTML element path
- Keep related styles grouped together
- Minimize specificity issues

**Example:**

```html
<!-- HTML -->
<main class="page-shell">
  <section class="quiz-card">
    <header class="quiz-header">
      <h1>Title</h1>
      <p class="eyebrow">Label</p>
    </header>
  </section>
</main>
```

```css
/* CSS - Must match HTML structure */
.page-shell {
  /* page-shell styles */
  
  .quiz-card {
    /* quiz-card styles */
    
    .quiz-header {
      /* quiz-header styles */
      
      h1 {
        /* h1 inside quiz-header */
      }
      
      .eyebrow {
        /* eyebrow inside quiz-header */
      }
    }
  }
}
```

### 2. Use Nesting for These Cases

Nesting is appropriate and recommended for:

#### Pseudo-classes and Pseudo-elements
```css
button {
  background: blue;
  
  &:hover {
    background: darkblue;
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &::before {
    content: "→ ";
  }
}
```

#### State Modifiers
```css
.result-item {
  border: 1px solid gray;
  
  &.correct {
    border-left: 6px solid green;
  }
  
  &.incorrect {
    border-left: 6px solid red;
  }
}
```

#### Direct Child Relationships
```css
.form {
  /* form styles */
  
  label {
    /* direct children labels */
  }
  
  input {
    /* direct input elements */
  }
}
```

### 3. Avoid Deep Nesting

**Rule:** Limit nesting depth to 3-4 levels maximum.

**Bad:**
```css
/* ❌ Too deep */
.container {
  .wrapper {
    .inner {
      .item {
        .content {
          .text { }
        }
      }
    }
  }
}
```

**Good:**
```css
/* ✅ Reasonable depth */
.container {
  .wrapper {
    .item {
      .text { }
    }
  }
}
```

### 4. Keep Specificity Low

**Rule:** Don't nest just for convenience; nest when there's a semantic relationship.

**Bad:**
```css
/* ❌ Unnecessary nesting increases specificity */
.card {
  .nav {
    a { }  /* This is just .card .nav a - unrelated nesting */
  }
}
```

**Good:**
```css
/* ✅ Each selector at appropriate scope */
.card { }
.nav { }
.nav a { }
```

### 5. The `&` Selector

The `&` represents the parent selector. Use it for:

- **Pseudo-classes**: `&:hover`, `&:focus`, `&:active`
- **Pseudo-elements**: `&::before`, `&::after`
- **State variations**: `&.active`, `&.disabled`
- **Parent combinations**: `&:not(.disabled)`

```css
input {
  padding: 0.5rem;
  
  &:focus {
    outline: 2px solid blue;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* Using & with combinator for next sibling */
  & + .help-text {
    font-size: 0.875rem;
    color: gray;
  }
}
```

## File Organization Pattern

### Comments for Navigation

Use header comments to mark sections for easy scanning:

```css
/* ===== .page-shell (main) ===== */
.page-shell {
  /* styles */
  
  /* ===== .quiz-card (section) ===== */
  .quiz-card {
    /* styles */
  }
}
```

This pattern makes it trivial to find sections—either search by class name or follow the HTML hierarchy.

### Global Styles First

Order in files:
1. `:root` variables
2. Universal reset (`*`)
3. `body` and base elements
4. Hierarchical component nesting
5. Utility classes (`.hidden`, etc.)
6. Animations (`@keyframes`)
7. Media queries (at end)

## Best Practices Checklist

- [ ] CSS structure mirrors HTML DOM hierarchy
- [ ] Nesting depth ≤ 3-4 levels
- [ ] Pseudo-classes/pseudo-elements nested with `&`
- [ ] State modifiers nested (`.active`, `.disabled`, `.correct`)
- [ ] Only related elements nested together
- [ ] No unnecessary nesting for unrelated components
- [ ] Comments mark major sections with HTML element path
- [ ] Specificity kept intentionally low
- [ ] Media queries at end of file

## Browser Support

Native CSS nesting is supported in all modern browsers (2024+):
- Chrome 120+
- Firefox 117+
- Safari 17.2+
- Edge 120+

No preprocessor required—this is native CSS.

## Examples in This Project

### Progress Component
HTML path: `.page-shell` → `.quiz-card` → `#quiz-view` → `.progress-wrap` → `.progress-track` → `.progress-fill`

CSS:
```css
.page-shell {
  .quiz-card {
    #quiz-view {
      .progress-wrap {
        .progress-track {
          .progress-fill { }
        }
      }
    }
  }
}
```

### Form with Validation
```css
.answer-form {
  input {
    &:focus {
      outline: 2px solid blue;
    }
  }
  
  button {
    &:hover {
      transform: translateY(-1px);
    }
  }
}
```

## When to Break the Pattern

**Exception:** Global utility classes and animations may exist outside the hierarchy:

```css
/* Utility - not tied to specific element */
.hidden {
  display: none;
}

/* Animation - reused across components */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Media queries - scoped but global impact */
@media (max-width: 640px) {
  /* Override nested styles if needed */
}
```

## Quick Checklist for New Styles

1. **Find the element in HTML** → Note its path from root
2. **Open CSS file** → Navigate to matching hierarchy section
3. **Add styles** → Nest if pseudo-class/state, or add at appropriate level
4. **Test** → Verify styles apply correctly
5. **Keep hierarchy intact** → Don't flatten or reorganize existing structure
