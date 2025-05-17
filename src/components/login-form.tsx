"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { login } from "@/actions/login";
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
import { cn } from "@/lib/utils";
import { SignInSchema } from "@/schemas/zod.schema";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [errorEmail, setErrorEmail] = useState<string | undefined>("");
  const [errorPassword, setErrorPassword] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [loadingLogin, setLoadingLogin] = useState<boolean | undefined>(false);

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    setErrorEmail("");
    setErrorPassword("");
    setSuccess("");

    try {
      const data = await login(values);

      if (data.errorEmail || data.errorPassword) {
        setErrorEmail(data.errorEmail);
        setErrorPassword(data.errorPassword);
      }

      if (data.success) {
        setSuccess(data.success);
      }
    } catch (error) {
      console.error(error);
      setErrorEmail("An error occurred during login.");
      setErrorPassword("An error occurred during login.");
    }
  };

  const router = useRouter();

  // ⏳ Trigger redirect on success
  useEffect(() => {
    if (success) {
      setLoadingLogin((prev) => !prev);
      const timeout = setTimeout(() => {
        router.push("/home");
      }, 1500); // 1.5 seconds delay

      return () => clearTimeout(timeout);
    }
  }, [success, router]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  {/* Apple SVG icon */}
                  Login with Apple
                </Button>
                <Button variant="outline" className="w-full">
                  {/* Google SVG icon */}
                  Login with Google
                </Button>
              </div>

              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>

              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="m@example.com"
                    required
                  />
                  {errorEmail && (
                    <p className="text-sm text-red-600">{errorEmail}</p>
                  )}
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    {...form.register("password")}
                    required
                  />
                  {errorPassword && (
                    <p className="text-sm text-red-600">{errorPassword}</p>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  {loadingLogin ? (
                    <LoaderCircle className="animate-spin"></LoaderCircle>
                  ) : (
                    "Login"
                  )}
                </Button>
                {success && (
                  <p className="text-center text-sm text-green-600">
                    {success}
                  </p>
                )}
              </div>

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
