import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Chat, Note } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateString = (
  value: unknown,
  maxLength: number
): value is string => {
  if (!value || typeof value !== "string" || value.length > maxLength) {
    return false;
  }

  return true;
};

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);
  };
};

export const getUserInitials = (
  firstName: string | null | undefined,
  lastName: string | null | undefined
) => {
  return `${firstName?.charAt(0)}${lastName?.charAt(0)}`;
};

export const isChat = (item: any): item is Chat => {
  return (item as Chat)?.messages !== undefined;
};

export const isNote = (item: any): item is Note => {
  return (item as Note)?.contents !== undefined;
};
