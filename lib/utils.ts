import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge CSS class names with Tailwind CSS conflict resolution
 * 
 * This function combines clsx for conditional class names with tailwind-merge
 * to handle Tailwind CSS class conflicts intelligently.
 * 
 * @param inputs - Class values to merge (strings, objects, arrays, etc.)
 * @returns Merged and deduplicated class string
 * 
 * @example
 * ```typescript
 * cn("px-2 py-1", "px-4") // Returns "py-1 px-4"
 * cn("text-red-500", { "text-blue-500": isBlue }) // Conditionally applies classes
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
