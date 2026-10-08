// A small slice of the NCERT books for Class 6 and 7, enough for the fake
// search to feel real. Chapter names and numbers are the real ones from the
// current books (Curiosity and Ganita Prakash).
//
// UNVERIFIED: the page ranges are placeholders. They have not been checked
// against the printed books and must be before anything ships.

export type Subject = 'Science' | 'Mathematics'

export type Chapter = {
  classNum: 6 | 7
  subject: Subject
  book: string
  number: number
  name: string
  pages: [first: number, last: number]
  // Lower-case words and phrases. A question matches when a word in it
  // starts with one of these.
  keywords: string[]
}

export const chapters: Chapter[] = [
  // Class 6 · Science · Curiosity
  { classNum: 6, subject: 'Science', book: 'Curiosity', number: 3, name: 'Mindful Eating: A Path to a Healthy Body', pages: [35, 60], keywords: ['diet', 'nutrient', 'junk food', 'healthy eating', 'balanced'] },
  { classNum: 6, subject: 'Science', book: 'Curiosity', number: 4, name: 'Exploring Magnets', pages: [61, 78], keywords: ['magnet', 'compass', 'pole'] },
  { classNum: 6, subject: 'Science', book: 'Curiosity', number: 5, name: 'Measurement of Length and Motion', pages: [79, 100], keywords: ['length', 'measure', 'metre', 'centimetre', 'ruler', 'motion'] },
  { classNum: 6, subject: 'Science', book: 'Curiosity', number: 7, name: 'Temperature and its Measurement', pages: [119, 134], keywords: ['temperature', 'thermometer', 'celsius', 'fever'] },
  { classNum: 6, subject: 'Science', book: 'Curiosity', number: 8, name: 'A Journey through States of Water', pages: [135, 154], keywords: ['water', 'ice', 'steam', 'evaporat', 'condens', 'melt', 'freez', 'rain', 'cloud'] },
  { classNum: 6, subject: 'Science', book: 'Curiosity', number: 12, name: 'Beyond Earth', pages: [207, 232], keywords: ['star', 'moon', 'sun', 'night sky', 'space', 'galaxy', 'comet', 'asteroid', 'constellation', 'solar', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'] },

  // Class 6 · Mathematics · Ganita Prakash
  { classNum: 6, subject: 'Mathematics', book: 'Ganita Prakash', number: 1, name: 'Patterns in Mathematics', pages: [1, 12], keywords: ['pattern', 'sequence', 'square number', 'triangular number'] },
  { classNum: 6, subject: 'Mathematics', book: 'Ganita Prakash', number: 2, name: 'Lines and Angles', pages: [13, 54], keywords: ['angle', 'line segment', 'protractor', 'acute', 'obtuse'] },
  { classNum: 6, subject: 'Mathematics', book: 'Ganita Prakash', number: 5, name: 'Prime Time', pages: [107, 128], keywords: ['prime', 'factor', 'multiple', 'divisible', 'composite'] },
  { classNum: 6, subject: 'Mathematics', book: 'Ganita Prakash', number: 6, name: 'Perimeter and Area', pages: [129, 150], keywords: ['perimeter', 'area'] },
  { classNum: 6, subject: 'Mathematics', book: 'Ganita Prakash', number: 7, name: 'Fractions', pages: [151, 186], keywords: ['fraction', 'numerator', 'denominator', 'half', 'quarter'] },
  { classNum: 6, subject: 'Mathematics', book: 'Ganita Prakash', number: 9, name: 'Symmetry', pages: [217, 240], keywords: ['symmetr', 'mirror', 'reflection'] },

  // Class 7 · Science · Curiosity
  { classNum: 7, subject: 'Science', book: 'Curiosity', number: 2, name: 'Exploring Substances: Acidic, Basic, and Neutral', pages: [9, 24], keywords: ['acid', 'litmus', 'indicator', 'neutralis'] },
  { classNum: 7, subject: 'Science', book: 'Curiosity', number: 3, name: 'Electricity: Circuits and their Components', pages: [25, 42], keywords: ['electric', 'circuit', 'bulb', 'battery'] },
  { classNum: 7, subject: 'Science', book: 'Curiosity', number: 7, name: 'Heat Transfer in Nature', pages: [89, 106], keywords: ['heat', 'conduction', 'convection', 'radiation'] },
  { classNum: 7, subject: 'Science', book: 'Curiosity', number: 8, name: 'Measurement of Time and Motion', pages: [107, 122], keywords: ['speed', 'clock', 'pendulum', 'motion'] },
  { classNum: 7, subject: 'Science', book: 'Curiosity', number: 10, name: 'Life Processes in Plants', pages: [139, 154], keywords: ['plant', 'photosynthesis', 'leaf', 'leaves', 'chlorophyll', 'stomata'] },
  { classNum: 7, subject: 'Science', book: 'Curiosity', number: 12, name: 'Earth, Moon, and the Sun', pages: [171, 190], keywords: ['day and night', 'night', 'rotat', 'spin', 'eclipse', 'moon', 'sun', 'season'] },

  // Class 7 · Mathematics · Ganita Prakash
  { classNum: 7, subject: 'Mathematics', book: 'Ganita Prakash', number: 1, name: 'Large Numbers Around Us', pages: [1, 22], keywords: ['lakh', 'crore', 'large number', 'million'] },
  { classNum: 7, subject: 'Mathematics', book: 'Ganita Prakash', number: 2, name: 'Arithmetic Expressions', pages: [23, 44], keywords: ['arithmetic expression', 'bracket'] },
  { classNum: 7, subject: 'Mathematics', book: 'Ganita Prakash', number: 3, name: 'A Peek Beyond the Point', pages: [45, 78], keywords: ['decimal', 'tenth', 'hundredth'] },
  { classNum: 7, subject: 'Mathematics', book: 'Ganita Prakash', number: 5, name: 'Parallel and Intersecting Lines', pages: [105, 126], keywords: ['parallel', 'intersect', 'transversal', 'perpendicular'] },
  { classNum: 7, subject: 'Mathematics', book: 'Ganita Prakash', number: 6, name: 'Number Play', pages: [127, 144], keywords: ['number play', 'even number', 'odd number', 'magic square'] },
  { classNum: 7, subject: 'Mathematics', book: 'Ganita Prakash', number: 8, name: 'Working with Fractions', pages: [171, 200], keywords: ['fraction', 'multiply', 'multiplying', 'divide', 'reciprocal'] },
]

// Lower case, no punctuation, single spaces, padded so word starts are easy to find.
export function normalise(text: string): string {
  return ` ${text.toLowerCase().replace(/[^a-z0-9/ ]+/g, ' ').replace(/\s+/g, ' ').trim()} `
}

// The length of the longest keyword that starts a word in the question, or 0.
export function matchScore(question: string, keywords: string[]): number {
  const text = normalise(question)
  return Math.max(0, ...keywords.filter((keyword) => text.includes(` ${keyword}`)).map((keyword) => keyword.length))
}
