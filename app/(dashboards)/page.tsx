"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false);
      router.push("/admin-dashboard");
    }, 1500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 dark:bg-zinc-950/50 p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-white dark:bg-zinc-950 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.4] dark:opacity-[0.2]"></div>
      </div>

      <Card className="w-full max-w-[400px] z-10 shadow-xl border-t-4 border-t-blue-600 bg-white dark:bg-zinc-900/90 backdrop-blur-sm">
        <CardHeader className="space-y-3 flex flex-col items-center pt-8">
            <div className="flex items-center gap-3 mb-2">
                <div className="relative w-10 h-10">
                    <Image src="/icon.png" alt="MedixPro Logo" fill className="object-contain" priority />
                </div>
                <span className="font-bold text-2xl tracking-tight text-foreground">MedixPro</span>
            </div>
            <div className="space-y-1 text-center">
                <CardTitle className="text-xl">Welcome back</CardTitle>
                <CardDescription>Sign in to your account to continue</CardDescription>
            </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="doctor@medixpro.com" 
                required 
                className="bg-background/50"
              />
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="#" className="text-xs text-blue-600 hover:text-blue-500 font-medium">Forgot password?</Link>
                </div>
                <div className="relative">
                    <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        required 
                        className="bg-background/50 pr-10"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                    >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">Toggle password visibility</span>
                    </button>
                </div>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all mt-2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-6 bg-muted/20">
            <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/auth/register" className="text-blue-600 hover:underline font-medium">
                    Contact Admin
                </Link>
            </p>
        </CardFooter>
      </Card>
      
      <div className="absolute bottom-6 text-center text-xs text-muted-foreground z-10">
        &copy; {new Date().getFullYear()} MedixPro System. All rights reserved.
      </div>
    </div>
  );
}
