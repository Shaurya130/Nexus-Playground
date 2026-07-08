"use client";

import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
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
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-4 md:flex">
            <SignedOut>
              <Button variant="ghost" asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>

              <Button
                asChild
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </SignedOut>

            <SignedIn>
              <Button variant="ghost" asChild>
                <Link href="/home">Dashboard</Link>
              </Button>

              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border/50 py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <a
                href="#features"
                onClick={closeMenu}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                onClick={closeMenu}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                How It Works
              </a>

              <div className="flex flex-col gap-2 pt-2">
                <SignedOut>
                  <Button variant="ghost" asChild onClick={closeMenu}>
                    <Link href="/sign-in">Sign In</Link>
                  </Button>

                  <Button
                    asChild
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    onClick={closeMenu}
                  >
                    <Link href="/sign-up">Get Started</Link>
                  </Button>
                </SignedOut>

                <SignedIn>
                  <Button variant="ghost" asChild onClick={closeMenu}>
                    <Link href="/home">Dashboard</Link>
                  </Button>

                  <div className="pt-2">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </SignedIn>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}