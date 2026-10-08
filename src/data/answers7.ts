// Ready answers for Class 7: Science (Curiosity), then Mathematics (Ganita
// Prakash). See answers.ts for how they are written and picked.
//
// Order matters: the first answer whose keywords fit the question wins, so
// narrow topics (eclipses) come before broad ones (day and night).

import type { Answer } from './answers.ts'

export const class7: Answer[] = [
  // Mathematics · Chapter 8 · Working with Fractions
  {
    id: 'multiplying-fractions',
    classNum: 7,
    subject: 'Mathematics',
    chapter: 8,
    page: 176,
    keywords: ['multiply', 'multiplying', 'multiplication'],
    question: 'How do I multiply two fractions?',
    sample: true,
    title: 'Multiplying two fractions',
    text: `To multiply two fractions, multiply the top numbers together, then multiply the bottom numbers together.

2/3 × 4/5 = 8/15

Here, 2 × 4 = 8 goes on top and 3 × 5 = 15 goes on the bottom.

The top number is called the **numerator** and the bottom number is the **denominator**.`,
    simpler: `Multiply top with top, and bottom with bottom. For 1/2 × 1/3, the top is 1 × 1 = 1 and the bottom is 2 × 3 = 6. So the answer is **1/6**.`,
  },
  {
    id: 'dividing-fractions',
    classNum: 7,
    subject: 'Mathematics',
    chapter: 8,
    page: 188,
    keywords: ['divide', 'dividing', 'division', 'reciprocal'],
    question: 'How do I divide by a fraction?',
    title: 'Dividing by a fraction',
    text: `To divide by a fraction, multiply by its **reciprocal**.

The reciprocal is the fraction turned upside down. The reciprocal of 2/3 is 3/2.

1/2 ÷ 1/4 = 1/2 × 4/1 = 4/2 = 2

This makes sense, because there are 2 quarters in one half.`,
    simpler: `Turn the second fraction upside down, then multiply. 1/2 ÷ 1/4 becomes 1/2 × 4, which is **2**. There are 2 quarters in a half.`,
  },

  // Science · Chapter 12 · Earth, Moon, and the Sun
  {
    id: 'eclipses',
    classNum: 7,
    subject: 'Science',
    chapter: 12,
    page: 184,
    keywords: ['eclipse'],
    question: 'What is an eclipse?',
    title: 'Solar and lunar eclipses',
    text: `An eclipse happens when the Sun, the Earth and the Moon come in a straight line.

- In a **solar eclipse**, the Moon comes between the Sun and the Earth. The Moon blocks the Sun, and its shadow falls on a part of the Earth.
- In a **lunar eclipse**, the Earth comes between the Sun and the Moon. The shadow of the Earth falls on the Moon.

Never look straight at the Sun, even during an eclipse. It can harm your eyes.`,
    simpler: `Sometimes the Moon comes in front of the Sun and hides it for a short time. That is a **solar eclipse**. Sometimes the shadow of the Earth falls on the Moon. That is a **lunar eclipse**.`,
  },
  {
    id: 'seasons',
    classNum: 7,
    subject: 'Science',
    chapter: 12,
    page: 179,
    keywords: ['season', 'summer', 'winter', 'tilt', 'revolution', 'revolve'],
    question: 'Why do we have seasons?',
    title: 'Why seasons change',
    text: `The Earth goes around the Sun once in about 365 days. This movement is called **revolution**.

The Earth is also **tilted** to one side. Because of this tilt, for a part of the year the northern half of the Earth leans towards the Sun. It gets more direct sunlight and longer days, so it has summer. The southern half has winter at that time.

Six months later it is the other way around.

Seasons do not happen because the Earth comes closer to the Sun.`,
    simpler: `The Earth is tilted as it goes around the Sun. When our part of the Earth leans towards the Sun, we get more sunlight and it is **summer**. When it leans away, it is **winter**.`,
  },
  {
    id: 'day-and-night',
    classNum: 7,
    subject: 'Science',
    chapter: 12,
    page: 173,
    keywords: ['day and night', 'night and day', 'rotation', 'rotate', 'spin'],
    question: 'Why do we have day and night?',
    sample: true,
    title: 'Why day and night happen',
    text: `Earth spins like a top. This spinning is called **rotation**. One full spin takes about 24 hours.

The side of Earth that faces the Sun has day. The side that faces away from the Sun has night.

As Earth keeps turning, day becomes night and night becomes day.`,
    simpler: `Earth keeps spinning. When your part of Earth faces the Sun, it is **day**. When it turns away from the Sun, it is **night**.`,
  },

  // Science · Chapter 10 · Life Processes in Plants
  {
    id: 'plants-breathing',
    classNum: 7,
    subject: 'Science',
    chapter: 10,
    page: 150,
    keywords: ['stomata', 'plants breathe', 'plant breathe', 'plants respire', 'respiration in plant'],
    question: 'Do plants breathe?',
    title: 'How plants breathe',
    text: `Yes. Plants **respire** all the time, day and night. They take in oxygen and give out carbon dioxide. This is how they get energy from their food.

Leaves have tiny openings called **stomata**. Gases go in and out through them. Roots take in air from the spaces in the soil.

In the daytime, plants also make food by photosynthesis. That uses carbon dioxide and gives out oxygen.`,
    simpler: `Yes, plants breathe too. Their leaves have very tiny holes called **stomata**, and air goes in and out through them.`,
  },
  {
    id: 'transport-in-plants',
    classNum: 7,
    subject: 'Science',
    chapter: 10,
    page: 147,
    keywords: ['xylem', 'phloem', 'transport in plant', 'water reach', 'roots absorb', 'root'],
    question: 'How does water reach the leaves of a plant?',
    title: 'Water inside a plant',
    text: `Roots take in water and minerals from the soil.

Inside the plant there are thin tubes called **xylem**. They carry the water and minerals up through the stem to the leaves.

Another set of tubes, called **phloem**, carries the food made in the leaves to all the other parts of the plant.`,
    simpler: `The roots drink water from the soil. Thin pipes inside the stem, called **xylem**, carry the water up to the leaves.`,
  },
  {
    id: 'photosynthesis',
    classNum: 7,
    subject: 'Science',
    chapter: 10,
    page: 142,
    keywords: ['photosynthesis', 'plants make', 'plant make', 'chlorophyll', 'make their food', 'make their own food', 'make food'],
    question: 'How do plants make their food?',
    sample: true,
    title: 'How plants make food',
    text: `Plants make their own food. This is called **photosynthesis**.

It happens mostly in the leaves. Leaves have a green substance called **chlorophyll**, which catches sunlight. With that light, the plant turns water and **carbon dioxide** from the air into food. The food is a sugar called glucose.

While doing this, the plant gives out **oxygen**, the gas we breathe in.`,
    simpler: `Plants cook their own food in their leaves. They need three things: sunlight, water and air. While they do this, they give out **oxygen** for us to breathe.`,
  },

  // Science · Chapter 9 · Life Processes in Animals
  {
    id: 'digestion',
    classNum: 7,
    subject: 'Science',
    chapter: 9,
    page: 126,
    keywords: ['digest', 'stomach', 'intestine', 'saliva', 'food pipe', 'oesophagus'],
    question: 'How is food digested in our body?',
    sample: true,
    title: 'How food is digested',
    text: `**Digestion** breaks food into simpler forms that the body can use.

- **Mouth**: teeth break the food into small pieces, and saliva starts to digest it.
- **Food pipe**: it pushes the food down to the stomach.
- **Stomach**: it churns the food and mixes it with digestive juices.
- **Small intestine**: digestion is completed here, and the digested food passes into the blood.
- **Large intestine**: it takes water back from what is left.

The waste that cannot be digested leaves the body.`,
    simpler: `You chew food in your mouth. It goes down a pipe to your **stomach**, where it is mashed and mixed with juices. Then the useful parts go into your blood and the waste leaves your body.`,
  },
  {
    id: 'breathing',
    classNum: 7,
    subject: 'Science',
    chapter: 9,
    page: 133,
    keywords: ['breath', 'respirat', 'lung', 'inhale', 'exhale'],
    question: 'How do we breathe?',
    title: 'Breathing and respiration',
    text: `When you breathe in, air goes through your nose and down the windpipe into your **lungs**.

In the lungs, **oxygen** from the air passes into the blood. **Carbon dioxide** passes from the blood into the lungs, and you breathe it out.

The body uses oxygen to break down food and release energy. This is called **respiration**.`,
    simpler: `You breathe in air through your nose. It goes into your **lungs**. Your body takes the oxygen it needs, and you breathe out the air it does not need.`,
  },

  // Science · Chapter 6 · Adolescence
  {
    id: 'adolescence',
    classNum: 7,
    subject: 'Science',
    chapter: 6,
    page: 75,
    keywords: ['adolescen', 'puberty', 'teenage', 'growing up'],
    question: 'What is adolescence?',
    title: 'Adolescence and growing up',
    text: `**Adolescence** is the time of life when a child’s body grows and changes to become an adult. It usually lasts from about 10 to 19 years of age.

Many changes happen. You grow taller quickly, your voice may change, and the shape of your body changes. Your feelings and moods can change too.

These changes are natural. They happen at a slightly different time for each person.

Eating well, staying clean, playing and sleeping enough all help. If something worries you, talk to an adult you trust.`,
    simpler: `**Adolescence** is the time when a child slowly becomes a grown-up. Your body grows fast and changes. This happens to everyone, and it is normal.`,
  },

  // Science · Chapter 2 · Exploring Substances
  {
    id: 'acids-and-bases',
    classNum: 7,
    subject: 'Science',
    chapter: 2,
    page: 11,
    keywords: ['acid', 'bases', 'basic', 'litmus', 'indicator', 'neutral', 'turmeric'],
    question: 'What are acids and bases?',
    sample: true,
    title: 'Acids and bases',
    text: `**Acids** are found in sour things, such as lemon juice, vinegar, curd and tamarind.

**Bases** feel soapy. Baking soda and soap solutions are basic.

We must never taste or touch an unknown substance to test it. We use an **indicator** instead.

- Acids turn blue litmus paper red.
- Bases turn red litmus paper blue.
- A **neutral** substance, like sugar solution, changes neither.

When an acid and a base are mixed in the right amounts, they cancel each other out. This is called **neutralisation**.`,
    simpler: `Sour things like lemon have **acids** in them. Soapy things like soap water are **bases**. A special paper called litmus changes colour to tell us which is which.`,
  },

  // Science · Chapter 4 · The World of Metals and Non-metals
  {
    id: 'rusting',
    classNum: 7,
    subject: 'Science',
    chapter: 4,
    page: 53,
    keywords: ['rust', 'galvan', 'corrosion'],
    question: 'Why does iron rust?',
    title: 'Why iron rusts',
    text: `Iron rusts when it stays in contact with both **air and water**. Moist air is enough.

The iron slowly changes into a brown, flaky substance called **rust**. Rust is a new substance, and it makes the iron weak.

To stop rusting, we keep air and water away from the iron:

- by painting it,
- by putting oil or grease on it,
- or by coating it with zinc. This is called **galvanisation**.`,
    simpler: `When iron stays wet in the air, it turns brown and flaky. That brown layer is **rust**. Paint or oil keeps water and air away, so the iron does not rust.`,
  },
  {
    id: 'metals-and-non-metals',
    classNum: 7,
    subject: 'Science',
    chapter: 4,
    page: 45,
    keywords: ['metal', 'non metal', 'nonmetal', 'malleab', 'ductil', 'sonorous'],
    question: 'What is the difference between metals and non-metals?',
    title: 'Metals and non-metals',
    text: `**Metals** such as iron, copper, aluminium and gold are usually hard and shiny.

- They can be beaten into thin sheets. This is called being **malleable**.
- They can be drawn into wires. This is called being **ductile**.
- They make a ringing sound when struck. This is called being **sonorous**.
- They let heat and electricity pass through them easily.

**Non-metals** such as sulphur and carbon are usually dull. The solid ones break easily, and most do not let heat or electricity pass through them easily.`,
    simpler: `**Metals** like iron and copper are hard and shiny, and they can be made into sheets and wires. **Non-metals** like coal are dull and break easily.`,
  },

  // Science · Chapter 5 · Changes Around Us
  {
    id: 'physical-and-chemical-changes',
    classNum: 7,
    subject: 'Science',
    chapter: 5,
    page: 61,
    keywords: ['physical change', 'chemical change', 'physical and chemical', 'chemical', 'reversible', 'irreversible'],
    question: 'What is the difference between a physical and a chemical change?',
    title: 'Physical and chemical changes',
    text: `In a **physical change**, only the shape, size or state of a substance changes. No new substance is formed. Melting ice, tearing paper and dissolving sugar in water are physical changes.

In a **chemical change**, one or more new substances are formed. Burning paper, rusting of iron, cooking food and milk turning into curd are chemical changes.

Many physical changes can be reversed. Most chemical changes cannot be reversed easily.`,
    simpler: `Melting ice is a **physical change**: it is still water, and you can freeze it again. Burning paper is a **chemical change**: it becomes ash, and you cannot get the paper back.`,
  },

  // Science · Chapter 3 · Electricity
  {
    id: 'conductors-and-insulators',
    classNum: 7,
    subject: 'Science',
    chapter: 3,
    page: 36,
    keywords: ['conductor', 'insulator'],
    question: 'What are conductors and insulators?',
    title: 'Conductors and insulators',
    text: `A **conductor** lets electric current pass through it. Metals such as copper, aluminium and iron are good conductors.

An **insulator** does not let electric current pass through it. Rubber, plastic, glass and dry wood are insulators.

This is why electric wires are made of copper on the inside and covered with plastic on the outside. The plastic keeps us safe.`,
    simpler: `Electricity can pass through metals like copper. These are **conductors**. It cannot pass through plastic or rubber. These are **insulators**, and they keep us safe from shocks.`,
  },
  {
    id: 'electric-circuit',
    classNum: 7,
    subject: 'Science',
    chapter: 3,
    page: 27,
    keywords: ['circuit', 'electric', 'bulb', 'battery', 'switch', 'current'],
    question: 'What is an electric circuit?',
    title: 'A simple electric circuit',
    text: `An **electric circuit** is a complete path along which electric current can flow.

A simple circuit has a cell, wires, a bulb and a switch. The current flows from the positive end of the cell, through the wires and the bulb, and back to the negative end.

- When the switch is **on**, the path is complete and the bulb glows.
- When the switch is **off**, there is a gap in the path and the bulb does not glow.`,
    simpler: `Electricity needs a full loop to flow: from the cell, through the wire and the bulb, and back to the cell. This loop is a **circuit**. If the loop is broken, the bulb goes off.`,
  },

  // Science · Chapter 7 · Heat Transfer in Nature
  {
    id: 'heat-transfer',
    classNum: 7,
    subject: 'Science',
    chapter: 7,
    page: 91,
    keywords: ['heat', 'conduction', 'convection', 'radiation', 'sea breeze', 'land breeze'],
    question: 'How does heat travel?',
    title: 'Three ways heat travels',
    text: `Heat always moves from a hotter place to a colder place. It travels in three ways.

- **Conduction** happens in solids. Heat passes from one part to the next. The handle of a steel spoon left in hot dal becomes hot.
- **Convection** happens in liquids and gases. The heated part rises and the cooler part moves in to take its place. This is how water heats up in a pot.
- **Radiation** needs nothing in between. The heat of the Sun reaches us through empty space.`,
    simpler: `Heat moves from hot things to cold things. A spoon in hot dal becomes hot. Warm air rises. And the heat of the **Sun** travels all the way through space to reach us.`,
  },

  // Science · Chapter 8 · Measurement of Time and Motion
  {
    id: 'pendulum',
    classNum: 7,
    subject: 'Science',
    chapter: 8,
    page: 109,
    keywords: ['pendulum', 'oscillation', 'time period', 'clock', 'sundial', 'measure time'],
    question: 'How does a pendulum measure time?',
    title: 'Pendulums and time',
    text: `A **simple pendulum** is a small heavy ball, called a bob, that hangs from a string.

Pull the bob to one side and let it go. It swings to and fro. One complete to-and-fro swing is one **oscillation**. The time it takes is called the **time period**.

A pendulum of a fixed length takes the same time for every swing. That is why pendulums were used in clocks. A longer pendulum takes more time for each swing.

The standard unit of time is the **second**.`,
    simpler: `A pendulum is a ball hanging on a string. Each swing takes the same amount of time. So we can count the swings to **measure time**, as old clocks did.`,
  },
  {
    id: 'speed',
    classNum: 7,
    subject: 'Science',
    chapter: 8,
    page: 114,
    keywords: ['speed'],
    question: 'What is speed?',
    sample: true,
    title: 'Speed, distance and time',
    text: `**Speed** tells you how fast something moves. It is the distance covered in one unit of time.

Speed = distance ÷ time

If a bus covers 100 kilometres in 2 hours, its speed is 50 kilometres per hour. Speed is also measured in **metres per second**.`,
    simpler: `Speed means how fast. If you walk 4 kilometres in 1 hour, your **speed** is 4 kilometres per hour. A faster thing covers more distance in the same time.`,
  },

  // Science · Chapter 11 · Light: Shadows and Reflections
  {
    id: 'shadows',
    classNum: 7,
    subject: 'Science',
    chapter: 11,
    page: 158,
    keywords: ['shadow', 'opaque', 'light travel', 'transparent', 'translucent'],
    question: 'How is a shadow formed?',
    title: 'How shadows form',
    text: `Light travels in **straight lines**. When an object blocks the light, a dark area forms behind it. This dark area is a **shadow**.

A shadow needs three things:

- a source of light,
- an **opaque** object, which does not let light pass through,
- and a surface for the shadow to fall on, such as a wall or the ground.

Clear glass lets almost all the light through, so it makes hardly any shadow.`,
    simpler: `Light cannot bend around you. When you stand in sunlight, your body blocks the light, and a dark shape appears on the ground. That is your **shadow**.`,
  },
  {
    id: 'mirrors',
    classNum: 7,
    subject: 'Science',
    chapter: 11,
    page: 164,
    keywords: ['mirror', 'reflect', 'image'],
    question: 'What happens when light falls on a mirror?',
    title: 'Mirrors and reflection',
    text: `A mirror sends light back. This is called **reflection**, and it is how we see an image in a mirror.

The image in a flat mirror:

- is the same size as the object,
- is upright,
- seems to be as far behind the mirror as the object is in front of it,
- and has its left and right sides swapped.

If you raise your right hand, the image seems to raise its left hand.`,
    simpler: `A mirror bounces light back to your eyes. That is why you can see yourself in it. In a mirror, your **left and right** look swapped.`,
  },

  // Mathematics · Chapter 1 · Large Numbers Around Us
  {
    id: 'lakhs-and-crores',
    classNum: 7,
    subject: 'Mathematics',
    chapter: 1,
    page: 3,
    keywords: ['lakh', 'crore', 'large number', 'million', 'billion'],
    question: 'How many zeros are there in one lakh?',
    title: 'Lakhs, crores and millions',
    text: `One **lakh** is written as 1,00,000. It has 5 zeros, and it is the same as 100 thousands.

One **crore** is written as 1,00,00,000. It has 7 zeros, and it is the same as 100 lakhs.

Other countries often count in millions and billions.

- 1 million = 10 lakhs
- 1 billion = 100 crores`,
    simpler: `One **lakh** has 5 zeros: 1,00,000. One **crore** has 7 zeros: 1,00,00,000. A hundred lakhs make one crore.`,
  },

  // Mathematics · Chapter 4 · Expressions using Letter-Numbers
  {
    id: 'variables',
    classNum: 7,
    subject: 'Mathematics',
    chapter: 4,
    page: 81,
    keywords: ['variable', 'letter number', 'algebra', 'unknown'],
    question: 'What is a variable?',
    title: 'Letters that stand for numbers',
    text: `A **variable** is a letter that stands for a number. The number can change, or we may not know it yet. Your book calls these letter-numbers.

For example, the perimeter of a square is 4 × s, where s is the length of one side. The side can be any length. If s is 5 cm, the perimeter is 4 × 5 = 20 cm.

An expression that has a letter in it, like 2n + 3, is called an **algebraic expression**.`,
    simpler: `Sometimes we use a letter in place of a number, like s for the side of a square. That letter is called a **variable**, because its value can change.`,
  },

  // Mathematics · Chapter 2 · Arithmetic Expressions
  {
    id: 'order-of-operations',
    classNum: 7,
    subject: 'Mathematics',
    chapter: 2,
    page: 30,
    keywords: ['arithmetic expression', 'bracket', 'order of operation', 'bodmas', 'solve first', 'expression'],
    question: 'Which part of an expression do we solve first?',
    title: 'What to solve first',
    text: `An **arithmetic expression** is made of numbers joined by signs such as +, −, × and ÷.

Follow this order:

- First solve what is inside **brackets**.
- Then do multiplication and division.
- Then do addition and subtraction.

3 + 4 × 2 = 3 + 8 = 11

(3 + 4) × 2 = 7 × 2 = 14

So brackets can change the answer.`,
    simpler: `Do the part inside **brackets** first. After that, multiply and divide. Add and subtract last. So 3 + 4 × 2 is 3 + 8, which is 11.`,
  },

  // Mathematics · Chapter 3 · A Peek Beyond the Point
  {
    id: 'decimals',
    classNum: 7,
    subject: 'Mathematics',
    chapter: 3,
    page: 47,
    keywords: ['decimal', 'tenth', 'hundredth'],
    question: 'What is a decimal number?',
    sample: true,
    title: 'Decimal numbers',
    text: `A **decimal number** has a decimal point. The digits after the point show parts that are smaller than one.

- The first place after the point shows **tenths**. 0.1 is one tenth, or 1/10.
- The second place shows **hundredths**. 0.01 is one hundredth, or 1/100.

So 2.5 means 2 wholes and 5 tenths, which is two and a half.

We use decimals for money and for measuring. 1.5 metres is 1 metre and 50 centimetres.`,
    simpler: `A decimal number has a point in it, like 2.5. The digits after the point are smaller than one. 2.5 means **two and a half**.`,
  },

  // Mathematics · Chapter 7 · A Tale of Three Intersecting Lines
  {
    id: 'triangles',
    classNum: 7,
    subject: 'Mathematics',
    chapter: 7,
    page: 150,
    keywords: ['triangle', 'equilateral', 'isosceles', 'scalene'],
    question: 'What is the sum of the angles of a triangle?',
    title: 'Angles of a triangle',
    text: `The three angles of any triangle always add up to **180°**.

If two angles of a triangle are 60° and 70°, the third angle is 180° − 130° = 50°.

Triangles are also named by their sides.

- An **equilateral** triangle has three equal sides. Each of its angles is 60°.
- An **isosceles** triangle has two equal sides.
- A **scalene** triangle has three sides of different lengths.`,
    simpler: `Every triangle has three angles. Add them up and you always get **180 degrees**, whatever the shape of the triangle.`,
  },

  // Mathematics · Chapter 5 · Parallel and Intersecting Lines
  {
    id: 'parallel-lines',
    classNum: 7,
    subject: 'Mathematics',
    chapter: 5,
    page: 107,
    keywords: ['parallel', 'intersect', 'transversal', 'perpendicular', 'vertically opposite'],
    question: 'What are parallel lines?',
    title: 'Parallel and intersecting lines',
    text: `**Parallel lines** are lines on a flat surface that never meet, however far you extend them. They always stay the same distance apart, like railway tracks.

**Intersecting lines** cross each other at one point. If they cross at a right angle, they are **perpendicular**.

A line that crosses two or more lines at different points is called a **transversal**.

When two lines cross, the angles opposite each other are equal.`,
    simpler: `**Parallel lines** never meet, like the two rails of a railway track. Lines that cross each other are called **intersecting lines**.`,
  },

  // Mathematics · Chapter 6 · Number Play
  {
    id: 'even-and-odd',
    classNum: 7,
    subject: 'Mathematics',
    chapter: 6,
    page: 129,
    keywords: ['even number', 'odd number', 'even and odd', 'odd and even', 'odd', 'parity'],
    question: 'What happens when we add two odd numbers?',
    title: 'Adding even and odd numbers',
    text: `**Even numbers** can be put into pairs with nothing left over: 2, 4, 6, 8. **Odd numbers** always have one left over: 1, 3, 5, 7.

- even + even = even
- odd + odd = even
- even + odd = odd

So two odd numbers always add up to an even number. For example, 3 + 5 = 8.

One even and one odd number always add up to an odd number. For example, 4 + 7 = 11.`,
    simpler: `Add two odd numbers and you always get an **even** number. 3 + 5 = 8. The two left-over ones join to make a pair.`,
  },
]
