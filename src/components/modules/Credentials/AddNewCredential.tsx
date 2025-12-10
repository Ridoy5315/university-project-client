"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addCredential } from "@/services/credentials/credentials.service";
import Link from "next/link";
import { useActionState, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { RenderSiteNameItems } from "./siteNameItems";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

const AddNewCredentialForm = () => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(addCredential, null);
  const [showPassword, setShowPassword] = useState(false);
  const [, startTransition] = useTransition();

  const [siteName, setSiteName] = useState("");

  const [formData, setFormData] = useState({
    label: "",
    siteName: "",
    url: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }

    if (state?.success) {
      startTransition(() => {
        setFormData({
          label: "",
          siteName: "",
          url: "",
          username: "",
          password: "",
        });
      });
      toast.success("Credential saved successfully ✔️");

      startTransition(() => {
          router.push(`/credentials/view-all-credentials`);
        });
    }
  }, [state]);

  return (
    <form action={formAction}>
      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Label */}
          <Field>
            <FieldLabel htmlFor="label">Label</FieldLabel>
            <Input
              id="label"
              name="label"
              type="text"
              placeholder="Personal Gmail, Work GitHub"
              value={formData.label} // controlled value
              onChange={(e) =>
                setFormData({ ...formData, label: e.target.value })
              }
            />
            <InputFieldError field="label" state={state} />
          </Field>

          {/* Site Name */}
          {/* <Field>
            <FieldLabel htmlFor="siteName">Website / App Name</FieldLabel>
            <Input
              id="siteName"
              name="siteName"
              type="text"
              placeholder="Gmail, GitHub, Facebook"
            />
            <InputFieldError field="siteName" state={state} />
          </Field> */}

          <Field>
            <FieldLabel htmlFor="siteName">Website / App Name</FieldLabel>
            <Input
              id="siteName"
              name="siteName"
              type="hidden"
              value={siteName}
              readOnly
            ></Input>
            <Select
              value={siteName}
              onValueChange={(value) => setSiteName(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a site" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-56 w-full">
                  <RenderSiteNameItems></RenderSiteNameItems>
                </ScrollArea>
              </SelectContent>
            </Select>
            <InputFieldError state={state} field="siteName" />
          </Field>

          {/* URL */}
          <Field>
            <FieldLabel htmlFor="url">Website URL (optional)</FieldLabel>
            <Input
              id="url"
              name="url"
              type="text"
              placeholder="https://example.com"
              value={formData.url} // controlled value
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
            />
            <InputFieldError field="url" state={state} />
          </Field>

          {/* Username */}
          <Field>
            <FieldLabel htmlFor="username">Login Username / Email</FieldLabel>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="example@gmail.com"
              value={formData.username} // controlled value
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <InputFieldError field="username" state={state} />
          </Field>

          {/* Password Field */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pr-10"
                value={formData.password} // controlled value
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <InputFieldError field="password" state={state} />
          </Field>

          {/* Button Beside Password */}
          <div className="flex justify-end items-center mt-4">
            <Button
              type="submit"
              disabled={isPending}
              className="md:w-auto w-full cursor-pointer"
            >
              {isPending ? "Saving..." : "Add Credential"}
            </Button>
          </div>
        </div>

        {/* Bottom Description */}
        <FieldDescription className="text-center mt-4">
          Want to view stored credentials?{" "}
          <Link
            href="/credentials/view-all-credentials"
            className="text-blue-600 hover:underline"
          >
            View All
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
};

export default AddNewCredentialForm;
