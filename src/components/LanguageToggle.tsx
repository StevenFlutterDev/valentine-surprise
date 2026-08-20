"use client";

import { motion } from "motion/react";
import { useLocale } from "@/lib/i18n";

/**
 * A small EN / 中文 switch, pinned top-right so she can choose her
 * language before she even opens the intro.
 */
export default function LanguageToggle() {
  const { locale, copy, toggle } = useLocale();

  return (
    <motion.button
      type="button"
      onClick={toggle}
      data-no-hearts
      aria-label={copy.ui.switchAria}
      title={copy.ui.switchAria}
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.94 }}
      className="fixed right-4 top-[max(1rem,env(safe-area-inset-top))] z-[60] cursor-pointer rounded-full border border-gold-400/35 bg-wine-900/55 px-4 py-2 text-[0.7rem] tracking-[0.18em] text-gold-300 backdrop-blur-md transition-colors duration-300 hover:border-gold-300 hover:bg-rose-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 sm:right-6 sm:top-6 sm:px-5 sm:py-2.5 sm:text-xs"
    >
      <span className="flex items-center gap-2">
        <svg
          className="h-3.5 w-3.5 opacity-70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
        </svg>
        {/* the label is the language it switches TO */}
        <span className={locale === "en" ? "font-display text-sm" : ""}>
          {copy.ui.switchLabel}
        </span>
      </span>
    </motion.button>
  );
}
