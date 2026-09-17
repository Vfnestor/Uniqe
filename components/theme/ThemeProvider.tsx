"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme =
  | "dark"
  | "light";

type ThemeContextType = {
  theme: Theme;
  setTheme: (
    theme: Theme,
  ) => void;
};

const ThemeContext =
  createContext<
    ThemeContextType | undefined
  >(undefined);

const STORAGE_KEY =
  "uniqe-theme";

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setThemeState] =
    useState<Theme>("dark");

  useEffect(() => {
    const savedTheme =
      window.localStorage.getItem(
        STORAGE_KEY,
      );

    if (
      savedTheme === "dark" ||
      savedTheme === "light"
    ) {
      setThemeState(
        savedTheme,
      );
    }
  }, []);

  useEffect(() => {
    const root =
      document.documentElement;

    root.dataset.theme =
      theme;

    root.style.colorScheme =
      theme;
  }, [theme]);

  const setTheme = (
    nextTheme: Theme,
  ) => {
    setThemeState(
      nextTheme,
    );

    window.localStorage.setItem(
      STORAGE_KEY,
      nextTheme,
    );

    document.documentElement.dataset.theme =
      nextTheme;

    document.documentElement.style.colorScheme =
      nextTheme;
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context =
    useContext(
      ThemeContext,
    );

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider",
    );
  }

  return context;
}
