"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const SortOption = ({ defaultValue }: { defaultValue: string }) => {
  const router = useRouter();

  const changeSort = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value === defaultValue) {
      params.delete("sortBy");
    } else {
      params.set("sortBy", value);
    }
    params.set("page", "1");
    router.push(`${window.location.pathname}?${params}`);
  };
  return (
    <Select defaultValue={defaultValue} onValueChange={changeSort}>
      <SelectTrigger className="select-trigger">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent className="select-content">
        <SelectItem value="oldest" className="select-item">
          Oldest
        </SelectItem>
        <SelectItem value="newest" className="select-item">
          Newest
        </SelectItem>
        <SelectItem value="available" className="select-item">
          Available
        </SelectItem>
        <SelectItem value="rating" className="select-item">
          Highest Rated
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortOption;
