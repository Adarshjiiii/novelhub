import type { ReactNode } from "react";
import { Header } from "./Header";
import { FriendSidebar } from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  withSidebar?: boolean;
}

export function Layout({ children, withSidebar = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1 container mx-auto px-4 py-6 gap-6">
        <main className="flex-1 min-w-0">{children}</main>
        {withSidebar && <FriendSidebar />}
      </div>
      <footer className="border-t border-border bg-card/80 py-6">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-foreground">
              NovelHub
            </span>
            <span>— Discover, Read & Connect</span>
          </div>
          <p>
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
