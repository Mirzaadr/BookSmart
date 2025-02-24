"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { PencilLine, Trash2 } from "lucide-react";
import BookCover from "@/components/BookCover";
import Link from "next/link";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { deleteBook } from "@/lib/admin/actions/book";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "title",
    header: (props) => (
      <div className="flex space-x-2 items-center py-2 px-1 w-[300px]">
        <span>Book Title</span>
      </div>
    ),
    cell: ({ row, getValue }) => (
      <div className="flex space-x-2 items-center py-2 px-1 w-[300px]">
        <BookCover
          coverImage={row.original.coverUrl}
          coverColor={row.original.coverColor}
          variant="extraSmall"
        />
        <span className="font-semibold truncate">{getValue() as string}</span>
      </div>
    ),
  },
  {
    accessorKey: "author",
    // header: "Author",
    header: () => (
      <div className="flex space-x-2 items-center py-2 px-1 max-w-[200px]">
        <span className="truncate">Author</span>
      </div>
    ),
    cell: ({ row, getValue }) => (
      <div className="flex space-x-2 items-center py-2 px-1 max-w-[200px]">
        <span className="truncate">{getValue() as string}</span>
      </div>
    ),
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    accessorFn: (row) =>
      new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(row.createdAt || undefined),
  },
  {
    accessorKey: "view",
    header: "View",
    cell: ({ row }) => (
      <Button size="sm" className="view-btn" asChild>
        <Link href={`/admin/books/${row.original.id}`}>View</Link>
      </Button>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex [_&svg]:size-5">
        <Button variant="ghost" size="icon" className="size-8" asChild>
          <Link href={`/admin/books/edit/${row.original.id}`}>
            <PencilLine className="text-teal-600 size-5" />
          </Link>
        </Button>
        <ConfirmModal
          onConfirm={async () => {
            await deleteBook({ id: row.original.id });
            window.location.reload();
          }}
          description="This action cannot be undone. This will permanently remove this data from our servers."
        >
          <Button variant="ghost" size="icon" className="size-8">
            <Trash2 className="text-red-600 size-5" />
          </Button>
        </ConfirmModal>
        {/* <button onClick={() => console.log(row.original.id)}>View</button> */}
      </div>
    ),
  },
];
