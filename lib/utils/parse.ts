/**
 * Converte valor monetário em formato brasileiro (ex.: "R$ 720.000,00") para número.
 */
export function parseValorModelo(s: string | undefined): number {
  if (!s || typeof s !== "string") return 0
  const limpo = s
    .replace(/R\$\s?/i, "")
    .replace(/\./g, "")
    .replace(",", ".")
    .trim()
  const n = parseFloat(limpo)
  return Number.isNaN(n) ? 0 : n
}
