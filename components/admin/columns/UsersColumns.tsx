"use client";

import { CellContext, ColumnDef, Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2, Trash2 } from "lucide-react";
import ImageModal from "@/components/modals/ImageModal";
import { useTransition } from "react";
import ConfirmModal from "@/components/modals/ConfirmModal";

export const columns: ColumnDef<UserData>[] = [
  {
    accessorKey: "fullName",
    header: "Name",
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
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "universityId",
    header: "University ID No",
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
        >
          View ID Card <ExternalLink />
        </Button>
      </ImageModal>
    ),
  },
  {
    accessorKey: "booksBorrowed",
    header: "Books Borrowed",
    accessorFn: (row) => row?.borrowRecords?.length || 0,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    // cell: ({ row }) => (
    //   <div className="flex [_&svg]:size-5">
    //     <Button
    //       variant="ghost"
    //       size="icon"
    //       className="size-8"
    //       onClick={() => {}}
    //     >
    //       <Trash2 className="text-red-600 size-5" />
    //     </Button>
    //   </div>
    // ),
    cell: DeleteButton,
  },
];

function DeleteButton<TData>({ row, table }: CellContext<TData, unknown>) {
  const meta = table.options.meta;
  const [isPending, startTransition] = useTransition();

  const onDelete = async () => {
    startTransition(async () => {
      // @ts-expect-error - delete is not defined
      if (meta && meta?.removeRow) {
        // @ts-expect-error - delete is not defined
        meta?.removeRow(row?.original?.id as string);
      }
    });
  };
  return (
    <ConfirmModal onConfirm={onDelete}>
      <Button
        variant="ghost"
        size="icon"
        className="size-8"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="size-5 animate-spin text-primary-admin" />
        ) : (
          <Trash2 className="text-red-600 size-5" />
        )}
        {/* <Trash2 className="text-red-600 size-5" /> */}
      </Button>
    </ConfirmModal>
  );
}
