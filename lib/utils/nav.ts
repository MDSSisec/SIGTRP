/**
 * Utilitários de navegação do menu lateral (sidebar).
 * Funções puras para href, item ativo e chave do item aberto.
 */

type NavItemLike = { title: string; items?: Array<{ url: string; slug?: string }> }
type SubItemLike = { url: string; slug?: string }

/** Gera o href de um subitem (projeto com ?secao= ou URL direta). */
export function getSubItemHref(
  projectId: string | null,
  sub: SubItemLike
): string {
  if (projectId && sub.slug) {
    return `/InternalUser/projects/${projectId}?secao=${sub.slug}`
  }
  return sub.url
}

/** Indica se o subitem está ativo (rota atual ou seção atual no projeto). */
export function isSubItemActive(
  sub: SubItemLike,
  pathname: string,
  secao: string | null,
  projectId: string | null,
  defaultSection: string
): boolean {
  if (projectId && sub.slug) {
    const currentSecao = secao ?? defaultSection
    return currentSecao === sub.slug
  }
  return pathname === sub.url
}

/** Retorna o título do item do menu que deve ficar aberto com base na rota/seção. */
export function getNavOpenKeyFromPath(
  items: NavItemLike[],
  pathname: string,
  secao: string | null,
  projectId: string | null
): string | null {
  if (projectId) {
    if (secao) {
      const item = items.find((i) =>
        i.items?.some((sub) => "slug" in sub && sub.slug === secao)
      )
      return item?.title ?? null
    }
    return items[0]?.title ?? null
  }
  const item = items.find((i) =>
    i.items?.some((sub) => sub.url === pathname)
  )
  return item?.title ?? null
}
