import { Header } from "@components/Header";
import { Footer } from "@components/Footer";

import "../layout.css";

// Pages that haven't moved to the 16-bit level shell yet keep the original chrome.
export default function ClassicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
}
