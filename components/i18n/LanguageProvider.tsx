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
  type TranslationDictionary,
} from "./translations";

const STORAGE_KEY =
  "uniqe-language";

type LanguageContextType = {
  language: Language;
  setLanguage: (
    language: Language,
  ) => void;
  t: TranslationDictionary;
};

const LanguageContext =
  createContext<
    LanguageContextType | undefined
  >(undefined);

function translateText(
  value: string,
  language: Language,
): string {
  if (
    language === "en" ||
    !value.trim()
  ) {
    return value;
  }

  const dictionary =
    translations.fa.text as Record<
      string,
      string
    >;

  const exact =
    dictionary[value.trim()];

  if (exact) {
    const leading =
      value.match(/^\s*/)?.[0] || "";

    const trailing =
      value.match(/\s*$/)?.[0] || "";

    return (
      leading +
      exact +
      trailing
    );
  }

  return value;
}

function translateAttributes(
  root: HTMLElement,
  language: Language,
) {
  const elements =
    root.querySelectorAll<HTMLElement>(
      "[title], [aria-label], [placeholder]",
    );

  elements.forEach(
    (element) => {
      const attributes = [
        "title",
        "aria-label",
        "placeholder",
      ];

      attributes.forEach(
        (attribute) => {
          const current =
            element.getAttribute(
              attribute,
            );

          if (!current) {
            return;
          }

          const key =
            `data-i18n-${attribute}`;

          const original =
            element.getAttribute(
              key,
            ) || current;

          element.setAttribute(
            key,
            original,
          );

          const translated =
            language === "fa"
              ? translateText(
                  original,
                  language,
                )
              : original;

          element.setAttribute(
            attribute,
            translated,
          );
        },
      );
    },
  );
}

function translateDom(
  language: Language,
) {
  if (
    typeof document === "undefined"
  ) {
    return;
  }

  const root =
    document.body;

  if (!root) {
    return;
  }

  const walker =
    document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
    );

  const nodes: Text[] = [];

  let current =
    walker.nextNode();

  while (current) {
    const textNode =
      current as Text;

    const parent =
      textNode.parentElement;

    if (
      parent &&
      ![
        "SCRIPT",
        "STYLE",
        "NOSCRIPT",
      ].includes(
        parent.tagName,
      )
    ) {
      nodes.push(textNode);
    }

    current =
      walker.nextNode();
  }

  nodes.forEach(
    (textNode) => {
      const currentValue =
        textNode.nodeValue || "";

      const originalAttribute =
        "data-i18n-original";

      let original =
        textNode.parentElement?.getAttribute(
          originalAttribute,
        );

      /*
       * Text nodes are individually marked so that
       * switching back to English always restores
       * the original source text.
       */
      const nodeKey =
        "data-i18n-node";

      if (
        !textNode.parentElement?.hasAttribute(
          nodeKey,
        )
      ) {
        textNode.parentElement?.setAttribute(
          nodeKey,
          "true",
        );

        textNode.parentElement?.setAttribute(
          originalAttribute,
          currentValue,
        );

        original =
          currentValue;
      }

      if (!original) {
        original =
          currentValue;
      }

      const translated =
        language === "fa"
          ? translateText(
              original,
              language,
            )
          : original;

      if (
        currentValue !== translated
      ) {
        textNode.nodeValue =
          translated;
      }
    },
  );

  translateAttributes(
    root,
    language,
  );
}

export function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [
    language,
    setLanguageState,
  ] = useState<Language>("fa");

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

    translateDom(language);

    const observer =
      new MutationObserver(() => {
        translateDom(language);
      });

    observer.observe(
      document.body,
      {
        childList: true,
        subtree: true,
      },
    );

    return () => {
      observer.disconnect();
    };
  }, [language]);

  const setLanguage = (
    nextLanguage: Language,
  ) => {
    setLanguageState(
      nextLanguage,
    );

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