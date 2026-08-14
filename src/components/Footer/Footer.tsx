import Link from "next/link";

import { getUser } from "@services/user";

export async function Footer() {
  const user = await getUser();
  if (!user) throw new Error("about.mdx not found");

  return (
    <footer className="editorial-footer">
      <Link href="/" className="footer-wordmark"><span>HF</span><strong>HAMED FARAG</strong></Link>
      <p>LEAD AI FRONTEND ENGINEER<br />FRONTEND ARCHITECT<br />RIYADH ↔ EVERYWHERE</p>
      <nav aria-label="Social links">
        <a href={user.github} target="_blank" rel="noreferrer">GITHUB ↗</a>
        <a href={user.linkedIn} target="_blank" rel="noreferrer">LINKEDIN ↗</a>
        <a href={user.twitter} target="_blank" rel="noreferrer">X / TWITTER ↗</a>
      </nav>
      <p className="footer-fineprint">© {new Date().getFullYear()} HAMED FARAG<br />BUILT WITH CURIOSITY<br />AND TOO MUCH COFFEE.</p>
    </footer>
  );
}
