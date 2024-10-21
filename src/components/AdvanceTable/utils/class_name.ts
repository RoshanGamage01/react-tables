import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const filterUndefinedProps = (obj: { [s: string]: unknown; } | ArrayLike<unknown>) => {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined));
};
