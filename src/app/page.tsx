"use client";

import { useState } from "react";
import { LocaleProvider } from "@/lib/i18n";
import Intro from "@/components/Intro";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Sections from "@/components/Sections";
import Years from "@/components/Years";
import LoveLetter from "@/components/LoveLetter";
import Finale from "@/components/Finale";
import HeartLayer from "@/components/HeartLayer";
import MusicToggle from "@/components/MusicToggle";
import LanguageToggle from "@/components/LanguageToggle";

export default function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <LocaleProvider>
      <Intro onEnter={() => setEntered(true)} />

      <main className="page-glow relative min-h-screen w-full overflow-x-hidden">
        <Hero started={entered} />
        <Stats />
        <Sections />
        <Years />
        <LoveLetter />
        <Finale />
      </main>

      <HeartLayer active={entered} />
      <MusicToggle autoStart={entered} />
      <LanguageToggle />
    </LocaleProvider>
  );
}
