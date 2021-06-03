const { getEvolutionLine } = require('../../src/apiHandler');
const axios = require('axios');
const {
  rattata_evolutionLine,
  wurmple_evolutionLine,
  ralts_evolutionLine,
} = require('../testdata');

test('getEvolutionLine with a pokemon with one evolution', async () => {
  let r_data = await axios.get('https://pokeapi.co/api/v2/pokemon/rattata');
  expect(await getEvolutionLine(r_data)).toStrictEqual(rattata_evolutionLine);
});

test('getEvolutionLine with a pokemon with alternate evolution-chains', async () => {
  let w_data = await axios.get('https://pokeapi.co/api/v2/pokemon/wurmple');
  expect(await getEvolutionLine(w_data)).toStrictEqual(wurmple_evolutionLine);
});

test('getEvolutionLine with 2 second-evolution alternate versions', async () => {
  let ra_data = await axios.get('https://pokeapi.co/api/v2/pokemon/ralts');
  expect(await getEvolutionLine(ra_data)).toStrictEqual(ralts_evolutionLine);
});
