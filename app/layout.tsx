import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "UNIqe",
    template: "%s | UNIqe",
  },
  description:
    "UNIqe — a digital ecosystem for apps, web, commerce, education, technology and innovation.",
  keywords: [
    "UNIqe",
    "UApps",
    "UWeb",
    "UShop",
    "USchool",
    "UCore",
    "LAB",
    "My U",
  ],
  applicationName: "UNIqe",
  authors: [
    {
      name: "UNIqe",
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}