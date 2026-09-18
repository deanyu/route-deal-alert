import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, LoaderCircle, Mail, Plane } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

type AuthMode = "sign-in" | "sign-up";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isSignIn = mode === "sign-in";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const result = isSignIn
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });

    if (result.error) {
      setMessage(result.error.message);
      setLoading(false);
      return;
    }

    await navigate({ to: "/app", replace: true });
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-12">
      <div className="auth-grid absolute inset-0" aria-hidden="true" />
      <div className="relative z-10 w-full max-w-md animate-rise">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>

        <div className="border border-border bg-card p-6 shadow-panel sm:p-8">
          <div className="mb-8 flex size-11 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
            <Plane className="size-5 -rotate-12" />
          </div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
            Flight Price Notifier
          </p>
          <h1 className="text-3xl font-semibold text-foreground">
            {isSignIn ? "歡迎回來" : "建立你的帳號"}
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {isSignIn
              ? "登入後查看你的航線追蹤狀態。"
              : "開始設定預算，讓低價機票主動找上你。"}
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-11 pl-10"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete={isSignIn ? "current-password" : "new-password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-11"
                minLength={6}
                placeholder="At least 6 characters"
                required
              />
            </div>

            {message ? (
              <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {message}
              </p>
            ) : null}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : null}
              {isSignIn ? "Sign in / 登入" : "Sign up / 註冊"}
              {!loading ? <ArrowRight /> : null}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isSignIn ? "還沒有帳號？" : "已經有帳號？"}{" "}
            <Link
              to={isSignIn ? "/sign-up" : "/sign-in"}
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              {isSignIn ? "立即註冊" : "前往登入"}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}