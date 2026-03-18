import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex gap-5 flex items-center justify-center w-100 my-4 md:my-20">
      <h1 className="text-6xl md:text-8xl">404</h1>
      <p>
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
      </p>
    </section>
  );
}
