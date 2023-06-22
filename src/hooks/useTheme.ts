import { useEffect, useState } from "react";

export type ThemeClassName = "str-chat__theme-light" | "str-chat__theme-dark";
export type Theme = "light" | "dark";

const SUPPORTED_THEMES: Record<Theme, ThemeClassName> = {
  light: "str-chat__theme-light",
  dark: "str-chat__theme-dark",
} as const;

/**
 * Internal, handles the communication between Stream's website related to UI theme toggling.
 *
 * @param targetOrigin the target origin (typically, the https://getstream.io/ domain).
 */
export const useTheme = (dark: boolean) => {
  return SUPPORTED_THEMES[dark ? "dark" : "light"];
};
