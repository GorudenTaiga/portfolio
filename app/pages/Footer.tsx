import { GitHub, Discord, WhatsApp, Email } from "../components/icons";

interface SocialLink {
  icon: React.ReactNode;
  label: string;
  href: string;
  showPublic: boolean;
  showPrivate: boolean;
}

const SOCIALS: SocialLink[] = [
  {
    icon: <GitHub />,
    label: "GitHub",
    href: "https://github.com/GorudenTaiga",
    showPublic: true,
    showPrivate: true,
  },
  {
    icon: <Discord />,
    label: "Discord",
    href: "https://discordapp.com/users/goruden_taiga",
    showPublic: true,
    showPrivate: true,
  },
  {
    icon: <WhatsApp />,
    label: "WhatsApp",
    href: "https://wa.me/6287743160171",
    showPublic: true,
    showPrivate: true,
  },
  {
    icon: <Email />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/reza-arfana-rafi-301989272/",
    showPublic: false,
    showPrivate: true,
  },
];

interface FooterProps {
  displayName?: string;
  isPrivate?: boolean;
}

export default function Footer({
  displayName = "GorudenTaiga",
  isPrivate = false,
}: FooterProps) {
  const visibleSocials = SOCIALS.filter((s) =>
    isPrivate ? s.showPrivate : s.showPublic
  );

  // Wordmark shows the identity-appropriate label
  const wordmark = isPrivate ? "REZAAR" : "GORUDENTAIGA";

  return (
    <footer className="footer">
      <div className="container footer-row">
        <p className="mono muted">
          © {new Date().getFullYear()} {displayName}
        </p>
        <p className="footer-status">
          <span className="status-dot" aria-hidden="true" />
          Open to collaboration and freelance work.
        </p>
        <ul className="footer-social">
          {visibleSocials.map((s) => (
            <li key={s.label}>
              <a
                className="icon-btn"
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="wordmark" aria-hidden="true">
        {wordmark}
      </p>
    </footer>
  );
}
