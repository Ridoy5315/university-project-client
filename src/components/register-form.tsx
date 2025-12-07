"use client";
import { useActionState, useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import InputFieldError from "./shared/InputFieldError";
import { toast } from "sonner";
import { registerUser } from "@/services/auth/registerUser";
import zxcvbn from "zxcvbn";
import { useDebounce } from "@/hooks/useDebounce";
import { getPasswordSuggestion } from "@/services/ai/passwordSuggestion";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [state, formAction, isPending] = useActionState(registerUser, null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Debounce the name input
  const debouncedName = useDebounce(formData.name, 800);

  // AI Suggestion State
  const [suggestedPassword, setSuggestedPassword] = useState("");
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);

  const strength = zxcvbn(formData.password);

  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = [
    "#e63946",
    "#ff6b6b",
    "#f2c94c",
    "#2d9cdb",
    "#27ae60",
  ];

  // Fetch AI Suggestion when debouncedName changes
  useEffect(() => {
    async function fetchSuggestion() {
      if (!debouncedName) return;

      setLoadingSuggestion(true);
      const suggestion = await getPasswordSuggestion(debouncedName);
      setLoadingSuggestion(false);

      if (suggestion) {
        setSuggestedPassword(suggestion);
      }
    }

    fetchSuggestion();
  }, [debouncedName]);

  const handlePassword = () => {
    setFormData({
      ...formData,
      password: suggestedPassword,
      confirmPassword: suggestedPassword,
    });
    setSuggestedPassword("");
  };

  useEffect(() => {
    console.log(state);
    if (state && !state.success && state.message) {
      if (state.message === "Duplicate Key Error") {
        toast.error(
          <div>
            <strong className="text-base">Email Already Registered!</strong>
            <div>
              The email you entered is already in use. Please use a different
              email or log in.
            </div>
          </div>
        );
      } else {
        toast.error(state.message);
      }
    } else if (state?.success) {
      startTransition(() => {
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      });

      toast.success("Registration successful! Please verify your email.");
      setTimeout(() => {
        startTransition(() => {
          router.push(`/verifyOTP?email=${state?.data?.email}&name=${state?.data?.name}`);
        });
      }, 2000);
    }
  }, [state, router]);
  return (
    <form action={formAction}>
      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <Field>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name} // controlled value
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <InputFieldError field="name" state={state} />
          </Field>

          {/* {loadingSuggestion && (
            <div className="text-sm text-blue-500">Generating suggestion…</div>
          )} */}

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

          {/* AI Password Suggestion Box */}
          {suggestedPassword && !loadingSuggestion && (
            <div className="md:col-span-2 p-3 bg-green-50 border border-green-300 rounded text-green-700 text-sm flex justify-between items-center">
              <span>
                🔐 Suggested Password: <strong>{suggestedPassword}</strong>
              </span>
              <button
                type="button"
                className="text-blue-600 underline cursor-pointer"
                onClick={handlePassword}
              >
                Use this
              </button>
            </div>
          )}

          {/* Password */}
          <Field className="relative">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"} // toggle type
              placeholder="*****"
              value={formData.password}
              disabled={loadingSuggestion}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <span
              className="absolute left-57 top-9 cursor-pointer select-none"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
            <InputFieldError field="password" state={state} />
          </Field>

          {/* Confirm Password */}
          <Field className="relative">
            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"} // toggle type
              placeholder="*****"
              value={formData.confirmPassword}
              disabled={loadingSuggestion}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <span
              className="absolute left-57 top-9 cursor-pointer select-none"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </span>
            <InputFieldError field="confirmPassword" state={state} />
          </Field>
          {formData.password && (
            <div>
              <div className="h-2 w-full bg-gray-200 rounded">
                <div
                  className="h-2 rounded"
                  style={{
                    width: `${(strength.score + 1) * 20}%`,
                    backgroundColor: strengthColors[strength.score],
                    transition: "0.3s",
                  }}
                ></div>
              </div>

              <p
                className="text-sm mt-1"
                style={{ color: strengthColors[strength.score] }}
              >
                {strengthLabels[strength.score]}
              </p>
            </div>
          )}
        </div>
        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating Account..." : "Create Account"}
            </Button>

            <FieldDescription className="px-6 text-center">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Sign in
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default RegisterForm;
