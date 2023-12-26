"use client";
// import * as React from "react";
import { Icons } from "@/helpers/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { signIn } from "next-auth/react";
import { CustomProviders } from "@/app/types";

export function CardWithFormLoginAccount({ providers }: CustomProviders) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // store if loading then true
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);

      // next-auth sign in
      // const loginRes = await signIn("Credentials", {
      //   redirect: false,
      //   username: data.Username,
      //   password: data.Password,
      // });

      // if (loginRes?.ok) {
      //   alert(loginRes);
      // }

      // if (loginRes?.error) {
      //   alert("error");
      // }

      // console.log(loginRes);

      // custom sign in
      const loginRes = await fetch(`${process.env.NEXT_PUBLIC_API}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: `${data.Username}`,
          password: `${data.Password}`,
        }),
      });

      const loginResult = await loginRes.json();

      if (!loginRes?.ok) {
        setIsLoading(false);
        toast.error(loginResult.error);
        throw new Error("Something went wrong!");
      }

      const storeCookie = await fetch("/api/setcookie", {
        method: "POST",
        body: JSON.stringify({ token: loginResult.token }),
      });

      if (!storeCookie.ok) {
        toast.error("Something went wrong!");
        throw new Error("Something went wrong!");
      }

      toast.success("Successfully Logged In");
      // setIsLoading(false);
      reset();

      setTimeout(() => {
        window.location.href = "/profile";
      }, 400);
    } catch (err) {
      // setIsLoading(false);
      console.log(`${err}` || "Sorry Could'nt Log In, Something happend!");
    }
  };

  console.log(providers);
  return (
    <Card className="w-[350px] py-6">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Enter your credentials below to sign in into your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          {providers &&
            Object.values(providers).map((provider) => {
              if (provider.name === "Credentials") {
                return null;
              }

              const iconName = provider.id;
              const IconSvg = Icons[iconName as string];

              return (
                <div key={iconName}>
                  <Button variant="outline" onClick={() => signIn(iconName)}>
                    <IconSvg className="mr-2 h-4 w-4" />
                    {provider.name}
                  </Button>
                </div>
              );
            })}
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="p-5 relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2 pb-4">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              {...register("Username", {
                required: "Username is required.",
              })}
            />
            {errors.Username?.message && (
              <p className="text-red-700 text-sm">{`${errors.Username?.message}`}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...register("Password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password length should be more than 6",
                },
              })}
            />
            {errors.Password?.message && (
              <p className="text-red-700 text-sm">{`${errors.Password?.message}`}</p>
            )}
          </div>
          <div className="pt-5">
            <Button className="w-full" disabled={isLoading}>
              Login{" "}
              {isLoading && (
                <div className="animate-spin h-5 w-5 mr-3 border-4 rounded-full border-t-4 border-t-teal-400 ml-3"></div>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
      {/* <CardFooter className="flex justify-between w-full"></CardFooter> */}
      <Toaster richColors />
    </Card>
  );
}
