// Ready answers for Class 6: Science (Curiosity), then Mathematics (Ganita
// Prakash). See answers.ts for how they are written and picked.
//
// Order matters: the first answer whose keywords fit the question wins, so
// narrow topics (dwarf planets) come before broad ones (planets).

import type { Answer } from './answers.ts'

export const class6: Answer[] = [
  // Science · Chapter 12 · Beyond Earth
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
    id: 'comets-and-asteroids',
    classNum: 6,
    subject: 'Science',
    chapter: 12,
    page: 224,
    keywords: ['comet', 'asteroid', 'meteor', 'shooting star'],
    question: 'What is a comet?',
    title: 'Comets, asteroids and meteors',
    text: `A **comet** is a ball of ice, dust and rock that goes around the Sun. When it comes close to the Sun, some of its ice turns into gas. This makes a long, glowing tail that points away from the Sun.

An **asteroid** is a rocky object that goes around the Sun. Most asteroids are found between Mars and Jupiter.

A **meteor** is a small piece of rock that burns up as it falls through the air around Earth. People call it a shooting star.`,
    simpler: `A **comet** is like a dirty snowball in space. When it comes near the Sun, it grows a long, bright tail.`,
  },
  {
    id: 'constellations',
    classNum: 6,
    subject: 'Science',
    chapter: 12,
    page: 210,
    keywords: ['constellation', 'pole star', 'orion', 'big dipper', 'saptarishi', 'ursa major', 'dhruva'],
    question: 'What is a constellation?',
    title: 'Patterns of stars',
    text: `A **constellation** is a group of stars that seems to make a pattern in the night sky.

**Orion** looks like a hunter. The **Big Dipper**, called Saptarishi in India, is a pattern of seven bright stars. It is part of the constellation Ursa Major.

The two stars at the end of the Big Dipper point to the **Pole Star**. The Pole Star stays in almost the same place in the northern sky, so it shows which way is north.`,
    simpler: `A **constellation** is a group of stars that looks like a picture, such as a hunter or a ladle. Long ago, people used these star pictures to find their way at night.`,
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
    sample: true,
    title: 'Our solar system explained',
    text: `The **solar system** is the Sun and everything that travels around it.

Eight **planets** go around the Sun. So do their moons, and many smaller objects such as **asteroids** and **comets**.

The Sun is a **star**. It is much bigger than any planet, and its pull keeps everything else moving around it.`,
    simpler: `The Sun is in the middle. Eight planets, their moons and many small rocks all go around the Sun. Together they are called the **solar system**.`,
  },
  {
    id: 'moon',
    classNum: 6,
    subject: 'Science',
    chapter: 12,
    page: 221,
    keywords: ['moon', 'natural satellite', 'satellite'],
    question: 'Why does the Moon shine?',
    title: 'The Moon, our satellite',
    text: `The Moon has no light of its own. It shines because it **reflects** the light of the Sun.

The Moon is Earth’s only **natural satellite**. A satellite is an object that goes around a planet. The Moon takes about 27 days to go once around Earth.

People have also sent many machines into space to go around Earth. These are called **artificial satellites**. They help with weather reports, television and phones.`,
    simpler: `The Moon does not make its own light. Sunlight falls on the Moon and bounces off it, and that is the light we see. The Moon goes around Earth.`,
  },

  // Science · Chapter 3 · Mindful Eating
  {
    id: 'deficiency-diseases',
    classNum: 6,
    subject: 'Science',
    chapter: 3,
    page: 48,
    keywords: ['deficiency', 'scurvy', 'rickets', 'night blindness', 'anaemia', 'anemia', 'goitre', 'goiter'],
    question: 'What are deficiency diseases?',
    title: 'Deficiency diseases',
    text: `A **deficiency disease** happens when the body does not get enough of a nutrient for a long time.

- Too little vitamin A can cause **night blindness**, which means trouble seeing in dim light.
- Too little vitamin C can cause **scurvy**, with bleeding gums.
- Too little vitamin D can cause **rickets**, with soft and bent bones.
- Too little iron can cause **anaemia**, which makes a person weak and tired.
- Too little iodine can cause **goitre**, a swelling in the neck.

Eating many kinds of food helps to prevent these diseases.`,
    simpler: `If your food is missing something your body needs, you can fall ill. For example, too little iron makes you feel weak and tired. Eating many kinds of food keeps you **healthy**.`,
  },
  {
    id: 'balanced-diet',
    classNum: 6,
    subject: 'Science',
    chapter: 3,
    page: 52,
    keywords: ['balanced diet', 'balanced', 'healthy eating', 'healthy food', 'junk food', 'diet'],
    question: 'What is a balanced diet?',
    title: 'A balanced diet',
    text: `A **balanced diet** gives your body all the nutrients it needs, in the right amounts. It also has enough roughage and water.

No single food has everything. So a balanced diet has many kinds of food: grains like rice and roti, dals, vegetables, fruits, and milk or curd.

**Junk food**, like chips and sweet fizzy drinks, has a lot of sugar, salt and fat and very few nutrients. It is best eaten only once in a while.`,
    simpler: `A **balanced diet** means eating many kinds of food every day: roti or rice, dal, vegetables, fruits and milk. Then your body gets everything it needs to grow and stay strong.`,
  },
  {
    id: 'components-of-food',
    classNum: 6,
    subject: 'Science',
    chapter: 3,
    page: 41,
    keywords: ['components of food', 'parts of food', 'in our food', 'in food', 'nutrient', 'carbohydrate', 'protein', 'vitamin', 'mineral', 'roughage'],
    question: 'What are the components of food?',
    sample: true,
    title: 'The components of food',
    text: `Food is made of **nutrients**. The main ones are **carbohydrates**, **fats**, **proteins**, **vitamins** and **minerals**.

- Carbohydrates and fats give you energy.
- Proteins help your body grow and repair itself.
- Vitamins and minerals keep you healthy and protect you from diseases.

Food also has **roughage** (fibre) and water. Your body needs both.`,
    simpler: `Food has different parts, and each part helps you in its own way. Some food gives you energy, like rice and oil. Some helps you grow, like dal and eggs. Some keeps you from falling ill, like fruits and vegetables.`,
  },

  // Mathematics · Chapter 8 · Playing with Constructions. It sits here so
  // that the compass for drawing comes before the compass for directions.
  {
    id: 'drawing-a-circle',
    classNum: 6,
    subject: 'Mathematics',
    chapter: 8,
    page: 189,
    keywords: ['draw a circle', 'circle', 'radius', 'diameter', 'construct'],
    question: 'How do I draw a circle with a compass?',
    title: 'Drawing a circle',
    text: `Every point on a **circle** is the same distance from its centre. That distance is called the **radius**.

To draw a circle:

- Open the compass as wide as the radius you want.
- Put the pointed tip on the paper. This point is the centre.
- Keep the tip still and turn the pencil all the way around.

A line across the circle that passes through the centre is a **diameter**. It is twice as long as the radius.`,
    simpler: `Put the sharp tip of the compass on the paper and hold it still. Then turn the pencil end all the way around. You get a **circle**, and the sharp tip marks its centre.`,
  },

  // Science · Chapter 4 · Exploring Magnets
  {
    id: 'magnetic-compass',
    classNum: 6,
    subject: 'Science',
    chapter: 4,
    page: 70,
    keywords: ['compass', 'find direction', 'directions', 'north south'],
    question: 'How does a magnetic compass work?',
    title: 'How a compass works',
    text: `A **magnetic compass** has a small needle that is a magnet. The needle can turn freely.

A magnet that is free to turn always comes to rest pointing **north and south**. This happens because Earth itself behaves like a giant magnet.

So one end of the needle always points north. Once you know north, you can find east, west and south. Travellers and sailors use a compass to find their way.`,
    simpler: `A compass has a tiny magnet for a needle. The needle always turns to point **north**. So a compass tells you which way you are going.`,
  },
  {
    id: 'magnets',
    classNum: 6,
    subject: 'Science',
    chapter: 4,
    page: 63,
    keywords: ['magnet'],
    question: 'What does a magnet attract?',
    sample: true,
    title: 'What magnets attract',
    text: `A magnet attracts **magnetic materials**. Iron, nickel and cobalt are magnetic. Things made of wood, plastic, glass or paper are not.

Every magnet has two **poles**, a north pole and a south pole. Two poles of the same kind push each other away. A north pole and a south pole pull towards each other.`,
    simpler: `A magnet pulls things made of **iron**, like pins and nails. It does not pull wood, plastic or paper.`,
  },

  // Science · Chapter 5 · Measurement of Length and Motion
  {
    id: 'types-of-motion',
    classNum: 6,
    subject: 'Science',
    chapter: 5,
    page: 92,
    keywords: ['types of motion', 'kinds of motion', 'linear', 'circular', 'oscillat', 'periodic', 'motion'],
    question: 'What are the types of motion?',
    title: 'Three types of motion',
    text: `An object is in **motion** when its position changes with time. There are three common types.

- **Linear motion** is along a straight line, like a ball dropped from your hand.
- **Circular motion** is along a circle, like a child on a merry-go-round.
- **Oscillatory motion** is to and fro about one position, like a swing.

Motion that repeats after the same amount of time is called **periodic motion**. A swing and the hands of a clock are examples.`,
    simpler: `Things move in different ways. A falling ball moves in a **straight line**. A merry-go-round moves in a **circle**. A swing goes **to and fro**.`,
  },

  // Science · Chapter 7 · Temperature and its Measurement
  {
    id: 'temperature',
    classNum: 6,
    subject: 'Science',
    chapter: 7,
    page: 121,
    keywords: ['temperature', 'thermometer', 'celsius', 'fahrenheit', 'fever', 'hot or cold', 'how hot'],
    question: 'How do we measure temperature?',
    title: 'Measuring temperature',
    text: `**Temperature** tells us how hot or cold something is. Our sense of touch is not reliable, so we measure temperature with a **thermometer**.

Temperature is usually measured in **degrees Celsius** (°C).

- A clinical thermometer measures body temperature. A healthy person’s temperature is about 37 °C.
- A laboratory thermometer measures other things. It usually reads from −10 °C to 110 °C.

Ice melts at 0 °C. Water boils at about 100 °C.`,
    simpler: `A **thermometer** tells us how hot or cold something is. When you have a fever, a thermometer shows that your body is hotter than normal. Normal is about 37 degrees Celsius.`,
  },
  {
    id: 'measuring-length',
    classNum: 6,
    subject: 'Science',
    chapter: 5,
    page: 82,
    keywords: ['length', 'metre', 'meter', 'centimetre', 'centimeter', 'kilometre', 'kilometer', 'millimetre', 'millimeter', 'ruler', 'si unit', 'measure'],
    question: 'How do we measure length?',
    title: 'Measuring length correctly',
    text: `The standard unit of length is the **metre** (m).

- 1 metre = 100 centimetres
- 1 centimetre = 10 millimetres
- 1 kilometre = 1000 metres

To measure correctly with a scale:

- Place the scale along the length of the object.
- Start from the zero mark. If the zero mark is broken, start from another full mark and subtract.
- Keep your eye straight above the mark you are reading.`,
    simpler: `We measure length with a scale or a measuring tape. Small things are measured in **centimetres**. Bigger things, like a room, are measured in **metres**.`,
  },

  // Science · Chapter 6 · Materials Around Us
  {
    id: 'transparent-materials',
    classNum: 6,
    subject: 'Science',
    chapter: 6,
    page: 108,
    keywords: ['transparent', 'translucent', 'opaque', 'see through', 'material'],
    question: 'What are transparent, translucent and opaque materials?',
    title: 'Seeing through materials',
    text: `Materials can be grouped by how well we can see through them.

- **Transparent** materials let us see through them clearly. Glass, clean water and air are transparent.
- **Translucent** materials let us see through them, but not clearly. Butter paper and frosted glass are translucent.
- **Opaque** materials do not let us see through them at all. Wood, cardboard and metals are opaque.`,
    simpler: `You can see clearly through a glass window, so glass is **transparent**. You cannot see through a wooden door at all, so wood is **opaque**. Butter paper is in between.`,
  },

  // Science · Chapter 9 · Methods of Separation in Everyday Life
  {
    id: 'separating-mixtures',
    classNum: 6,
    subject: 'Science',
    chapter: 9,
    page: 160,
    keywords: ['separat', 'salt from', 'filtration', 'filter', 'sieving', 'sieve', 'winnowing', 'threshing', 'handpick', 'hand pick', 'sedimentation', 'decantation', 'churning', 'mixture'],
    question: 'How do we separate salt from water?',
    title: 'Separating mixtures',
    text: `Salt dissolves in water, so it cannot be picked or filtered out. We use **evaporation**. When salty water is heated or left in the sun, the water turns into vapour and goes into the air. The salt is left behind. This is how salt is made from sea water.

Other mixtures need other methods:

- **Handpicking** removes small stones from rice or dal.
- **Sieving** separates bran from flour.
- **Filtration** separates tea leaves from tea.
- **Winnowing** uses wind to separate light husk from heavier grain.`,
    simpler: `Leave salty water in the sun. The water slowly goes into the air and the **salt** stays behind. To take tea leaves out of tea, we use a strainer instead.`,
  },

  // Science · Chapter 8 · A Journey through States of Water
  {
    id: 'water-cycle',
    classNum: 6,
    subject: 'Science',
    chapter: 8,
    page: 148,
    keywords: ['water cycle', 'rain', 'cloud', 'evaporat', 'condens'],
    question: 'How does rain form?',
    title: 'How rain forms',
    text: `The Sun heats the water in seas, rivers and ponds. Some of this water turns into water vapour and rises into the air. This is **evaporation**.

High up, the air is cooler. There the vapour turns back into tiny drops of water. This is **condensation**. Many tiny drops together make a cloud.

When the drops become big and heavy, they fall as **rain**. Rain water flows back into rivers and seas, and the journey starts again. This is called the **water cycle**.`,
    simpler: `The Sun warms water, and some of it rises into the sky as vapour. Up there it cools and makes **clouds**. When the clouds become heavy with water, it falls as **rain**.`,
  },

  // Science · Chapter 11 · Nature’s Treasures
  {
    id: 'natural-resources',
    classNum: 6,
    subject: 'Science',
    chapter: 11,
    page: 200,
    keywords: ['renewable', 'non renewable', 'natural resource', 'fossil fuel', 'coal', 'petroleum', 'natural gas', 'solar energy', 'wind energy', 'resource'],
    question: 'What are renewable resources?',
    title: 'Renewable and non-renewable resources',
    text: `**Natural resources** are useful things we get from nature, such as air, water, sunlight, soil, forests and coal.

- **Renewable resources** are replaced by nature in a short time. Sunlight, wind, water and forests are renewable.
- **Non-renewable resources** took millions of years to form, so they can run out. Coal, petroleum and natural gas are non-renewable. They are called **fossil fuels**.

This is why we should use all resources with care.`,
    simpler: `Some things from nature keep coming back, like sunlight, wind and rain. These are **renewable**. Others, like coal and petrol, will finish one day if we use too much.`,
  },
  {
    id: 'air',
    classNum: 6,
    subject: 'Science',
    chapter: 11,
    page: 195,
    keywords: ['air', 'oxygen', 'nitrogen', 'atmosphere', 'wind'],
    question: 'What is air made of?',
    title: 'What air is made of',
    text: `Air is a **mixture of gases**.

- About 78 parts out of 100 are **nitrogen**.
- About 21 parts out of 100 are **oxygen**.
- The rest is a small amount of argon, carbon dioxide, water vapour and other gases.

Living things need oxygen to breathe. Moving air is called **wind**.`,
    simpler: `Air is made of many gases mixed together. Most of it is **nitrogen**. About one fifth is **oxygen**, the gas we need to breathe.`,
  },

  // Science · Chapter 8 again: broad words, so it comes after the others.
  {
    id: 'states-of-water',
    classNum: 6,
    subject: 'Science',
    chapter: 8,
    page: 137,
    keywords: ['states of water', 'state of water', 'three states', 'ice', 'steam', 'water vapour', 'water vapor', 'vapour', 'melt', 'freez', 'boil', 'solid', 'liquid', 'gas'],
    question: 'What are the three states of water?',
    title: 'Three states of water',
    text: `Water is found in three states.

- **Solid**: ice
- **Liquid**: water
- **Gas**: water vapour

Water changes from one state to another when it is heated or cooled.

- Ice **melts** into water when it is heated.
- Water **evaporates** into water vapour when it is heated.
- Water vapour **condenses** into water when it is cooled.
- Water **freezes** into ice when it is cooled.`,
    simpler: `Water can be hard **ice**, flowing **water**, or **vapour** that mixes into the air. Heat turns ice into water and water into vapour. Cooling turns them back.`,
  },

  // Science · Chapter 10 · Living Creatures
  {
    id: 'seed-to-plant',
    classNum: 6,
    subject: 'Science',
    chapter: 10,
    page: 181,
    keywords: ['seed', 'sapling', 'seedling', 'germinat', 'sprout', 'plants grow', 'plant grow'],
    question: 'How does a seed grow into a plant?',
    sample: true,
    title: 'From seed to plant',
    text: `A seed has a tiny baby plant inside it, along with stored food.

When a seed gets **water**, **air** and the right warmth, it starts to grow. This is called **germination**.

- First a small root comes out and grows down into the soil.
- Then a shoot grows up towards the light.
- Soon the first leaves open. The young plant is now called a **seedling**.

With sunlight, water and air, the seedling makes its own food and grows into a big plant. Later it makes flowers and new seeds.`,
    simpler: `A seed is a sleeping baby plant. Give it water, air and warmth and it wakes up. First a **root** grows down, then a **shoot** grows up, then leaves appear. Slowly it becomes a big plant.`,
  },
  {
    id: 'herbs-shrubs-trees',
    classNum: 6,
    subject: 'Science',
    chapter: 2,
    page: 14,
    keywords: ['herb', 'shrub', 'tree', 'climber', 'creeper', 'types of plant', 'kinds of plant'],
    question: 'What are herbs, shrubs and trees?',
    title: 'Herbs, shrubs and trees',
    text: `Plants can be grouped by their size and their stems.

- **Herbs** are small plants with soft, green stems. Tomato and mint are herbs.
- **Shrubs** are medium-sized plants with hard, woody stems. Their branches start close to the ground. Rose and hibiscus are shrubs.
- **Trees** are tall plants with a thick, hard, woody stem called a trunk. Their branches start higher up. Mango and neem are trees.`,
    simpler: `Small plants with soft stems are **herbs**, like mint. Bushy plants with hard stems are **shrubs**, like rose. Tall plants with a thick trunk are **trees**, like mango.`,
  },
  {
    id: 'habitats',
    classNum: 6,
    subject: 'Science',
    chapter: 2,
    page: 26,
    keywords: ['habitat', 'adaptation', 'adapt', 'camel', 'desert', 'where do animals live'],
    question: 'What is a habitat?',
    title: 'Habitats and adaptations',
    text: `A **habitat** is the place where a plant or an animal lives. It gives the living thing food, water, air and shelter. A pond, a forest and a desert are habitats.

Living things have special features that help them live in their habitat. These features are called **adaptations**.

- A fish has fins and a smooth shape that help it swim.
- A camel has long legs that keep its body away from the hot sand, and wide feet that do not sink into it.`,
    simpler: `A **habitat** is the home of a plant or an animal. A fish lives in water, so it has fins to swim. A camel lives in the desert, so it has long legs and wide feet for walking on hot sand.`,
  },
  {
    id: 'living-things',
    classNum: 6,
    subject: 'Science',
    chapter: 10,
    page: 176,
    keywords: ['living thing', 'non living', 'nonliving', 'alive', 'living being', 'living creature', 'living'],
    question: 'How do we know something is living?',
    title: 'Living and non-living things',
    text: `All **living things** share some features.

- They need food.
- They grow.
- They breathe.
- They move, or parts of them move, on their own.
- They respond to things around them.
- They get rid of waste.
- They produce young ones of their own kind.

A car moves, but it does not grow or have young ones, so it is non-living. A plant does not walk, but it grows, breathes and makes seeds, so it is living.`,
    simpler: `Living things eat, grow, breathe and have babies. A puppy does all of these, so it is **living**. A toy car does none of them by itself, so it is not.`,
  },
  {
    id: 'sun',
    classNum: 6,
    subject: 'Science',
    chapter: 12,
    page: 212,
    keywords: ['sun'],
    question: 'What is the Sun?',
    title: 'The Sun, our star',
    text: `The Sun is a **star**. It is the star closest to Earth.

It is a huge ball of very hot gases, and it gives out light and heat. The Sun is so big that more than a million Earths could fit inside it.

The Sun is about 150 million kilometres from Earth. Its light takes about 8 minutes to reach us.

Plants need sunlight to make food, so almost all life on Earth depends on the Sun.`,
    simpler: `The Sun is a **star**, just like the stars you see at night. It looks big and bright because it is much closer to us. It gives us light and heat.`,
  },

  // Science · Chapter 1 · The Wonderful World of Science
  {
    id: 'scientific-method',
    classNum: 6,
    subject: 'Science',
    chapter: 1,
    page: 4,
    keywords: ['scientific method', 'scientist', 'hypothesis', 'experiment', 'what is science'],
    question: 'How do scientists find answers?',
    title: 'How scientists find answers',
    text: `Science starts with being curious and asking questions. Scientists follow some steps to find answers. Together these steps are called the **scientific method**.

- **Observe** something that makes you wonder.
- Ask a **question** about it.
- Guess a possible answer. This guess is called a **hypothesis**.
- **Test** the guess with an experiment or with more observations.
- Look at the results and decide if the guess was right.

Anyone who works in this way is thinking like a scientist.`,
    simpler: `Scientists look closely, ask a question, and make a guess. Then they **test** the guess to see if it is right. You can do this too.`,
  },

  // Mathematics · Chapter 1 · Patterns in Mathematics
  {
    id: 'square-numbers',
    classNum: 6,
    subject: 'Mathematics',
    chapter: 1,
    page: 5,
    keywords: ['square number', 'triangular number', 'pattern', 'sequence'],
    question: 'What are square numbers?',
    title: 'Square numbers',
    text: `A **square number** is what you get when you multiply a number by itself.

- 1 × 1 = 1
- 2 × 2 = 4
- 3 × 3 = 9
- 4 × 4 = 16

So 1, 4, 9, 16, 25 are square numbers. You can arrange that many dots in the shape of a square.

There is a pattern too. Adding odd numbers in order gives the square numbers: 1 + 3 = 4, then 1 + 3 + 5 = 9, then 1 + 3 + 5 + 7 = 16.`,
    simpler: `Multiply a number by itself and you get a **square number**. 3 × 3 = 9, so 9 is a square number. You can arrange 9 dots in a square with 3 rows of 3.`,
  },

  // Mathematics · Chapter 2 · Lines and Angles
  {
    id: 'types-of-angles',
    classNum: 6,
    subject: 'Mathematics',
    chapter: 2,
    page: 30,
    keywords: ['angle', 'acute', 'obtuse', 'protractor', 'reflex'],
    question: 'What are the types of angles?',
    title: 'Types of angles',
    text: `An **angle** is formed when two rays start from the same point. Angles are measured in degrees, using a protractor.

- A **right angle** is exactly 90°.
- An **acute angle** is less than 90°.
- An **obtuse angle** is more than 90° but less than 180°.
- A **straight angle** is exactly 180°.
- A **reflex angle** is more than 180° but less than 360°.`,
    simpler: `The corner of your notebook is a **right angle**. An angle smaller than that is an **acute** angle. An angle bigger than that is an **obtuse** angle.`,
  },

  // Mathematics · Chapter 3 · Number Play
  {
    id: 'palindromes',
    classNum: 6,
    subject: 'Mathematics',
    chapter: 3,
    page: 62,
    keywords: ['palindrom', 'number play'],
    question: 'What is a palindrome number?',
    title: 'Palindrome numbers',
    text: `A **palindrome** is a number that reads the same from left to right and from right to left. 121, 66 and 3443 are palindromes.

Here is a game. Take any number, reverse its digits, and add the two numbers.

47 + 74 = 121

You often reach a palindrome, sometimes after repeating the steps a few times.`,
    simpler: `A **palindrome** is a number that is the same forwards and backwards, like 121 or 44.`,
  },

  // Mathematics · Chapter 4 · Data Handling and Presentation
  {
    id: 'bar-graphs',
    classNum: 6,
    subject: 'Mathematics',
    chapter: 4,
    page: 88,
    keywords: ['bar graph', 'bar chart', 'pictograph', 'tally', 'data handling', 'graph', 'data'],
    question: 'What is a bar graph?',
    title: 'Reading a bar graph',
    text: `A **bar graph** shows numbers as bars. All the bars have the same width, with equal gaps between them. The height of each bar shows a number.

A bar graph makes it easy to compare. The tallest bar shows the biggest number.

A **pictograph** shows the same kind of information with pictures. A key tells you how many things each picture stands for.`,
    simpler: `A **bar graph** uses bars to show numbers. A taller bar means a bigger number, so you can compare things just by looking.`,
  },

  // Mathematics · Chapter 5 · Prime Time
  {
    id: 'prime-numbers',
    classNum: 6,
    subject: 'Mathematics',
    chapter: 5,
    page: 112,
    keywords: ['prime', 'composite'],
    question: 'What is a prime number?',
    sample: true,
    title: 'Prime numbers',
    text: `A **prime number** is a number greater than 1 that has exactly two factors: 1 and itself.

2, 3, 5, 7, 11 and 13 are prime numbers.

A number with more than two factors is a **composite number**. For example, 6 has the factors 1, 2, 3 and 6.

The number 1 is neither prime nor composite. And 2 is the only even prime number.`,
    simpler: `A **prime number** can be divided exactly only by 1 and by itself. 7 is prime. 6 is not prime, because it can also be divided by 2 and by 3.`,
  },
  {
    id: 'factors-and-multiples',
    classNum: 6,
    subject: 'Mathematics',
    chapter: 5,
    page: 108,
    keywords: ['factor', 'multiple', 'divisib'],
    question: 'What are factors and multiples?',
    title: 'Factors and multiples',
    text: `A **factor** of a number divides it exactly, with nothing left over. The factors of 12 are 1, 2, 3, 4, 6 and 12.

A **multiple** of a number is what you get when you multiply it by 1, 2, 3 and so on. The multiples of 4 are 4, 8, 12, 16 and so on.

So 4 is a factor of 12, and 12 is a multiple of 4.`,
    simpler: `3 × 4 = 12. So 3 and 4 are **factors** of 12, and 12 is a **multiple** of both 3 and 4.`,
  },

  // Mathematics · Chapter 6 · Perimeter and Area
  {
    id: 'perimeter',
    classNum: 6,
    subject: 'Mathematics',
    chapter: 6,
    page: 130,
    keywords: ['perimeter'],
    question: 'What is perimeter?',
    title: 'Finding the perimeter',
    text: `The **perimeter** is the distance all the way around a closed shape. To find it, add the lengths of all the sides.

- Perimeter of a rectangle = 2 × (length + breadth)
- Perimeter of a square = 4 × side

A rectangle that is 5 cm long and 3 cm wide has a perimeter of 2 × (5 + 3) = 16 cm.`,
    simpler: `Walk once around the edge of a park. The distance you walk is its **perimeter**. To find it, add the lengths of all the sides.`,
  },
  {
    id: 'area',
    classNum: 6,
    subject: 'Mathematics',
    chapter: 6,
    page: 138,
    keywords: ['area'],
    question: 'How do I find the area of a rectangle?',
    title: 'Area of a rectangle',
    text: `The **area** is the amount of surface that a shape covers. It is measured in square units, such as square centimetres.

- Area of a rectangle = length × breadth
- Area of a square = side × side

A rectangle that is 5 cm long and 3 cm wide has an area of 5 × 3 = 15 square centimetres.`,
    simpler: `**Area** tells you how much space a flat shape covers. For a rectangle, multiply its length by its breadth. A 5 by 3 rectangle covers 15 small squares.`,
  },

  // Mathematics · Chapter 7 · Fractions
  {
    id: 'equivalent-fractions',
    classNum: 6,
    subject: 'Mathematics',
    chapter: 7,
    page: 162,
    keywords: ['equivalent', 'simplest form', 'lowest term', 'lowest form', 'same fraction'],
    question: 'What are equivalent fractions?',
    title: 'Equivalent fractions',
    text: `**Equivalent fractions** look different but show the same amount.

1/2 = 2/4 = 3/6

Half a roti is the same amount as two quarters of it.

To make an equivalent fraction, multiply the top and the bottom by the same number. Or divide both by the same number.

2/4 becomes 1/2 when you divide the top and the bottom by 2. This is its **simplest form**.`,
    simpler: `1/2 and 2/4 are the same amount. Cut a roti into 2 pieces and take 1, or cut it into 4 pieces and take 2. You eat the same. These are **equivalent fractions**.`,
  },
  {
    id: 'adding-fractions',
    classNum: 6,
    subject: 'Mathematics',
    chapter: 7,
    page: 170,
    keywords: ['add', 'sum of', 'subtract', 'plus'],
    question: 'How do I add fractions?',
    title: 'Adding fractions',
    text: `If the bottom numbers are the same, add the top numbers and keep the bottom number.

1/5 + 2/5 = 3/5

If the bottom numbers are different, first make them the same using **equivalent fractions**.

1/2 + 1/4 = 2/4 + 1/4 = 3/4

Subtraction works in the same way.`,
    simpler: `When the bottom numbers are the same, just add the top numbers. 1/4 + 2/4 = **3/4**. One quarter and two quarters make three quarters.`,
  },
  {
    id: 'fractions',
    classNum: 6,
    subject: 'Mathematics',
    chapter: 7,
    page: 152,
    keywords: ['fraction', 'numerator', 'denominator', 'half', 'quarter'],
    question: 'What is a fraction?',
    sample: true,
    title: 'What a fraction is',
    text: `A **fraction** shows a part of a whole. If you cut a roti into 4 equal pieces and eat 1 piece, you have eaten 1/4 of the roti.

The number on the bottom is the **denominator**. It tells you how many equal parts the whole is cut into.

The number on top is the **numerator**. It tells you how many of those parts you have.`,
    simpler: `A fraction is a part of something. Cut one roti into 2 equal pieces. Each piece is one **half**, which we write as 1/2.`,
  },

  // Mathematics · Chapter 9 · Symmetry
  {
    id: 'symmetry',
    classNum: 6,
    subject: 'Mathematics',
    chapter: 9,
    page: 219,
    keywords: ['symmetr', 'mirror', 'reflection'],
    question: 'What is a line of symmetry?',
    title: 'Lines of symmetry',
    text: `A shape has **line symmetry** if you can fold it along a line so that the two halves match exactly. The fold line is called the **line of symmetry**.

- A square has 4 lines of symmetry.
- A rectangle has 2.
- A circle has more than you can count.

Some shapes also have **rotational symmetry**. They look the same after a part of a full turn. A square looks the same after a quarter turn.`,
    simpler: `Fold a paper heart down the middle. Both halves match exactly. The fold is its **line of symmetry**.`,
  },

  // Mathematics · Chapter 10 · The Other Side of Zero
  {
    id: 'negative-numbers',
    classNum: 6,
    subject: 'Mathematics',
    chapter: 10,
    page: 243,
    keywords: ['negative', 'integer', 'below zero', 'less than zero', 'minus'],
    question: 'What are negative numbers?',
    title: 'Negative numbers',
    text: `Numbers less than zero are called **negative numbers**. They are written with a minus sign, like −1, −2 and −3.

We use them for things below zero. A very cold place can have a temperature of −5 °C. A floor below the ground can be floor −1.

On a number line, negative numbers are to the left of zero and positive numbers are to the right. Zero is neither positive nor negative.

Positive numbers, negative numbers and zero together are called **integers**.`,
    simpler: `Numbers smaller than zero are **negative numbers**, like −1 and −2. If it is colder than 0 degrees, we say the temperature is minus something.`,
  },
]
