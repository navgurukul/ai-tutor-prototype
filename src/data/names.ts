// Friendly words for made-up names like "Brave Owl". Nothing here could
// read as an insult, and none has digits.
export const adjectives = [
  'Brave', 'Clever', 'Curious', 'Kind', 'Bright', 'Calm', 'Happy', 'Quick', 'Gentle', 'Bold',
  'Jolly', 'Lucky', 'Sunny', 'Merry', 'Wise', 'Eager', 'Friendly', 'Cheerful', 'Mighty', 'Swift',
]

// A name as it is saved: no spaces at the ends, one space between words.
export const cleanName = (name: string) => name.trim().replace(/\s+/g, ' ')

// Two names are the same whatever their capitals and spacing.
export const sameName = (a: string, b: string) => cleanName(a).toLowerCase() === cleanName(b).toLowerCase()

// An adjective plus the chosen animal that no profile on this laptop has yet.
// `not` is the name on screen now, so "Surprise me" always changes it.
export function makeName(animalName: string, taken: string[], not = ''): string {
  const free = adjectives
    .map((adjective) => `${adjective} ${animalName}`)
    .filter((name) => !sameName(name, not) && !taken.some((other) => sameName(other, name)))
  return free[Math.floor(Math.random() * free.length)] ?? `${adjectives[0]} ${animalName}`
}
