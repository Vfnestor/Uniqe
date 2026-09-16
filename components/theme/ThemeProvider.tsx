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
  | "light"
  | "system";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext =
  createContext<ThemeContextType | undefined>(
    undefined,
  );

const STORAGE_KEY = "uniqe-theme";

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setThemeState] =
    useState<Theme>("system");

  useEffect(() => {
    const savedTheme =
      window.localStorage.getItem(
        STORAGE_KEY,
      ) as Theme | null;

    if (
      savedTheme === "dark" ||
      savedTheme === "light" ||
      savedTheme === "system"
    ) {
      setThemeState(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root =
      document.documentElement;

    root.dataset.theme = theme;
  }, [theme]);

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme);

    window.localStorage.setItem(
      STORAGE_KEY,
      nextTheme,
    );
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
    useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider",
    );
  }

  return context;
}