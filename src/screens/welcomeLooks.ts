// Four looks are being compared: two layouts, each in two colours. The
// prototype bar switches between them; the real app ships one.
export const welcomeLooks = [
  { id: 'centred-bold', label: 'Centred Bold' },
  { id: 'centred-calm', label: 'Centred Calm' },
  { id: 'panel-calm', label: 'Two Panel Calm' },
  { id: 'panel-bold', label: 'Two Panel Bold' },
] as const

export type WelcomeLook = (typeof welcomeLooks)[number]['id']

// A look saved by an older build of the prototype may no longer exist.
export function asWelcomeLook(value: unknown): WelcomeLook {
  return welcomeLooks.find((look) => look.id === value)?.id ?? welcomeLooks[0].id
}
