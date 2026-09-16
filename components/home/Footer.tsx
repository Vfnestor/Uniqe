import Link from "next/link";

const links = [
  { label: "UApps", href: "/uapps" },
  { label: "UWeb", href: "/uweb" },
  { label: "UShop", href: "/ushop" },
  { label: "USchool", href: "/uschool" },
  { label: "UCore", href: "/ucore" },
  { label: "LAB", href: "/lab" },
  { label: "My U", href: "/my-u" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <Link href="/" className="footer-brand">
            <span className="brand-mark">U</span>
            <span>UNIqe</span>
          </Link>

          <div className="footer-links">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} UNIqe
          </span>

          <span>
            Built as an evolving ecosystem.
          </span>
        </div>
      </div>
    </footer>
  );
}