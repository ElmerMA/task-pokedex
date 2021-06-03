let axios = require('axios');

//Link to all Pokemon up to Generation 8 (excluding Megas & Special Forms)
const baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=898';

async function getAllPokemon() {
  let { data } = await axios.get(baseUrl);

  return data.results;
}

//Retrieves all the necessary information for a pokemon and refactors the form of the data.
async function getAllDetailsByUrl(pkmnUrl) {
  let pkmnDetails = await axios.get(pkmnUrl);
  let evolutionLine = await getEvolutionLine(pkmnDetails);

  return {
    name: pkmnDetails.data.name,
    types: pkmnDetails.data.types,
    abilities: pkmnDetails.data.abilities,
    sprites: pkmnDetails.data.sprites,
    stats: pkmnDetails.data.stats,
    id: pkmnDetails.data.id,
    evolutions: evolutionLine,
    moves: filterMoveDetails(pkmnDetails.data.moves),
  };
}

//Gets every pokemon of the evolution line and formats it
async function getEvolutionLine(pDetails) {
  let speciesData = await axios.get(pDetails.data.species.url);
  let evoDetails = await axios.get(speciesData.data.evolution_chain.url);
  let evolutions = [];

  for (const first_evo of evoDetails.data.chain.evolves_to) {
    let baseDetails = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${evoDetails.data.chain.species.name}`,
    );

    let f_evoDetails = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${first_evo.species.name}`,
    );

    let next_evo_val = [];

    for (const last_evo of first_evo.evolves_to) {
      let l_evoDetails = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${last_evo.species.name}`,
      );

      next_evo_val.push({
        name: last_evo.species.name,
        img_url: l_evoDetails.data.sprites.front_default,
      });
    }

    evolutions.push({
      baseForm: {
        name: evoDetails.data.chain.species.name,
        img_url: baseDetails.data.sprites.front_default,
      },
      name: first_evo.species.name,
      img_url: f_evoDetails.data.sprites.front_default,
      next_evo: next_evo_val,
    });
  }

  return evolutions;
}

//Filters all the moves from the latest generation
function filterMoveDetails(moveList) {
  return moveList.map(el => {
    let latestGame = el.version_group_details.find(
      gen => (gen.version_group.name = 'ultra-sun-ultra-moon'),
    );

    return {
      move_name: el.move.name,
      learned_at: latestGame.level_learned_at,
      learn_method: latestGame.move_learn_method.name,
      version_name: latestGame.version_group.name,
    };
  });
}

module.exports = {
  getAllPokemon,
  getAllDetailsByUrl,
  getEvolutionLine,
};
