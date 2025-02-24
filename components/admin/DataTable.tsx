"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState, useTransition } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import DataTablePagination from "./DataTablePagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[];
  totalData?: number;
  fetchData: (
    page: number,
    pageSize: number
  ) => Promise<{ data: TData[]; total: number }>;
  onDeleteRow?: (rowIndex: string) => void | Promise<void>;
}

const DataTable = <TData, TValue>({
  columns,
  data,
  fetchData,
  onDeleteRow,
}: DataTableProps<TData, TValue>) => {
  const [tableData, setTableData] = useState<TData[]>(data || []);
  const [page, setPage] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isPending, startTransition] = useTransition();
  const table = useReactTable({
    data: tableData,
    columns,
    // rowCount: totalData,
    state: {
      pagination: page,
    },
    onPaginationChange: setPage,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    meta: {
      removeRow: onDeleteRow,
    },
  });

  useEffect(() => {
    startTransition(() => {
      fetchData(page.pageIndex, page.pageSize).then((res) => {
        setTableData(res.data);
        table.setOptions((prev) => ({
          ...prev,
          rowCount: res.total,
        }));
      });
    });
  }, [page, fetchData, table]);

  return (
    <div className="rounded-md">
      <Table>
        <TableHeader className="bg-light-300 rounded-md [&_tr]:border-none">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="h-14 p-2 font-ibm-plex-sans font-bold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isPending ? (
            Array(10)
              .fill(0)
              .map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array(columns.length)
                    .fill(0)
                    .map((_, index) => (
                      <td
                        key={index}
                        className="px-1 py-2 align-middle h-[52px]"
                      >
                        <Skeleton className="h-4 max-w-[60%]" />
                      </td>
                    ))}
                </tr>
              ))
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="border-none"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="truncate">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination
        nextPage={table.nextPage}
        prevPage={table.previousPage}
        page={table.getState().pagination.pageIndex + 1}
        total={table.getPageCount()}
        hasNext={table.getCanNextPage()}
        hasPrev={table.getCanPreviousPage()}
      />
    </div>
  );
};

export function DataTableSkeleton({ colCount = 5, rowsCount = 5 }) {
  const columns = Array.from({ length: colCount }, (_, index) => {
    return (
      <TableHead key={index} className="h-14 p-2">
        <h1 style={{ margin: "0px" }}>
          <Skeleton className="h-4 w-[80%]" />
        </h1>
      </TableHead>
    );
  });

  const rowColumns = Array.from({ length: colCount }, (_, index) => {
    return (
      <TableCell className="px-1 py-2 align-middle h-[52px]" key={index}>
        <Skeleton className="h-4 w-[60%]" />
      </TableCell>
    );
  });

  const rows = Array.from({ length: rowsCount }, (_, index) => {
    return <tr key={index}>{rowColumns}</tr>;
  });

  return (
    <Table>
      <TableHeader className="h-10 px-2 text-left align-middle font-medium text-muted-foreground">
        <TableRow>{columns}</TableRow>
      </TableHeader>
      <TableBody>{rows}</TableBody>
    </Table>
  );
}

export default DataTable;
