import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/context/ThemeContext";
import { useMyProfile } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Bell,
  BookOpen,
  Home,
  Library,
  LogOut,
  Menu,
  Moon,
  PenSquare,
  Search,
  Sun,
  TrendingUp,
  User,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/library", label: "Library", icon: Library },
  { to: "/friends", label: "Friends", icon: Users },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, login, logout, principal } = useAuth();
  const { data: myProfile } = useMyProfile();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate({ to: "/library", search: { q: searchValue } } as never);
      setSearchValue("");
    }
  };

  const shortPrincipal = principal
    ? `#${principal.slice(-6).toUpperCase()}`
    : "";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md shadow-elevated">
      <div className="container mx-auto flex h-16 items-center gap-4 px-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
          data-ocid="header.logo_link"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-lg">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            NovelHub
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 ml-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
              activeProps={{ className: "text-foreground bg-muted" }}
              data-ocid={`header.nav_${link.label.toLowerCase()}_link`}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-md ml-auto"
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search novels, authors, genres…"
              className="pl-9 bg-muted border-transparent focus:border-primary/50 focus:bg-background"
              data-ocid="header.search_input"
            />
          </div>
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-2 ml-auto md:ml-2">
          {/* Trending shortcut */}
          <Link
            to="/"
            className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium text-secondary hover:bg-secondary/10 transition-colors duration-200"
            data-ocid="header.trending_link"
          >
            <TrendingUp className="h-3.5 w-3.5" />
            Top 5
          </Link>

          {/* Notification Bell */}
          {isAuthenticated && (
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Notifications"
              data-ocid="header.notifications_button"
            >
              <Bell className="h-5 w-5" />
            </Button>
          )}

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            data-ocid="header.theme_toggle"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Auth */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  data-ocid="header.user_menu_button"
                >
                  <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                    SJ
                  </div>
                  <span className="hidden lg:block text-xs text-muted-foreground">
                    {shortPrincipal}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/profile" data-ocid="header.profile_link">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/library" data-ocid="header.library_link">
                    <Library className="mr-2 h-4 w-4" /> My Library
                  </Link>
                </DropdownMenuItem>
                {myProfile?.isAuthor && (
                  <DropdownMenuItem asChild>
                    <Link
                      to="/author-dashboard"
                      data-ocid="header.author_dashboard_link"
                    >
                      <PenSquare className="mr-2 h-4 w-4 text-accent" />
                      <span className="author-badge">Author Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  data-ocid="header.logout_button"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              size="sm"
              onClick={() => login()}
              className="bg-primary text-primary-foreground hover:opacity-90"
              data-ocid="header.login_button"
            >
              Sign In
            </Button>
          )}

          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-ocid="header.mobile_menu_button"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-3 space-y-1 animate-slide-in">
          <form onSubmit={handleSearch} className="mb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search novels…"
                className="pl-9 bg-muted"
              />
            </div>
          </form>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
              data-ocid={`header.mobile_nav_${link.label.toLowerCase()}_link`}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
