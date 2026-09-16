"use client";

import { useState } from "react";
import Link from "next/link";

const navigation = [
  { label: "UApps", href: "/uapps" },
  { label: "UWeb", href: "/uweb" },
  { label: "UShop", href: "/ushop" },
  { label: "USchool", href: "/uschool" },
  { label: "UCore", href: "/ucore" },
  { label: "LAB", href: "/lab" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link
          href="/"
          className="brand"
          aria-label="UNIqe Home"
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark">U</span>
          <span className="brand-name">UNIqe</span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="navbar-actions">
          <Link
            href="/my-u"
            className="my-u-button"
          >
            My U
          </Link>

          <button
            type="button"
            className={`menu-button ${open ? "active" : ""}`}
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mobile-nav-link"
              onClick={() => setOpen(false)}
            >
              <span>{item.label}</span>
              <span>↗</span>
            </Link>
          ))}

          <Link
            href="/my-u"
            className="mobile-nav-link mobile-my-u"
            onClick={() => setOpen(false)}
          >
            <span>My U</span>
            <span>↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}