import { useCallback, useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import { LanguageProvider } from "./i18n/LanguageProvider";
import { Intro, hasSeenIntro, markIntroSeen } from "./components/Intro";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Workflow } from "./components/Workflow";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Education } from "./components/Education";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

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
      <div id="top" className="min-h-screen bg-white pb-20 lg:pb-0">
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
          <About />
          <Skills />
          <Workflow />
          <Experience />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
