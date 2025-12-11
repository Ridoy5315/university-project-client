"use client";

import { useActionState, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateUserCredential } from "@/services/credentials/credentials.service";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

export interface Credential {
  id: string;
  email: string; // REQUIRED
  siteName: string;
  label?: string;
  url?: string | null;
  username: string;
  decryptedPassword?: string;
}

interface EditCredentialModalProps {
  credential: Credential;
  // onSave: (updated: Credential) => void;
}

export function EditCredentialModal({ credential }: EditCredentialModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction, isPending] = useActionState(
    updateUserCredential.bind(null, credential.id!),
    null
  );

  const [formData, setFormData] = useState({
    label: credential.label || "",
    url: credential.url || "",
    username: credential.username,
    password: credential.decryptedPassword || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (state && !state.success) {
      if ('message' in state && state.message) {
        toast.error(state.message);
      }
    } else if (state?.success) {
      toast.success("Credential updated successful");

      setTimeout(() => {
        router.refresh();
        setOpen(false);
      }, 0);
    }
  }, [state, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* <Button variant="outline" size="sm">
          Edit
        </Button> */}
        <Pencil size={16} className="cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] flex flex-col p-8">
        {/* HEADER */}
        <DialogHeader className="py-4">
          <DialogTitle>Edit Credential</DialogTitle>
        </DialogHeader>

        {/* FORM */}
        <form
          action={formAction}
          className="flex flex-col flex-1 min-h-0 space-y-4"
        >
          <Field>
            <FieldLabel htmlFor="siteName">Site Name</FieldLabel>
            <Input
              id="siteName"
              name="siteName"
              placeholder="GitHub, Gmail, Facebook"
              value={credential?.siteName}
              readOnly
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="label">Label</FieldLabel>
            <Input
              id="label"
              name="label"
              placeholder="Work Account, Personal, etc."
              value={formData.label}
              onChange={handleChange}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="url">URL</FieldLabel>
            <Input
              id="url"
              name="url"
              placeholder="https://example.com"
              value={formData.url}
              onChange={handleChange}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              name="username"
              placeholder="your@email.com"
              value={formData.username}
              onChange={handleChange}
            />
          </Field>

          {/* PASSWORD FIELD */}
          <Field className="relative">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
            />

            {/* Eye Icon */}
            <span
              className="absolute left-[415px] top-9 cursor-pointer text-lg select-none"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </Field>

          {/* FOOTER */}
          <div className="flex justify-end gap-2 px-6 py-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving change..." : "Save Changes"}
            </Button>

            {/* <Button type="submit">Save Changes</Button> */}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
