import Link from "next/link";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

import "./footer.css";

const links = [
  {
    label: "UApps",
    href: "/uapps",
  },
  {
    label: "UWeb",
    href: "/uweb",
  },
  {
    label: "UShop",
    href: "/ushop",
  },
  {
    label: "USchool",
    href: "/uschool",
  },
  {
    label: "UCore",
    href: "/ucore",
  },
  {
    label: "LAB",
    href: "/lab",
  },
  {
    label: "My U",
    href: "/my-u",
  },
];

export default function Footer() {
  return (
    <footer className="home-footer">
      <Container>
        <Reveal animation="up">
          <div className="home-footer-main">
            <div className="home-footer-brand">
              <Link
                href="/"
                className="home-footer-logo"
              >
                Uniqe
              </Link>

              <p className="home-footer-description">
                A digital ecosystem for building,
                connecting and exploring.
              </p>
            </div>

            <nav
              className="home-footer-nav"
              aria-label="Uniqe ecosystem"
            >
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="home-footer-link"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </Reveal>

        <div className="home-footer-bottom">
          <span>
            © {new Date().getFullYear()} Uniqe
          </span>

          <span>
            Built as an evolving ecosystem.
          </span>
        </div>
      </Container>
    </footer>
  );
}