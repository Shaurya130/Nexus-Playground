import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 4L17 12L7 20V4Z" fill="white" />
                  <rect x="3" y="9" width="3" height="6" fill="white" />
                </svg>
              </div>

              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold">
                Nexus Playground
              </span>
            </div>

            <p className="text-muted-foreground">
              Next-generation media storage and optimization platform.
            </p>

            <div className="flex gap-4">
              <a
                href="https://github.com/Shaurya130"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Github className="h-4 w-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/shaurya-awasthi/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Linkedin className="h-4 w-4" />
              </a>

              <a
                href="mailto:shaurya.awasthi130@gmail.com"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold">Quick Links</h4>

            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="#features"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#how-it-works"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  How It Works
                </a>
              </li>

              <li>
                <Link
                  href="/sign-in"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Sign In
                </Link>
              </li>

              <li>
                <Link
                  href="/sign-up"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold">Contact</h4>

            <div className="space-y-3 text-muted-foreground">
              <p>Questions or feedback?</p>

              <a
                href="mailto:shaurya.awasthi130@gmail.com"
                className="block transition-colors hover:text-primary"
              >
                shaurya.awasthi130@gmail.com
              </a>

              <p>Built with ❤️ using Next.js, Clerk & Cloudinary.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/50 pt-8 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Nexus Playground. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}