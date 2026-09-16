import type { Metadata } from "next";

import "./globals.css";
import "./placeholder.css";
import "./responsive.css";

import "@/components/ui/ui.css";
import "@/components/theme/theme.css";

import { ThemeProvider } from "@/components/theme/ThemeProvider";

export const metadata: Metadata = {
  title: {
    default: "Uniqe",
    template: "%s | Uniqe",
  },

  description:
    "Uniqe — a digital ecosystem for apps, web, commerce, education, technology and innovation.",

  keywords: [
    "Uniqe",
    "UApps",
    "UWeb",
    "UShop",
    "USchool",
    "UCore",
    "LAB",
    "My U",
  ],

  applicationName: "Uniqe",

  authors: [
    {
      name: "Uniqe",
    },
  ],

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}