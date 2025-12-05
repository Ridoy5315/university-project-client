"use client";
import { useActionState, useEffect, useState, useTransition } from "react";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import { loginUser } from "@/services/auth/loginUser";
import { toast } from "sonner";

const LoginForm = () => {
     const [, startTransition] = useTransition();
     const [state, formAction, isPending] = useActionState(loginUser, null);
     const [showPassword, setShowPassword] = useState(false);

     const [formData, setFormData] = useState({
         email: "",
         password: "",
       });

     useEffect(() => {
          console.log(state);
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
    else if (state?.success) {
      startTransition(() => {
        setFormData({
          email: "",
          password: "",
        });
      });

      toast.success("Your account has been created successfully!", {
        duration: 3000,
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  }, [state]);
  return (
    <form action={formAction}>
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4">
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <InputFieldError field="email" state={state} />
          </Field>

          {/* Password */}
          <Field className="relative">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"} 
              placeholder="*****"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <span
              className="absolute left-88 top-9 cursor-pointer select-none"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
            <InputFieldError field="password" state={state} />
          </Field>
        </div>
        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>

            <FieldDescription className="px-6 text-center">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </FieldDescription>
            <FieldDescription className="px-6 text-center">
              <a
                href="/forget-password"
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  )
}

export default LoginForm