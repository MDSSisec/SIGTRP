/**
 * Tokens de tipografia do Design System SIGTRP.
 * Use no CSS como var(--font-size-*), var(--font-weight-*), var(--line-height-*).
 */
export const fontSize = {
  xs: "0.75rem",    // 12px
  sm: "0.875rem",   // 14px
  base: "1rem",     // 16px
  lg: "1.125rem",   // 18px
  xl: "1.25rem",    // 20px
  "2xl": "1.5rem",  // 24px
  "3xl": "1.875rem", // 30px
} as const;

export const fontWeight = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const lineHeight = {
  tight: "1.25",
  normal: "1.5",
  relaxed: "1.625",
} as const;

export type FontSizeKey = keyof typeof fontSize;
export type FontWeightKey = keyof typeof fontWeight;

export const fontSizeVar = (key: FontSizeKey) => `var(--font-size-${key})` as const;
export const fontWeightVar = (key: FontWeightKey) => `var(--font-weight-${key})` as const;
