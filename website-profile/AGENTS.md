# AGENTS.md

## Project

One-page professional portfolio for **Irvan Hidayat — Quality Assurance Engineer**.

- Stack: Vite + React + TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`, tokens in `src/index.css` via `@theme`), `motion` (imports from `motion/react`), `lucide-react`, `@fontsource/inter` + `@fontsource/jetbrains-mono`.
- No router (single page, smooth-scroll anchors), no backend.
- Design: clean white "test report" theme — white / `#fafafa` (`bg-surface`) alternating sections, slate-900 headings, slate-600 body, blue-600 primary, emerald-500 success, rounded-2xl cards, slate-200 borders, soft shadows.

## Rules (must follow)

1. **All visible text comes from `src/data/content.ts`, in BOTH languages (`en` and `id`).** Never hardcode user-facing strings in components. The `Content` interface enforces identical shape per language — extend it there first.
2. **Never invent numbers, metrics, achievements, or experience.** Facts come only from the CV (`public/CV_Irvan_Hidayat_QA_Engineer.pdf`) or user-provided data.
3. **Keep the white theme.** No dark sections. Accent colors: blue-600 (primary), emerald-500 (success); amber (`Badge` variant `warning`) is used ONLY for "learning" status badges.
4. **Mobile-first responsive.** Design for small screens first, then `sm:`/`md:` up. Max content width via `.container-site`.
5. **Respect `prefers-reduced-motion`.** Use `useReducedMotion()` from `motion/react` for JS animations; smooth scroll is already disabled via CSS media query.
6. **Run `npm run build` and fix all errors before finishing any task.**

## Structure

```
src/
  components/        section components (Navbar, Hero, About, …, Footer, Intro)
    ui/              reusable primitives (Section, Badge, Card, Reveal, BrandIcons)
  data/content.ts    ALL visible text, typed per language
  i18n/              language.ts (types/detection), LanguageProvider.tsx, useLanguage.ts
  hooks/             shared hooks (useActiveSection, useFocusTrap)
```

## Commands

- `npm run dev` — dev server
- `npm run build` — type-check (`tsc -b`) + production build
- `npm run preview` — preview production build
