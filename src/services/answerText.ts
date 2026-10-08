// Answer text is plain text with a few marks: blank lines between blocks,
// "## " for a heading, "### " for a sub-heading, "- " for a list item and
// **two stars** around a key term. The screen and the voice both read it
// through here, so they agree on which word is which.

export type Piece = {
  text: string
  // Written between two stars.
  term: boolean
  // The word this is part of, counting from 0 through the whole answer.
  // Left out for the space between two words.
  word?: number
}

export type Block = {
  kind: 'heading' | 'subheading' | 'paragraph' | 'list'
  // One line, or one for each item of a list.
  lines: Piece[][]
}

export function parseAnswer(text: string): Block[] {
  let count = 0

  function line(text: string): Piece[] {
    const pieces: Piece[] = []
    // A word can carry on past the end of a key term, as in "**hypothesis**."
    let open = false
    text.split(/\*\*(.+?)\*\*/g).forEach((part, index) => {
      const term = index % 2 === 1
      for (const chunk of part.split(/(\s+)/)) {
        if (chunk === '') continue
        if (/^\s/.test(chunk)) {
          pieces.push({ text: ' ', term })
          open = false
          continue
        }
        if (!open) count += 1
        pieces.push({ text: chunk, term, word: count - 1 })
        open = true
      }
    })
    return pieces
  }

  return text
    .trim()
    .split(/\n{2,}/)
    .map((block): Block => {
      if (block.startsWith('### ')) return { kind: 'subheading', lines: [line(block.slice(4))] }
      if (block.startsWith('## ')) return { kind: 'heading', lines: [line(block.slice(3))] }
      const rows = block.split('\n')
      if (rows.every((row) => row.startsWith('- '))) return { kind: 'list', lines: rows.map((row) => line(row.slice(2))) }
      return { kind: 'paragraph', lines: [line(block)] }
    })
}
