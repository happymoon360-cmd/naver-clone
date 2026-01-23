# Naver Blog Clone Project Rules

This file serves as the **SINGLE SOURCE OF TRUTH** for the AI agent when generating code.

## 1. Tech Stack Enforcement

- **Next.js**: Use App Router (`src/app`) exclusively. No Pages Router.
- **Tailwind CSS**: Use utility classes. Avoid `style={{}}` unless dynamic values are absolutely necessary.
- **TypeScript**: Strict type definitions required. No `any` type allowed.

## 2. Code Style & Convention

- **Naming**:
  - Components: `PascalCase.tsx`
  - Functions/Hooks: `camelCase.ts`
- **Structure**:
  - `src/components/common`: Reusable UI components (Button, Input, etc)
  - `src/components/layout`: Layout components (Header, Footer, Sidebar)
  - `src/components/post`: Post-specific components
- **Imports**: Use absolute imports `@/*`.

## 3. Pixel-Perfect UI Rules

- **Color Constants**:
  - Main Green: `#00C73C` (Naver Green)
  - Border Gray: `#EBEBEB`
  - Background Gray: `#F9F9F9`
  - Text Black: `#333333`
- **Typography**:
  - Base font size: `16px`
  - Line height: `1.6` for body text
- **Spacing**:
  - Base unit: `4px` (Tailwind default)
  - Padding/Margin: Use standard Tailwind classes (`p-4`, `m-2`) primarily.

## 4. Agent Behavior

- **Mock Data**: Create generic mock data for posts and comments. Do not implement backend APIs.
- **Accessibility**: Ensure semantic HTML (`<header>`, `<main>`, `<article>`, `<footer>`).
