// The chapters of the NCERT Science and Mathematics books for Class 6 and 7,
// enough for the fake search to feel real. Chapter names and numbers are the
// ones in the current books (Curiosity and Ganita Prakash); Class 7
// Mathematics lists Part 1 only. Classes 8 to 12 have nothing here, so their
// searches find nothing.
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
  { classNum: 6, subject: 'Science', book: 'Curiosity', number: 1, name: 'The Wonderful World of Science', pages: [1, 8], keywords: ['science', 'scientist', 'scientific', 'experiment', 'hypothesis', 'curious', 'curiosity'] },
  { classNum: 6, subject: 'Science', book: 'Curiosity', number: 2, name: 'Diversity in the Living World', pages: [9, 34], keywords: ['herb', 'shrub', 'tree', 'habitat', 'adapt', 'biodiversity', 'leaf', 'leaves', 'venation', 'root', 'monocot', 'dicot', 'animals', 'plants'] },
  { classNum: 6, subject: 'Science', book: 'Curiosity', number: 3, name: 'Mindful Eating: A Path to a Healthy Body', pages: [35, 60], keywords: ['diet', 'nutrient', 'junk food', 'healthy eating', 'balanced', 'food', 'millet', 'deficiency'] },
  { classNum: 6, subject: 'Science', book: 'Curiosity', number: 4, name: 'Exploring Magnets', pages: [61, 78], keywords: ['magnet', 'compass', 'pole'] },
  { classNum: 6, subject: 'Science', book: 'Curiosity', number: 5, name: 'Measurement of Length and Motion', pages: [79, 100], keywords: ['length', 'measure', 'metre', 'centimetre', 'ruler', 'motion', 'distance'] },
  { classNum: 6, subject: 'Science', book: 'Curiosity', number: 6, name: 'Materials Around Us', pages: [101, 118], keywords: ['material', 'transparent', 'opaque', 'translucent', 'lustre', 'hard', 'soft', 'dissolve', 'soluble', 'float', 'sink'] },
  { classNum: 6, subject: 'Science', book: 'Curiosity', number: 7, name: 'Temperature and its Measurement', pages: [119, 134], keywords: ['temperature', 'thermometer', 'celsius', 'fever'] },
  { classNum: 6, subject: 'Science', book: 'Curiosity', number: 8, name: 'A Journey through States of Water', pages: [135, 154], keywords: ['water', 'ice', 'steam', 'evaporat', 'condens', 'melt', 'freez', 'rain', 'cloud'] },
  { classNum: 6, subject: 'Science', book: 'Curiosity', number: 9, name: 'Methods of Separation in Everyday Life', pages: [155, 174], keywords: ['separat', 'filter', 'filtration', 'sieve', 'sieving', 'winnow', 'thresh', 'mixture', 'churn'] },
  { classNum: 6, subject: 'Science', book: 'Curiosity', number: 10, name: 'Living Creatures: Exploring their Characteristics', pages: [175, 192], keywords: ['living', 'seed', 'germinat', 'life cycle', 'mosquito', 'frog', 'tadpole', 'reproduc', 'excret', 'grow'] },
  { classNum: 6, subject: 'Science', book: 'Curiosity', number: 11, name: 'Nature’s Treasures', pages: [193, 206], keywords: ['air', 'wind', 'soil', 'rock', 'forest', 'resource', 'renewable', 'fossil', 'coal', 'petroleum', 'oxygen'] },
  { classNum: 6, subject: 'Science', book: 'Curiosity', number: 12, name: 'Beyond Earth', pages: [207, 232], keywords: ['star', 'moon', 'sun', 'night sky', 'space', 'galaxy', 'comet', 'asteroid', 'constellation', 'solar', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'universe', 'telescope'] },

  // Class 6 · Mathematics · Ganita Prakash
  { classNum: 6, subject: 'Mathematics', book: 'Ganita Prakash', number: 1, name: 'Patterns in Mathematics', pages: [1, 12], keywords: ['pattern', 'sequence', 'square number', 'triangular number', 'cube number'] },
  { classNum: 6, subject: 'Mathematics', book: 'Ganita Prakash', number: 2, name: 'Lines and Angles', pages: [13, 54], keywords: ['angle', 'line segment', 'protractor', 'acute', 'obtuse', 'ray', 'degree'] },
  { classNum: 6, subject: 'Mathematics', book: 'Ganita Prakash', number: 3, name: 'Number Play', pages: [55, 74], keywords: ['number play', 'palindrom', 'kaprekar', 'digit', 'estimat'] },
  { classNum: 6, subject: 'Mathematics', book: 'Ganita Prakash', number: 4, name: 'Data Handling and Presentation', pages: [75, 106], keywords: ['data', 'graph', 'pictograph', 'tally', 'chart'] },
  { classNum: 6, subject: 'Mathematics', book: 'Ganita Prakash', number: 5, name: 'Prime Time', pages: [107, 128], keywords: ['prime', 'factor', 'multiple', 'divisible', 'composite'] },
  { classNum: 6, subject: 'Mathematics', book: 'Ganita Prakash', number: 6, name: 'Perimeter and Area', pages: [129, 150], keywords: ['perimeter', 'area'] },
  { classNum: 6, subject: 'Mathematics', book: 'Ganita Prakash', number: 7, name: 'Fractions', pages: [151, 186], keywords: ['fraction', 'numerator', 'denominator', 'half', 'quarter'] },
  { classNum: 6, subject: 'Mathematics', book: 'Ganita Prakash', number: 8, name: 'Playing with Constructions', pages: [187, 216], keywords: ['construct', 'circle', 'radius', 'diameter', 'square', 'rectangle', 'diagonal'] },
  { classNum: 6, subject: 'Mathematics', book: 'Ganita Prakash', number: 9, name: 'Symmetry', pages: [217, 240], keywords: ['symmetr', 'mirror', 'reflection'] },
  { classNum: 6, subject: 'Mathematics', book: 'Ganita Prakash', number: 10, name: 'The Other Side of Zero', pages: [241, 268], keywords: ['negative', 'integer', 'zero', 'minus', 'number line'] },

  // Class 7 · Science · Curiosity
  { classNum: 7, subject: 'Science', book: 'Curiosity', number: 1, name: 'The Ever-Evolving World of Science', pages: [1, 8], keywords: ['science', 'scientist', 'scientific', 'experiment'] },
  { classNum: 7, subject: 'Science', book: 'Curiosity', number: 2, name: 'Exploring Substances: Acidic, Basic, and Neutral', pages: [9, 24], keywords: ['acid', 'litmus', 'indicator', 'neutralis', 'basic', 'neutral'] },
  { classNum: 7, subject: 'Science', book: 'Curiosity', number: 3, name: 'Electricity: Circuits and their Components', pages: [25, 42], keywords: ['electric', 'circuit', 'bulb', 'battery', 'cell', 'torch', 'wire'] },
  { classNum: 7, subject: 'Science', book: 'Curiosity', number: 4, name: 'The World of Metals and Non-metals', pages: [43, 58], keywords: ['metal', 'rust', 'iron', 'copper', 'gold', 'sulphur'] },
  { classNum: 7, subject: 'Science', book: 'Curiosity', number: 5, name: 'Changes Around Us: Physical and Chemical', pages: [59, 72], keywords: ['physical change', 'chemical', 'burn', 'combustion', 'change'] },
  { classNum: 7, subject: 'Science', book: 'Curiosity', number: 6, name: 'Adolescence: A Stage of Growth and Change', pages: [73, 88], keywords: ['adolescen', 'puberty', 'teenage', 'hormone', 'growing up'] },
  { classNum: 7, subject: 'Science', book: 'Curiosity', number: 7, name: 'Heat Transfer in Nature', pages: [89, 106], keywords: ['heat', 'conduction', 'convection', 'radiation', 'breeze'] },
  { classNum: 7, subject: 'Science', book: 'Curiosity', number: 8, name: 'Measurement of Time and Motion', pages: [107, 122], keywords: ['speed', 'clock', 'pendulum', 'motion', 'time', 'uniform'] },
  { classNum: 7, subject: 'Science', book: 'Curiosity', number: 9, name: 'Life Processes in Animals', pages: [123, 138], keywords: ['digest', 'stomach', 'intestine', 'breath', 'respirat', 'lung', 'blood', 'heart', 'animal'] },
  { classNum: 7, subject: 'Science', book: 'Curiosity', number: 10, name: 'Life Processes in Plants', pages: [139, 154], keywords: ['plant', 'photosynthesis', 'leaf', 'leaves', 'chlorophyll', 'stomata', 'xylem', 'phloem'] },
  { classNum: 7, subject: 'Science', book: 'Curiosity', number: 11, name: 'Light: Shadows and Reflections', pages: [155, 170], keywords: ['light', 'shadow', 'mirror', 'reflect', 'pinhole', 'periscope', 'image'] },
  { classNum: 7, subject: 'Science', book: 'Curiosity', number: 12, name: 'Earth, Moon, and the Sun', pages: [171, 190], keywords: ['day and night', 'night', 'rotat', 'spin', 'eclipse', 'moon', 'sun', 'season', 'revol'] },

  // Class 7 · Mathematics · Ganita Prakash
  { classNum: 7, subject: 'Mathematics', book: 'Ganita Prakash', number: 1, name: 'Large Numbers Around Us', pages: [1, 22], keywords: ['lakh', 'crore', 'large number', 'million'] },
  { classNum: 7, subject: 'Mathematics', book: 'Ganita Prakash', number: 2, name: 'Arithmetic Expressions', pages: [23, 44], keywords: ['arithmetic expression', 'bracket', 'expression'] },
  { classNum: 7, subject: 'Mathematics', book: 'Ganita Prakash', number: 3, name: 'A Peek Beyond the Point', pages: [45, 78], keywords: ['decimal', 'tenth', 'hundredth'] },
  { classNum: 7, subject: 'Mathematics', book: 'Ganita Prakash', number: 4, name: 'Expressions using Letter-Numbers', pages: [79, 104], keywords: ['variable', 'letter number', 'algebra'] },
  { classNum: 7, subject: 'Mathematics', book: 'Ganita Prakash', number: 5, name: 'Parallel and Intersecting Lines', pages: [105, 126], keywords: ['parallel', 'intersect', 'transversal', 'perpendicular'] },
  { classNum: 7, subject: 'Mathematics', book: 'Ganita Prakash', number: 6, name: 'Number Play', pages: [127, 144], keywords: ['number play', 'even number', 'odd number', 'magic square'] },
  { classNum: 7, subject: 'Mathematics', book: 'Ganita Prakash', number: 7, name: 'A Tale of Three Intersecting Lines', pages: [145, 170], keywords: ['triangle', 'equilateral', 'isosceles', 'scalene'] },
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
