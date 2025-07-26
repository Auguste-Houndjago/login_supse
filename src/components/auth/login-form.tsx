"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import { CardHeader } from "../design/LoginCardHeader";
import { BGPattern } from "../design/BGPattern";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex  w-full border justify-center items-center">
      <CardHeader
    title="Login"
    description="Connectez vous avec votre compte"
  />
      </div>

      {/* Remplacement du <Card> par une simple div */}
      <div className="rounded relative border bg-background text-foreground shadow-sm">

        <div className="border-b p-6">

          <h2 className="text-2xl font-semibold leading-none tracking-tight" />
   
          <p className="text-sm relative text-muted-foreground text-center bg-background/85">
          <BGPattern variant="diagonal-stripes" mask="fade-y" />
          Entrez vos informations de connexion
          </p>
        </div>

        {/* Remplacement de CardContent */}
        <div className="p-6">
          <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/auth/forgot-password"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </div>

          <div className="mt-4 text-center text-sm">
           Vous n'avez pas de compte?{" "}
            <Link href="/auth/sign-up" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
