import source from '../styles/tokens.css?raw'

export type RootToken = { name: string; value: string }

// Read the tokens exactly as they are written in tokens.css, so the Tokens
// page can never drift from the file (the built CSS rewrites values, e.g.
// #FFFFFF becomes #fff).
export const rootTokens: RootToken[] = Array.from(
  source.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/--([\w-]+)\s*:\s*([^;]+);/g),
  (match) => ({ name: match[1], value: match[2].trim() }),
)

const values = new Map(rootTokens.map((token) => [token.name, token.value]))

export function tokenValue(name: string): string | undefined {
  return values.get(name)
}
