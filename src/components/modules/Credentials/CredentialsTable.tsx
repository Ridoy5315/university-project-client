"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink, Eye, EyeOff} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { EditCredentialModal } from "./EditCredentialModal";

interface Credential {
  id: string;
  label: string;
  siteName: string;
  url?: string | null;
  username: string;
  decryptedPassword: string;
  createdAt: string;
  email: string;
}

interface CredentialsTableProps {
  data: Credential[];
  //   onDelete?: (id: string) => void;
}

export default function CredentialsTable({ data }: CredentialsTableProps) {

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="rounded-lg border shadow-sm p-4 bg-white">
      <Table>
        <TableCaption>Your saved login credentials</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Label</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Password</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                No credentials found.
              </TableCell>
            </TableRow>
          )}

          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.label}</TableCell>
              <TableCell>{item.siteName}</TableCell>

              <TableCell>
                {item.url ? (
                  <Link
                    href={item.url}
                    target="_blank"
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    Visit <ExternalLink size={14} />
                  </Link>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </TableCell>

              <TableCell>{item.username}</TableCell>
              {/* <TableCell>{item.password}</TableCell> */}
              <TableCell className="flex items-center">
                <span>
                  {showPassword
                    ? item.decryptedPassword
                    : "•".repeat(item?.decryptedPassword.length)}
                </span>
                {"  "}
                <button onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff  size={16} /> : <Eye  size={16} />}
                </button>
              </TableCell>
              <TableCell>
                {new Date(item.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell className="text-right flex gap-2 justify-end">

                {/* Edit */}
                {/* <Link href={`/credentials/edit/${item.id}`}>
                  <Button size="icon" variant="outline">
                    <Pencil size={16} />
                  </Button>
                </Link> */}
                <EditCredentialModal credential={item} ></EditCredentialModal>

                {/* Delete */}
                {/* <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => onDelete && onDelete(item.id)}
                >
                  <Trash2 size={16} />
                </Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
