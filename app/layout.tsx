import type { Metadata } from "next";

import "./globals.css";
import "./responsive.css";
import "./animations.css";

import "@/components/theme/theme.css";
import "@/components/i18n/i18n.css";
import "@/components/navigation/global-header.css";

import "@/components/notifications/notifications.css";
import "@/components/favorites/favorites.css";
import "@/components/states/states.css";

import {
  ThemeProvider,
} from "@/components/theme/ThemeProvider";

import {
  LanguageProvider,
} from "@/components/i18n/LanguageProvider";

import GlobalHeader from "@/components/navigation/GlobalHeader";

import CommandPaletteGlobal from "@/components/command/CommandPaletteGlobal";

export const metadata: Metadata = {
  title: "Uniqe",
  description:
    "Uniqe — A connected digital ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <GlobalHeader />

            {children}

            <CommandPaletteGlobal />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}