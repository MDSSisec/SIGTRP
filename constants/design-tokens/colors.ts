/**
 * Tokens de cor do Design System SIGTRP.
 * Cores semânticas referenciam variáveis do tema (--primary, --muted, etc.).
 * Use no CSS como var(--color-*) ou var(--surface-*), var(--text-*).
 */
export const colorTokens = {
  /** Cores do tema (já definidas em globals.css) */
  semantic: [
    "background",
    "foreground",
    "card",
    "card-foreground",
    "primary",
    "primary-foreground",
    "secondary",
    "secondary-foreground",
    "muted",
    "muted-foreground",
    "accent",
    "accent-foreground",
    "destructive",
    "border",
    "input",
    "ring",
  ] as const,

  /** Superfícies para botões/cards (alias semânticos) */
  surface: {
    subtle: "var(--surface-subtle)",       // fundo de botão secundário
    subtleHover: "var(--surface-subtle-hover)",
    danger: "var(--text-danger)",         // cor de texto destrutivo
    dangerHover: "var(--text-danger-hover)",
  } as const,

  /** Texto semântico */
  text: {
    primary: "var(--foreground)",
    muted: "var(--muted-foreground)",
    inverse: "var(--primary-foreground)",
    danger: "var(--text-danger)",
    dangerHover: "var(--text-danger-hover)",
  } as const,
} as const;

/** Retorna o nome da variável CSS para cor semântica */
export const colorVar = (name: (typeof colorTokens.semantic)[number]) =>
  `var(--${name})` as const;
