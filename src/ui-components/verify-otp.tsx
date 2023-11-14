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

export function CardWithFormVerifyOtp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // to store steps needed for register
  const [steps, setSteps] = useState<{
    otpVerification: {
      value: boolean;
      otp: String;
    };
  }>({
    otpVerification: {
      value: true,
      otp: "",
    },
  });
  // store if loading then true
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // this function runs when any login or register form is submitted
  const onSubmit = async (data: any) => {
    try {
      const tokenRes = await fetch("/api/getcookie");
      const tokenResult = await tokenRes.json();
      const token = await tokenResult.token.value;

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

      const verifyRes = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/verifyOTP?code=${tempOTP}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const verifyResult = await verifyRes.json();

      if (!verifyRes.ok) {
        throw new Error(`${verifyResult.error.error}`);
      }

      setIsLoading(false);
      toast.success(`${verifyResult.msg}`);

      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 800);
    } catch (error) {
      setIsLoading(false);
      toast.error(`${error}`);
    }
  };

  // this function runs when in OTPinput value is changed ( this is used to store otp value )
  const onVerifyOTP = (otp: String) => {
    //test
    setSteps({
      otpVerification: {
        value: true,
        otp: otp,
      },
    });
  };

  return (
    <Card className="w-[350px] py-6">
      <CardHeader>
        {steps.otpVerification.value && <CardTitle>Verify Your OTP</CardTitle>}

        {steps.otpVerification.value && (
          <CardDescription>
            Enter your OTP below to verify your account
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
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
