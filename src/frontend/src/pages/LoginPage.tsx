import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Sparkles, Star, Users } from "lucide-react";
import { useEffect } from "react";

const FEATURES = [
  {
    icon: BookOpen,
    title: "Thousands of Novels",
    desc: "Fantasy, Romance, Sci-Fi and more",
  },
  {
    icon: Users,
    title: "Friends & Community",
    desc: "See what your friends are reading",
  },
  {
    icon: Star,
    title: "Top 5 Rankings",
    desc: "Discover what's trending this week",
  },
  {
    icon: Sparkles,
    title: "Collaborative Writing",
    desc: "Co-author novels with friends",
  },
];

export default function LoginPage() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate({ to: "/" });
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-background flex" data-ocid="login.page">
      {/* Left Panel - Hero */}
      <div
        className="hidden lg:flex flex-1 flex-col justify-center items-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.06 260) 0%, oklch(0.12 0.03 280) 60%, oklch(0.15 0.05 180) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(/assets/generated/novelhub-hero.dim_1200x600.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 text-center max-w-md px-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-xl mx-auto mb-6">
            <BookOpen className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-5xl font-bold text-foreground mb-4 leading-tight">
            NovelHub
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Your universe of stories. Discover bestsellers, track your reading
            journey, and connect with a community that loves books as much as
            you do.
          </p>
        </div>
      </div>

      {/* Right Panel - Login */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-card/50">
        <div className="w-full max-w-md" data-ocid="login.card">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-display text-3xl font-bold">NovelHub</span>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold mb-2">
                Welcome back
              </h2>
              <p className="text-muted-foreground text-sm">
                Sign in to access your library, friends, and reading progress.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3 mb-8">
              {FEATURES.map((feat) => (
                <div key={feat.title} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <feat.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{feat.title}</p>
                    <p className="text-xs text-muted-foreground">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button
              className="w-full gap-2 bg-primary text-primary-foreground hover:opacity-90 h-11 text-base"
              onClick={() => login()}
              disabled={isLoading}
              data-ocid="login.submit_button"
            >
              {isLoading ? (
                <span className="animate-pulse">Connecting…</span>
              ) : (
                <>
                  <span>Continue with Internet Identity</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground mt-4">
              Secure, decentralized authentication — no passwords needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
