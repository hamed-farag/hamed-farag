import Link from "next/link";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Twitter,
  Heart,
  ArrowUpRight,
  Mail,
  MapPin,
  Code2,
} from "lucide-react";

import { WaveDivider } from "@components/WaveDivider";

import { getUser } from "@services/user";
import { siteMetadata } from "@configs/siteMetadata";

export async function Footer() {
  const user = await getUser();

  if (!user) throw new Error("about.mdx not found");

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/posts" },
  ];

  const socialLinks = [
    { label: "GitHub", href: user.github, icon: Github },
    { label: "LinkedIn", href: user.linkedIn, icon: Linkedin },
    { label: "Twitter", href: user.twitter, icon: Twitter },
  ];

  const techStack = [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Shadcn/UI",
    "MDX",
  ];

  return (
    <>
      <WaveDivider />
      <footer className="relative overflow-hidden">
        {/* Subtle gradient backdrop */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ background: "var(--gradient-primary)" }}
        />

        <div className="relative w-11/12 md:w-2/3 mx-auto py-16" style={{ maxWidth: "68.75rem" }}>
          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-14">

            {/* Brand column */}
            <div className="md:col-span-5">
              <Link href="/" className="group inline-flex items-center gap-3 mb-5">
                <Image
                  src="/hf-logo.svg"
                  alt="logo"
                  className="dark:invert transition-transform duration-500 group-hover:rotate-12"
                  width={28}
                  height={22}
                />
                <span className="font-display font-bold text-xl gradient-text">
                  {siteMetadata.headerTitle}
                </span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-xs my-0">
                {siteMetadata.description}. Sharing thoughts on frontend
                engineering, tooling, and the craft of building for the web.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    aria-label={label}
                    className="group flex items-center justify-center w-9 h-9 rounded-full border border-border/60 text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary hover:shadow-md hover:-translate-y-0.5"
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation column */}
            <div className="md:col-span-3 md:col-start-7">
              <h4 className="font-display font-bold text-sm uppercase tracking-wider text-foreground mb-4 my-0">
                Navigation
              </h4>
              <ul className="space-y-2.5 list-none m-0 p-0">
                {navLinks.map(({ label, href }) => (
                  <li key={label} className="m-0 p-0">
                    <Link
                      href={href}
                      className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                    </Link>
                  </li>
                ))}
                <li className="m-0 p-0">
                  <Link
                    href={`mailto:${siteMetadata.email}`}
                    className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Built with column */}
            <div className="md:col-span-3">
              <h4 className="font-display font-bold text-sm uppercase tracking-wider text-foreground mb-4 my-0">
                Built With
              </h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground px-2.5 py-1 rounded-full border border-border/60 transition-colors duration-200 hover:border-primary/40 hover:text-foreground"
                  >
                    <Code2 className="w-3 h-3" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full mb-8" style={{ background: "var(--gradient-primary)", opacity: 0.2 }} />

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{user.name}</span>
              <span className="text-border">|</span>
              <span>{user.jobTitle}</span>
            </div>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground my-0">
              © {currentYear} · Made with
              <Heart className="w-3 h-3 text-accent fill-accent" />
              and a lot of
              <Code2 className="w-3 h-3 text-primary" />
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
