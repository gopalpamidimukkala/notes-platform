import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { ThemeToggle } from "@/components/common/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="text-xl font-bold tracking-tight">
          MemoStack
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Button asChild variant="outline">
            <Link to="/login">Login</Link>
          </Button>

          <Button asChild>
            <Link to="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
