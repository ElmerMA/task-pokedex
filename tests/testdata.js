const rattata_evolutionLine = [
  {
    baseForm: {
      name: 'rattata',
      img_url:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png',
    },
    name: 'raticate',
    img_url:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png',
    next_evo: [],
  },
];

const wurmple_evolutionLine = [
  {
    baseForm: {
      name: 'wurmple',
      img_url:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/265.png',
    },
    name: 'silcoon',
    img_url:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/266.png',
    next_evo: [
      {
        name: 'beautifly',
        img_url:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/267.png',
      },
    ],
  },
  {
    baseForm: {
      name: 'wurmple',
      img_url:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/265.png',
    },
    name: 'cascoon',
    img_url:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/268.png',
    next_evo: [
      {
        name: 'dustox',
        img_url:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/269.png',
      },
    ],
  },
];

const ralts_evolutionLine = [
  {
    baseForm: {
      name: 'ralts',
      img_url:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/280.png',
    },
    name: 'kirlia',
    img_url:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/281.png',
    next_evo: [
      {
        name: 'gardevoir',
        img_url:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/282.png',
      },
      {
        name: 'gallade',
        img_url:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/475.png',
      },
    ],
  },
];

module.exports = {
    rattata_evolutionLine,
    wurmple_evolutionLine,
    ralts_evolutionLine
}