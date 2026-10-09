import Link from "next/link";
import { Home } from "pixelarticons/react/Home.js";
import { Article } from "pixelarticons/react/Article.js";
import { Briefcase } from "pixelarticons/react/Briefcase.js";
import { Mail } from "pixelarticons/react/Mail.js";
import { Coffee } from "pixelarticons/react/Coffee.js";
import { Github } from "pixelarticons/react/Github.js";
import { Linkedin } from "pixelarticons/react/Linkedin.js";
import { TwitterBird } from "pixelarticons/react/TwitterBird.js";
import { Heart } from "pixelarticons/react/Heart.js";

import { PixelIcon } from "@components/pixel";
import { siteMetadata } from "@configs/siteMetadata";

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Blog", href: "/posts", icon: Article },
  { label: "Works", href: "/works", icon: Briefcase },
  { label: "Hire Me", href: "/hire", icon: Mail },
];

const socialLinks = [
  { label: "GitHub", href: siteMetadata.github, icon: Github },
  { label: "LinkedIn", href: siteMetadata.linkedin, icon: Linkedin },
  { label: "Twitter", href: siteMetadata.twitter, icon: TwitterBird },
];

/** The footer as a strip of grass-topped ground. */
export function Ground() {
  const year = new Date().getFullYear();

  return (
    <footer className="lv-ground">
      <div className="mx-auto grid w-11/12 max-w-[68.75rem] gap-10 pb-12 pt-10 md:w-2/3 md:grid-cols-3">
        <nav aria-labelledby="ground-nav">
          <p id="ground-nav" className="px-hud-text m-0 mb-4 text-[10px] text-px-coin-light">
            Navigation
          </p>
          <ul className="m-0 grid list-none gap-3 p-0">
            {navLinks.map(({ label, href, icon }) => (
              <li key={href} className="p-0">
                <Link href={href} className="inline-flex items-center gap-2 underline">
                  <PixelIcon icon={icon} />
                  {label}
                </Link>
              </li>
            ))}
            <li className="p-0">
              <a href={`mailto:${siteMetadata.email}`} className="inline-flex items-center gap-2 underline">
                <PixelIcon icon={Mail} />
                Contact
              </a>
            </li>
            <li className="p-0">
              <a href="https://ko-fi.com/hamedfarag" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 underline">
                <PixelIcon icon={Coffee} />
                Support Me
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <p className="px-hud-text m-0 mb-4 text-[10px] text-px-coin-light">Find me</p>
          <ul className="m-0 flex list-none gap-3 p-0">
            {socialLinks.map(({ label, href, icon }) => (
              <li key={label} className="p-0">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="px-frame px-btn px-btn--hud"
                >
                  <PixelIcon icon={icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-sm">
          <p className="px-hud-text m-0 mb-4 text-[10px] text-px-coin-light">{siteMetadata.headerTitle}</p>
          <p className="m-0 mb-2">
            {siteMetadata.author} · {siteMetadata.jobTitle}
          </p>
          <p className="m-0 inline-flex items-center gap-2">
            © {year} · Made with
            <PixelIcon icon={Heart} label="love" className="text-px-love" />
          </p>
        </div>
      </div>
    </footer>
  );
}
