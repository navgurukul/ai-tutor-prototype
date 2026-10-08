// Canned answers for the likeliest demo questions. The real app writes its
// answers with a model; the prototype picks one of these by keyword.
//
// Every answer is written for an 11-year-old and its facts have been checked.
// Key terms are marked with **two stars**. Blank lines separate paragraphs,
// and lines that start with "- " make a list.
//
// UNVERIFIED: the page numbers are placeholders, like the page ranges in
// textbooks.ts, and must be checked against the printed books.

import { matchScore, type Subject } from './textbooks.ts'

export type Answer = {
  id: string
  classNum: 6 | 7
  subject: Subject
  chapter: number
  page: number
  // Lower-case words and phrases that point to this answer.
  keywords: string[]
  // The question as a student would ask it. Used for suggestion chips and
  // the scripted microphone.
  question: string
  // Shown as a suggestion chip on the empty chat.
  chip?: boolean
  // What the chat is called in the sidebar: 3 to 5 words.
  title: string
  text: string
  simpler: string
}

// Order matters: the first answer whose keywords fit the question wins, so
// narrow topics (dwarf planets) come before broad ones (planets).
export const answers: Answer[] = [
  {
    id: 'dwarf-planets',
    classNum: 6,
    subject: 'Science',
    chapter: 12,
    page: 218,
    keywords: ['dwarf planet', 'dwarf', 'pluto'],
    question: 'Is Pluto a planet?',
    title: 'Pluto and dwarf planets',
    text: `Pluto is a **dwarf planet**. It was called a planet until 2006.

A dwarf planet goes around the Sun and is round, like a planet. But it is small, and it has not cleared other objects out of its path.

Pluto is not the only one. Ceres, Eris, Haumea and Makemake are dwarf planets too.`,
    simpler: `Pluto is a **dwarf planet**. That means it is a small, round world that goes around the Sun. There are a few more like it, such as Ceres and Eris.`,
  },
  {
    id: 'exoplanets',
    classNum: 6,
    subject: 'Science',
    chapter: 12,
    page: 229,
    keywords: ['exoplanet', 'exo planet', 'exo plan', 'other stars', 'another star', 'outside our solar system'],
    question: 'What are exoplanets?',
    title: 'Planets around other stars',
    text: `An **exoplanet** is a planet that goes around a star other than our Sun. So every exoplanet is outside our solar system.

Exoplanets are real. Scientists have found thousands of them, and they keep finding more.`,
    simpler: `Our Sun has planets. Other stars have planets too. Those faraway planets are called **exoplanets**, and scientists have found thousands of them.`,
  },
  {
    id: 'planets',
    classNum: 6,
    subject: 'Science',
    chapter: 12,
    page: 216,
    keywords: ['planet'],
    question: 'How many planets are there in our solar system?',
    title: 'The eight planets',
    text: `There are eight **planets** in our solar system. Starting from the Sun, they are Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune.

The first four are small and rocky. The last four are much bigger. **Jupiter** is the biggest planet of all.`,
    simpler: `Eight planets go around the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune. We live on **Earth**, the third one.`,
  },
  {
    id: 'solar-system',
    classNum: 6,
    subject: 'Science',
    chapter: 12,
    page: 215,
    keywords: ['solar system'],
    question: 'What is the solar system?',
    chip: true,
    title: 'Our solar system explained',
    text: `The **solar system** is the Sun and everything that travels around it.

Eight **planets** go around the Sun. So do their moons, and many smaller objects such as **asteroids** and **comets**.

The Sun is a **star**. It is much bigger than any planet, and its pull keeps everything else moving around it.`,
    simpler: `The Sun is in the middle. Eight planets, their moons and many small rocks all go around the Sun. Together they are called the **solar system**.`,
  },
  {
    id: 'components-of-food',
    classNum: 6,
    subject: 'Science',
    chapter: 3,
    page: 41,
    keywords: ['components of food', 'parts of food', 'in our food', 'in food', 'nutrient', 'carbohydrate', 'protein', 'vitamin', 'mineral', 'roughage'],
    question: 'What are the components of food?',
    chip: true,
    title: 'The components of food',
    text: `Food is made of **nutrients**. The main ones are **carbohydrates**, **fats**, **proteins**, **vitamins** and **minerals**.

- Carbohydrates and fats give you energy.
- Proteins help your body grow and repair itself.
- Vitamins and minerals keep you healthy and protect you from diseases.

Food also has **roughage** (fibre) and water. Your body needs both.`,
    simpler: `Food has different parts, and each part helps you in its own way. Some food gives you energy, like rice and oil. Some helps you grow, like dal and eggs. Some keeps you from falling ill, like fruits and vegetables.`,
  },
  {
    id: 'magnets',
    classNum: 6,
    subject: 'Science',
    chapter: 4,
    page: 63,
    keywords: ['magnet'],
    question: 'What does a magnet attract?',
    chip: true,
    title: 'What magnets attract',
    text: `A magnet attracts **magnetic materials**. Iron, nickel and cobalt are magnetic. Things made of wood, plastic, glass or paper are not.

Every magnet has two **poles**, a north pole and a south pole. Two poles of the same kind push each other away. A north pole and a south pole pull towards each other.`,
    simpler: `A magnet pulls things made of **iron**, like pins and nails. It does not pull wood, plastic or paper.`,
  },
  {
    id: 'fractions',
    classNum: 6,
    subject: 'Mathematics',
    chapter: 7,
    page: 152,
    keywords: ['fraction', 'numerator', 'denominator'],
    question: 'What is a fraction?',
    chip: true,
    title: 'What a fraction is',
    text: `A **fraction** shows a part of a whole. If you cut a roti into 4 equal pieces and eat 1 piece, you have eaten 1/4 of the roti.

The number on the bottom is the **denominator**. It tells you how many equal parts the whole is cut into.

The number on top is the **numerator**. It tells you how many of those parts you have.`,
    simpler: `A fraction is a part of something. Cut one roti into 2 equal pieces. Each piece is one **half**, which we write as 1/2.`,
  },
  {
    id: 'multiplying-fractions',
    classNum: 7,
    subject: 'Mathematics',
    chapter: 8,
    page: 176,
    keywords: ['multiply', 'multiplying', 'multiplication'],
    question: 'How do I multiply two fractions?',
    chip: true,
    title: 'Multiplying two fractions',
    text: `To multiply two fractions, multiply the top numbers together, then multiply the bottom numbers together.

2/3 × 4/5 = 8/15

Here, 2 × 4 = 8 goes on top and 3 × 5 = 15 goes on the bottom.

The top number is called the **numerator** and the bottom number is the **denominator**.`,
    simpler: `Multiply top with top, and bottom with bottom. For 1/2 × 1/3, the top is 1 × 1 = 1 and the bottom is 2 × 3 = 6. So the answer is **1/6**.`,
  },
  {
    id: 'photosynthesis',
    classNum: 7,
    subject: 'Science',
    chapter: 10,
    page: 142,
    keywords: ['photosynthesis', 'plants make', 'plant make', 'chlorophyll', 'make their food', 'make their own food', 'make food'],
    question: 'How do plants make their food?',
    chip: true,
    title: 'How plants make food',
    text: `Plants make their own food. This is called **photosynthesis**.

It happens mostly in the leaves. Leaves have a green substance called **chlorophyll**, which catches sunlight. With that light, the plant turns water and **carbon dioxide** from the air into food. The food is a sugar called glucose.

While doing this, the plant gives out **oxygen**, the gas we breathe in.`,
    simpler: `Plants cook their own food in their leaves. They need three things: sunlight, water and air. While they do this, they give out **oxygen** for us to breathe.`,
  },
  {
    id: 'speed',
    classNum: 7,
    subject: 'Science',
    chapter: 8,
    page: 114,
    keywords: ['speed'],
    question: 'What is speed?',
    chip: true,
    title: 'Speed, distance and time',
    text: `**Speed** tells you how fast something moves. It is the distance covered in one unit of time.

Speed = distance ÷ time

If a bus covers 100 kilometres in 2 hours, its speed is 50 kilometres per hour. Speed is also measured in **metres per second**.`,
    simpler: `Speed means how fast. If you walk 4 kilometres in 1 hour, your **speed** is 4 kilometres per hour. A faster thing covers more distance in the same time.`,
  },
  {
    id: 'day-and-night',
    classNum: 7,
    subject: 'Science',
    chapter: 12,
    page: 173,
    keywords: ['day and night', 'night and day', 'rotation', 'rotate', 'spin'],
    question: 'Why do we have day and night?',
    chip: true,
    title: 'Why day and night happen',
    text: `Earth spins like a top. This spinning is called **rotation**. One full spin takes about 24 hours.

The side of Earth that faces the Sun has day. The side that faces away from the Sun has night.

As Earth keeps turning, day becomes night and night becomes day.`,
    simpler: `Earth keeps spinning. When your part of Earth faces the Sun, it is **day**. When it turns away from the Sun, it is **night**.`,
  },
]

// The answer for a question in one class, or nothing: the first one in the
// list above with a keyword in the question.
export function findAnswer(question: string, classNum: number, chapter?: number): Answer | undefined {
  return answers.find(
    (answer) =>
      answer.classNum === classNum && (chapter === undefined || answer.chapter === chapter) && matchScore(question, answer.keywords) > 0,
  )
}

// Three or four questions to show as chips on the empty chat.
export function suggestionsFor(classNum: number): string[] {
  return answers.filter((answer) => answer.classNum === classNum && answer.chip).map((answer) => answer.question)
}
