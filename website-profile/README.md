# Irvan Hidayat — Quality Assurance Engineer Portfolio

A clean, bilingual (English / Indonesian), one-page professional portfolio built as a static Vite site.

**Live site:** (add your Vercel URL here after deploying)

---

## Tech stack

- **Framework:** [Vite](https://vitejs.dev/) + [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with custom design tokens
- **Animation:** [Motion](https://motion.dev/) (formerly Framer Motion)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Fonts:** Inter (body) + JetBrains Mono (mono)
- **Deployment:** [Vercel](https://vercel.com/) (static Vite build)

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (the project was developed with Node v24 + npm 12)

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

The static site is output to the `dist/` folder.

### Preview the production build locally

```bash
npm run preview
```

Open [http://localhost:4173](http://localhost:4173).

---

## Editing content

All visible text lives in **`src/data/content.ts`** and is provided in both `en` and `id`. The `Content` type enforces the same shape for both languages, so if you add a key in one language you must add it in the other.

Common things to update:

- **Personal info:** edit constants at the top of `src/data/content.ts` (`NAME`, `EMAIL`, `LOCATION`, etc.).
- **Sections:** each section (Hero, About, Skills, Experience, Projects, Education, Contact, Footer) has matching keys in the `en` and `id` objects.
- **CV / photo:** replace the files in `public/`:
  - `CV_Irvan_Hidayat_QA_Engineer.pdf`
  - `profile-320.jpg` (optimized avatar)
  - `og.png` (social preview image)
- **Social links:** uncomment the LinkedIn/GitHub buttons in `src/components/Hero.tsx` and `src/components/Contact.tsx`, then replace the `REPLACE_ME` URLs in `src/data/content.ts`.

### Language switching

The site detects the visitor's language from `localStorage` (if they switched before) or `navigator.language`. Toggle the language with the **EN / ID** buttons in the navbar. The active language is persisted in the browser.

---

## Deployment on Vercel

This project is configured for a standard **static Vite** deployment.

### Import from GitHub (recommended)

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel should auto-detect **Vite**. If not, use these settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. If this repository contains multiple projects and `website-profile` is a subfolder, set:
   - **Root Directory:** `website-profile`
5. Click **Deploy**.

After the first deploy, Vercel will automatically rebuild and redeploy on every push to the main branch.

---

## Project structure

```
website-profile/
├── public/                 # Static assets (CV, photo, og image, favicon)
├── src/
│   ├── components/         # Page sections + reusable UI primitives
│   ├── data/content.ts     # All visible text in EN and ID
│   ├── hooks/              # Shared hooks (active section, focus trap)
│   ├── i18n/               # Language detection, context, and hook
│   ├── index.css           # Tailwind v4 theme tokens
│   ├── App.tsx             # Page layout + lazy loading
│   └── main.tsx            # Entry point
├── index.html              # HTML shell, SEO tags, favicon
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## License

This is a personal portfolio project. Content and assets belong to Irvan Hidayat.
