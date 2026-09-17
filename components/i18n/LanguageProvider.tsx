"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  translations,
  type Language,
} from "./translations";

const STORAGE_KEY = "uniqe-language";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationDictionary;
};

type TranslationDictionary =
  (typeof translations)[Language];

const LanguageContext =
  createContext<
    LanguageContextType | undefined
  >(undefined);

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguageState] =
    useState<Language>("fa");

  useEffect(() => {
    const saved =
      window.localStorage.getItem(
        STORAGE_KEY,
      ) as Language | null;

    if (
      saved === "fa" ||
      saved === "en"
    ) {
      setLanguageState(saved);
    }
  }, []);

  useEffect(() => {
    const root =
      document.documentElement;

    root.lang = language;
    root.dir =
      language === "fa"
        ? "rtl"
        : "ltr";

    root.dataset.language =
      language;
  }, [language]);

  const setLanguage = (
    nextLanguage: Language,
  ) => {
    setLanguageState(nextLanguage);

    window.localStorage.setItem(
      STORAGE_KEY,
      nextLanguage,
    );
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language],
    }),
    [language],
  );

  return (
    <LanguageContext.Provider
      value={value}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context =
    useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider",
    );
  }

  return context;
}