import { Link, createFileRoute } from "@tanstack/react-router";
import { BellRing, Eye, Plane, Power, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import heroImage from "@/assets/taipei-night-flight.jpg";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flight Price Notifier — 機票降價通知" },
      { name: "description", content: "設定航線與目標價，台北出發的機票降價就寄 email 通知你。" },
      { property: "og:title", content: "Flight Price Notifier — 機票降價通知" },
      { property: "og:description", content: "設定航線與目標價，機票降價就通知你。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  const features = [
    { icon: Eye, number: "01", title: "盯緊熱門航線", english: "Always-on route watching", body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。" },
    { icon: BellRing, number: "02", title: "達標自動通知", english: "Target-price email alerts", body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。" },
    { icon: Power, number: "03", title: "隨時取消", english: "Cancel anytime", body: "月訂閱制，不想用隨時停，沒有綁約。" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-30 border-b border-border/70">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-3 font-semibold">
            <span className="flex size-9 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary"><Plane className="size-4 -rotate-12" /></span>
            <span className="hidden sm:inline">Flight Price Notifier</span>
            <span className="sm:hidden">FPN</span>
          </Link>
          <Button asChild variant="outline" className="border-primary/40 bg-background/30 backdrop-blur-sm hover:bg-primary/10">
            <Link to="/sign-in">Sign in / 登入 <ArrowRight /></Link>
          </Button>
        </div>
      </header>

      <main>
        <section className="relative flex min-h-[760px] items-center overflow-hidden pb-20 pt-32 sm:min-h-[820px]">
          <img src={heroImage} alt="Flight over Taipei at night" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="hero-vignette absolute inset-0" />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
            <div className="max-w-3xl animate-rise">
              <div className="mb-7 inline-flex items-center gap-2 border border-primary/30 bg-background/55 px-3 py-2 text-xs font-medium text-primary backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-primary" />
                TPE → TOKYO · SEOUL
              </div>
              <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-primary">機票降價通知</p>
              <h1 className="text-5xl font-semibold leading-[1.02] sm:text-7xl lg:text-8xl">Flight Price<br />Notifier</h1>
              <p className="mt-8 max-w-2xl text-2xl font-medium leading-relaxed text-foreground sm:text-3xl">設定航線與目標價，<br className="hidden sm:block" />機票降價就通知你</p>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">Set a route and a target price — we email you when the fare drops.</p>
              <Button asChild variant="hero" size="xl" className="mt-9">
                <Link to="/sign-up">Start watching fares <ArrowRight /></Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-14 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">How it works</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">你只管預算，我們負責盯票。</h2>
            </div>
            <div className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <article key={feature.title} className="animate-rise bg-card p-7 sm:p-9" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="mb-16 flex items-start justify-between">
                      <span className="flex size-11 items-center justify-center rounded-md bg-accent-soft text-primary"><Icon className="size-5" /></span>
                      <span className="font-mono text-xs text-muted-foreground">{feature.number}</span>
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="mt-1 text-sm font-medium text-primary">{feature.english}</p>
                    <p className="mt-5 text-sm leading-7 text-muted-foreground">{feature.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© 2026 Flight Price Notifier</span>
          <span>Taipei · Taiwan</span>
        </div>
      </footer>
    </div>
  );
}
