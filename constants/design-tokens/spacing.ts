/**
 * Escala de espaçamento do Design System SIGTRP.
 * Use no CSS como var(--spacing-{key}) ou no TS para estilos inline.
 */
export const spacing = {
  0: "0",
  1: "0.25rem",   // 4px
  2: "0.5rem",    // 8px
  3: "0.75rem",   // 12px
  4: "1rem",      // 16px
  5: "1.25rem",   // 20px
  6: "1.5rem",    // 24px
  8: "2rem",      // 32px
  10: "2.5rem",   // 40px
  12: "3rem",     // 48px
  16: "4rem",     // 64px
  20: "5rem",     // 80px
  24: "6rem",     // 96px
} as const;

export type SpacingKey = keyof typeof spacing;

/** Nomes das variáveis CSS (--spacing-1, --spacing-2, ...) */
export const spacingVar = (key: SpacingKey) => `var(--spacing-${key})` as const;
