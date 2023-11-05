"use client";
import * as React from "react";
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

export function CardWithFormLoginAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    toast.success("Successfully Logged In");
  };
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
          <Button variant="outline">
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Github
          </Button>
          <Button variant="outline">
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("Email", {
                required: "Email Address is required.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please input correct email",
                },
              })}
            />
            {errors.Email?.message && (
              <p className="text-red-700 text-sm">{`${errors.Email?.message}`}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
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
            <Button className="w-full">Login</Button>
          </div>
        </form>
      </CardContent>
      {/* <CardFooter className="flex justify-between w-full"></CardFooter> */}
      <Toaster richColors />
    </Card>
  );
}
