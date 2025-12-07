"use client";
import { useActionState, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp";
import { toast } from "sonner";
import { sendOTP } from "@/services/otp/sendOTP";
import { cn } from "@/lib/utils";
import { Field, FieldLabel } from "./ui/field";
import InputFieldError from "./shared/InputFieldError";
import { otpVerify } from "@/services/otp/otpVerify";
import { useRouter, useSearchParams } from "next/navigation";


const VerifyOTP = () => {
  const [state, formAction, isPending] = useActionState(otpVerify, null);
  const [confirmed, setConfirmed] = useState(false);
  const [timer, setTimer] = useState(60);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const email = searchParams.get("email");
  const name = searchParams.get("name");

    // PROTECT THIS PAGE FROM DIRECT ACCESS
  useEffect(() => {
    if (!email) {
      router.replace("/"); // redirect to homepage
    }
  }, [email, router]);

  const handleSendOtp = async () => {
    if (!email || !name) {
      toast.error("Email and name are required");
      return;
    }
    const toastId = toast.loading("Sending OTP");
    try {
      const res = await sendOTP(email, name);
      console.log(res);
      if (res.success) {
        toast.success("OTP send successfully", { id: toastId });
      }
      setConfirmed(true);
      setTimer(60);
    } catch (error) {
      console.log(error);
      toast.error("Failed to send OTP", { id: toastId });
    }
  };

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    } else if (state?.success) {
      toast.success(<div>
            <strong className="text-base">OTP verified successfully!</strong>
            <div>
              Your account has been created successfully!
            </div>
          </div>);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
  }, [state]);

  useEffect(() => {
    if (!confirmed) {
      return;
    }

    const timerId = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timerId);
  }, [ confirmed]);
  return (
    <div className="grid place-content-center h-screen">
      {confirmed ? (
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Please enter the 6 digit code we sent to{" "}
              <span className="text-primary">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="otp-form" action={formAction} className="space-y-6">
              {email && <input type="hidden" name="email" value={email} />}
              <Field>
                <FieldLabel htmlFor="name">One-Time Password</FieldLabel>
      
                  <InputOTP id="pin" name="pin"  maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                <InputFieldError field="name" state={state} />
              </Field>
              {/* <FormField
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <div>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Verifying Account..." : "Verify Account"}
                </Button>
                <div>
                  <Button
                    onClick={handleSendOtp}
                    type="button"
                    variant="link"
                    disabled={timer !== 0}
                    className={cn("p-0 m-0", {
                      "cursor-pointer": timer === 0,
                      "text-gray-500": timer !== 0,
                    })}
                  >
                    Resent OTP:
                  </Button>
                  <span className="pl-2">{timer}</span>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-xl">Verify your email address</CardTitle>
            <CardDescription>
              We will sent you an OTP at{" "}
              <span className="text-primary">{email}</span>
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-end">
            <Button onClick={handleSendOtp} className="w-[300px] cursor-pointer">
              Confirm
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default VerifyOTP;
