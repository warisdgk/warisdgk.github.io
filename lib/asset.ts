/**
 * Prefix a public asset path with the basePath so it resolves on project
 * sites (served from /<repo>). On user sites the prefix is empty. Use this for
 * raw <a href> or url() references; next/link and metadata already handle it.
 */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (!path.startsWith('/')) path = `/${path}`;
  return `${base}${path}`;
}
