/**
 * Design System SIGTRP — tokens de design
 *
 * Use os tokens no CSS via variáveis: var(--spacing-4), var(--font-size-sm), etc.
 * Use no TS para estilos inline ou lógica: import { spacing, fontSize } from "@/constants/design-tokens"
 */
export { spacing, spacingVar, type SpacingKey } from "./spacing";
export { colorTokens, colorVar } from "./colors";
export {
  fontSize,
  fontWeight,
  lineHeight,
  fontSizeVar,
  fontWeightVar,
  type FontSizeKey,
  type FontWeightKey,
} from "./typography";
export { radius, radiusVar, type RadiusKey } from "./radius";
