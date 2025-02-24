import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface DataTablePaginationProps {
  hasPrev: boolean;
  hasNext: boolean;
  nextPage: () => void;
  prevPage: () => void;
  firstPage?: () => void;
  lastPage?: () => void;
  page: number;
  total: number;
}
const DataTablePagination = ({
  hasNext,
  hasPrev,
  firstPage,
  lastPage,
  nextPage,
  prevPage,
  page,
  total,
}: DataTablePaginationProps) => {
  return (
    <div
      id="pagination"
      className="flex flex-row justify-end items-center gap-2 mt-2"
    >
      {firstPage && (
        <button
          className="border rounded p-1"
          onClick={() => firstPage()}
          disabled={!hasPrev}
        >
          {"<<"}
        </button>
      )}
      <Button
        disabled={!hasPrev}
        size="icon"
        onClick={() => {
          if (hasPrev) prevPage();
        }}
        className="pagination-btn_light"
      >
        <ChevronLeft />
      </Button>
      <p className="bg-primary-admin text-white h-9">{page}</p>

      <Button
        disabled={!hasNext}
        size="icon"
        onClick={() => {
          if (hasNext) nextPage?.();
        }}
        className="pagination-btn_light"
      >
        <ChevronRight />
      </Button>
      {lastPage && (
        <button
          className="border rounded p-1"
          onClick={() => lastPage()}
          disabled={!hasNext}
        >
          {">>"}
        </button>
      )}
      {/* <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>
          {page} of {total}
        </strong>
      </span> */}
    </div>
  );
};

export default DataTablePagination;
