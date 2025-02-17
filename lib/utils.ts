import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export const calculateDueDays = (dueDate: Date) => {
  const currentDate = new Date();
  const diff = dueDate.getTime() - currentDate.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days;
};
