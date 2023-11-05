"use client";
import { useState } from "react";
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
import OTPInput from "@/hooks/OTPInput";

export function CardWithFormCreateAccount() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // to store steps needed for register
  const [steps, setSteps] = useState<{
    creattionOfAccount: boolean;
    otpVerification: {
      value: boolean;
      otp: String;
    };
  }>({
    creattionOfAccount: true,
    otpVerification: {
      value: false,
      otp: "",
    },
  });
  // store if loading then true
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // this function runs when any login or register form is submitted
  const onSubmit = async (data: any) => {
    if (steps.creattionOfAccount) {
      try {
        setIsLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: `${data.Username}`,
            password: `${data.Password}`,
            email: `${data.Email}`,
            profile: "",
          }),
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.error.error);
        }

        toast.success("Successfully Created You'r Account");

        setSteps({
          creattionOfAccount: false,
          otpVerification: {
            value: true,
            otp: "",
          },
        });

        const otpRes = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/generateOTP?username=${data.Username}`
        );

        if (!otpRes.ok) {
          throw new Error("Something went wrong!");
        }

        const otpResult = await otpRes.json();

        const emailRes = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/registerMail`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: `${data.Username}`,
              userEmail: `${data.Email}`,
              text: `Your OTP is ${otpResult.code}`,
              subject: "Your WorksByNihal Account's OTP",
            }),
          }
        );

        const emailResult = await emailRes.json();

        if (!emailRes.ok) {
          toast.error("Something went wrong!");
          throw new Error("Something went wrong!");
        }
        setIsLoading(false);
        toast.success(`${emailResult.msg}`);
      } catch (error) {
        toast.error(`${error}`);
      }
    }
    if (steps.otpVerification.value) {
      try {
        setIsLoading(true);
        const otp = document.querySelectorAll(".inputContainer");

        const tempOTPStore = Array.from(otp).map((obj) => {
          const inputElement = obj as HTMLInputElement; // Type assertion
          return inputElement.value;
        });

        const tempOTP = tempOTPStore.join("");

        setSteps({
          ...steps,
          otpVerification: {
            value: true,
            otp: tempOTP,
          },
        });
        // toast.success("OTP Verified");

        const getUserRes = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/user/${data.Username}`
        );

        if (!getUserRes.ok) {
          throw new Error("Something went wrong!");
        }

        const getUserResult: { _id: String } = await getUserRes.json();

        const verifyRes = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/verifyOTP?username=${data.Username}&code=${tempOTP}&userId=${getUserResult._id}`
        );

        const verifyResult = await verifyRes.json();

        if (!verifyRes.ok) {
          throw new Error(`${verifyResult.error.error}`);
        }

        setIsLoading(false);
        toast.success(`${verifyResult.msg}`);
        window.location.href = "/auth/login";
      } catch (error) {
        toast.error(`${error}`);
      }
    }
  };

  // this function runs when in OTPinput value is changed ( this is used to store otp value )
  const onVerifyOTP = (otp: String) => {
    setSteps({
      ...steps,
      otpVerification: {
        value: true,
        otp: otp,
      },
    });
  };

  return (
    <Card className="w-[350px] py-6">
      <CardHeader>
        {steps.creattionOfAccount && <CardTitle>Create an account</CardTitle>}
        {steps.otpVerification.value && <CardTitle>Verify Your OTP</CardTitle>}
        {steps.creattionOfAccount && (
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        )}
        {steps.otpVerification.value && (
          <CardDescription>
            Enter your OTP below to verify your account
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {steps.creattionOfAccount && (
          <>
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
                <Label htmlFor="Username">Username</Label>
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
              <div className="grid gap-2 pb-4">
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
              <div className="grid gap-2">
                <Label htmlFor="confirm_password">Comfirm Password</Label>
                <Input
                  id="confirm_password"
                  type="password"
                  {...register("confirm_password", {
                    required: "Password is required.",
                    validate: (val: string) => {
                      if (watch("Password") != val) {
                        return "Your passwords do no match";
                      }
                    },
                  })}
                />
                {errors.confirm_password?.message && (
                  <p className="text-red-700 text-sm">{`${errors.confirm_password?.message}`}</p>
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
          </>
        )}
        {steps.otpVerification.value && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-2 pb-4">
              <OTPInput
                autoFocus
                isNumberInput
                length={6}
                className="otpContainer"
                inputClassName="inputContainer [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0"
                onChangeOTP={(otp) => onVerifyOTP(otp)}
              />
            </div>
            <div className="pt-5">
              <Button className="w-full" disabled={isLoading}>
                Submit{" "}
                {isLoading && (
                  <div className="animate-spin h-5 w-5 mr-3 border-4 rounded-full border-t-4 border-t-teal-400 ml-3"></div>
                )}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
      {/* <CardFooter className="flex justify-between w-full"></CardFooter> */}
      <Toaster richColors />
    </Card>
  );
}
