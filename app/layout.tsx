import type { Metadata } from "next";

import "./globals.css";
import "./responsive.css";
import "./animations.css";
import "@/components/notifications/notifications.css";
import "@/components/favorites/favorites.css";
import "@/components/states/states.css";

import { ThemeProvider } from "@/components/theme/ThemeProvider";
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
          <CommandPaletteGlobal />
        </ThemeProvider>
      </body>
    </html>
  );
}
