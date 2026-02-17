/**
 * Tokens de borda (radius) do Design System SIGTRP.
 * Alinhado ao --radius do tema. Use no CSS como var(--radius-sm), var(--radius-md), etc.
 */
export const radius = {
  none: "0",
  sm: "calc(var(--radius) - 4px)",
  md: "calc(var(--radius) - 2px)",
  lg: "var(--radius)",
  xl: "calc(var(--radius) + 4px)",
  "2xl": "calc(var(--radius) + 8px)",
  full: "9999px",
} as const;

export type RadiusKey = keyof typeof radius;

export const radiusVar = (key: RadiusKey) => `var(--radius-${key})` as const;
