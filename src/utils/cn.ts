// utils/cn.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Fungsi untuk menggabungkan clsx dan tailwind-merge dengan type safety
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default cn;
