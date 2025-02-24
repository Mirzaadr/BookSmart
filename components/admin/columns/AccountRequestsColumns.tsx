"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ExternalLink, Trash2 } from "lucide-react";
import ImageModal from "@/components/modals/ImageModal";

export const columns: ColumnDef<UserData>[] = [
  {
    accessorKey: "fullName",
    header: "Name",
    cell: ({ getValue }) => (
      <div className="flex-1 w-full">
        <span className="">{getValue() as string}</span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date Joined",
    accessorFn: (row) =>
      new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(row.createdAt),
  },
  {
    accessorKey: "universityId",
    header: "University ID No.",
  },
  {
    accessorKey: "universityCard",
    header: "University ID Card",
    cell: ({ row, getValue }) => (
      <ImageModal filePath={getValue() as string}>
        <Button
          variant="link"
          // size="sm"
          className="gap-2 text-blue-100"
          onClick={() => console.log(row.original.id)}
        >
          View ID Card <ExternalLink />
        </Button>
      </ImageModal>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => (
      <span className="font-semibold text-slate-600">
        {getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="[_&svg]:size-5">
        {row.original.status === "PENDING" && (
          <Button className="confirm-approve w-[150px]" onClick={() => {}}>
            Approve Account
          </Button>
        )}
        {(row.original.status === "APPROVED" ||
          row.original.status === "REJECTED") && (
          <Button className="confirm-reject w-[150px]" onClick={() => {}}>
            Revoke Account
          </Button>
        )}
      </div>
    ),
  },
];
