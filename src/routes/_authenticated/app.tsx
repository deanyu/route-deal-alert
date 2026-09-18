import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { BellRing, LogOut, Plane } from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({
    meta: [
      { title: "Dashboard — Flight Price Notifier" },
      { name: "description", content: "Your Flight Price Notifier dashboard." },
      { property: "og:title", content: "Dashboard — Flight Price Notifier" },
      { property: "og:description", content: "Your route tracking dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AppPage,
});

function AppPage() {
  const navigate = useNavigate();
  const { user } = Route.useRouteContext();

  async function handleSignOut() {
    await supabase.auth.signOut();
    await navigate({ to: "/sign-in", replace: true });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/40">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3 font-semibold">
            <span className="flex size-9 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary"><Plane className="size-4 -rotate-12" /></span>
            <span className="hidden sm:inline">Flight Price Notifier</span>
            <span className="sm:hidden">FPN</span>
          </Link>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut /> Sign Out
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="animate-rise">
          <p className="text-sm font-medium text-primary">DASHBOARD / 儀表板</p>
          <h1 className="mt-4 break-all text-3xl font-semibold sm:text-5xl">Hi {user.email}</h1>
        </div>

        <div className="mt-12 max-w-3xl border border-border bg-card p-7 shadow-panel sm:p-10">
          <span className="flex size-12 items-center justify-center rounded-md bg-accent-soft text-primary"><BellRing className="size-5" /></span>
          <h2 className="mt-8 text-2xl font-semibold leading-relaxed">你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。</h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">Your dashboard is coming soon. Route-subscription will be added in the next milestone.</p>
        </div>
      </main>
    </div>
  );
}