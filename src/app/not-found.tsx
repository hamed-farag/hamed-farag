import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Header } from "@components/Header";
import { Footer } from "@components/Footer";

// Rendered outside the route groups, so it brings the classic chrome itself
// (the "Lost in the Woods" level replaces this in a later phase).
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="main">
        <section className="flex gap-5 flex items-center justify-center my-4 md:my-20">
          <h1 className="text-6xl md:text-8xl">404</h1>
          <div>
            <p className="text-xl md:text-3xl">
              Sorry we could&apos;t find this page.
            </p>
            <p>
              But dont worry, you can find plenty of other things on our homepage.
            </p>
            <p>
              <Link
                href="/"
                className="group block text-muted-foreground hover:text-primary transition-colors"
              >
                <small>
                  <ArrowLeft className="inline-block h-4 w-4 transition-all group-hover:-translate-x-1" />{" "}
                  Back to homepage
                </small>
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
