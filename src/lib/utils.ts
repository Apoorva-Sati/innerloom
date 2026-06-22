import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Reusable type for component children
export type PropsWithChildren = {
  children: React.ReactNode
  className?: string
}