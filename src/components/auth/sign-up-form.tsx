"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useSignUp, SignUpMode } from "@/hooks/useSignUp";
import { CardHeader as LoginCardHeader } from "../design/LoginCardHeader";
import { BGPattern } from "../design/BGPattern";

export function SignUpForm({
  className,
  mode = "PATIENT",
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { mode?: SignUpMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { signUp, error, isLoading } = useSignUp(mode);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    signUp(email, password, repeatPassword);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex w-full border justify-center items-center">
        <LoginCardHeader
          title={`INSTCRIPTION`}
          description="Créez un nouveau compte"
        />
      </div>
      <div className="rounded relative border bg-background text-foreground shadow-sm">
        <div className="border-b p-6">
          <h2 className="text-2xl font-semibold leading-none tracking-tight" />
          <p className="text-sm relative text-muted-foreground text-center bg-background/85">
            <BGPattern variant="diagonal-stripes" mask="fade-y" />
            Entrez vos informations pour créer un compte
          </p>
        </div>
        <div className="p-6">
          <form className="relative" onSubmit={handleSignUp}>
             <BGPattern variant="dots" mask="fade-center" />
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
                  <Label htmlFor="password">Mot de passe</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="repeat-password">Répéter le mot de passe</Label>
                </div>
                <Input
                  id="repeat-password"
                  type="password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Création du compte..." : "S'inscrire"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Vous avez déjà un compte ?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Se connecter
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
