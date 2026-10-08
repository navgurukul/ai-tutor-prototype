// The ten profile animals. Emoji are placeholders: illustrated avatars come later.
export type Animal = { id: string; name: string; emoji: string; tint: string }

export const animals: Animal[] = [
  { id: 'lion', name: 'Lion', emoji: '🦁', tint: 'orange-tint' },
  { id: 'elephant', name: 'Elephant', emoji: '🐘', tint: 'ink-tint' },
  { id: 'tiger', name: 'Tiger', emoji: '🐯', tint: 'coral-tint' },
  { id: 'panda', name: 'Panda', emoji: '🐼', tint: 'green-tint' },
  { id: 'eagle', name: 'Eagle', emoji: '🦅', tint: 'blue-tint' },
  { id: 'parrot', name: 'Parrot', emoji: '🦜', tint: 'pink-tint' },
  { id: 'owl', name: 'Owl', emoji: '🦉', tint: 'orange-tint' },
  { id: 'penguin', name: 'Penguin', emoji: '🐧', tint: 'blue-tint' },
  { id: 'dolphin', name: 'Dolphin', emoji: '🐬', tint: 'pink-tint' },
  { id: 'butterfly', name: 'Butterfly', emoji: '🦋', tint: 'green-tint' },
]
