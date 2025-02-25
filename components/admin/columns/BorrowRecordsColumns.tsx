"use client";

import BookCover from "@/components/BookCover";
import GenerateReceiptButton from "@/components/GenerateReceiptButton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitials } from "@/lib/utils";
import { BorrowStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ReceiptText } from "lucide-react";

export const columns: ColumnDef<BorrowRecords>[] = [
  {
    accessorKey: "books.title",
    header: "Book Title",
    cell: ({ row, getValue }) => (
      <div className="flex space-x-2 items-center py-2 px-1 w-[300px]">
        <BookCover
          coverImage={row.original?.books?.coverUrl || ""}
          coverColor={row.original?.books?.coverColor || ""}
          variant="extraSmall"
        />
        <span className="font-semibold truncate" title={getValue() as string}>
          {getValue() as string}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "users",
    header: "User Requested",
    cell: ({ row, getValue }) => {
      const user = getValue() as UserData;
      return (
        <div className="flex gap-2 items-center w-[200px]">
          <Avatar>
            <AvatarFallback className="bg-blue-100 font-semibold text-white">
              {getInitials(user.fullName || "IN")}
            </AvatarFallback>
          </Avatar>

          {/* <p className="font-semibold text-dark-200 truncate w-full">
            {user?.fullName}
          </p> */}
          <div className="flex flex-col w-full max-w-full overflow-auto">
            <span
              className="font-semibold text-dark-200 truncate w-full"
              title={user?.fullName}
            >
              {user?.fullName}
            </span>
            <span
              className="text-xs text-light-500 truncate w-full"
              title={user?.email}
            >
              {user?.email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "borrowDate",
    header: "Borrowed Date",
    accessorFn: (row) =>
      new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(row.borrowDate),
  },
  {
    accessorKey: "returnDate",
    header: "Return Date",
    accessorFn: (row) =>
      row.returnDate
        ? new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }).format(row.returnDate)
        : "--",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    accessorFn: (row) =>
      new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(row.dueDate),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold w-[100px] inline-block text-center ${
              row.original.status === "RETURNED"
                ? "bg-green-100 text-green-500"
                : "bg-yellow-100 text-yellow-500"
            }`}
          >
            {row.original.status}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          {Object.keys(BorrowStatus).map((key, idx) => (
            <DropdownMenuItem key={idx}>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold w-[100px] inline-block text-center ${
                  key === "RETURNED"
                    ? "bg-green-100 text-green-500"
                    : "bg-yellow-100 text-yellow-500"
                }`}
              >
                {key}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
  {
    accessorKey: "receipt",
    header: "Receipt",
    cell: ({ row }) => (
      <div className="flex [_&svg]:size-5">
        <GenerateReceiptButton borrowRecord={row.original}>
          <Button
            // variant="ghost"
            size="sm"
            className="gap-2 book-receipt_admin-btn"
            onClick={() => {}}
          >
            <ReceiptText className="size-5" />
            Generate
          </Button>
        </GenerateReceiptButton>
      </div>
    ),
  },
];
