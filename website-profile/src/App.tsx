import { lazy, Suspense, useCallback, useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import { LanguageProvider } from "./i18n/LanguageProvider";
import { Intro, hasSeenIntro, markIntroSeen } from "./components/Intro";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";

const About = lazy(() => import("./components/About").then((m) => ({ default: m.About })));
const Skills = lazy(() => import("./components/Skills").then((m) => ({ default: m.Skills })));
const Workflow = lazy(() => import("./components/Workflow").then((m) => ({ default: m.Workflow })));
const Experience = lazy(() => import("./components/Experience").then((m) => ({ default: m.Experience })));
const Projects = lazy(() => import("./components/Projects").then((m) => ({ default: m.Projects })));
const Education = lazy(() => import("./components/Education").then((m) => ({ default: m.Education })));
const Contact = lazy(() => import("./components/Contact").then((m) => ({ default: m.Contact })));
const Footer = lazy(() => import("./components/Footer").then((m) => ({ default: m.Footer })));

export default function App() {
  const reduceMotion = useReducedMotion();
  // Intro shows once per browser session and never for reduced-motion users.
  const [introDone, setIntroDone] = useState(() => reduceMotion === true || hasSeenIntro());

  const handleIntroComplete = useCallback(() => {
    markIntroSeen();
    setIntroDone(true);
  }, []);

  return (
    <LanguageProvider>
      <div id="top" className="min-h-screen bg-white">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to main content
        </a>
        <AnimatePresence>
          {introDone ? null : <Intro key="intro" onComplete={handleIntroComplete} />}
        </AnimatePresence>
        <Navbar />
        <main id="main">
          <Hero active={introDone} />
          <Suspense fallback={null}>
            <About />
            <Skills />
            <Workflow />
            <Experience />
            <Projects />
            <Education />
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </LanguageProvider>
  );
}
