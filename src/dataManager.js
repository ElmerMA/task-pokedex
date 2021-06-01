let axios = require('axios');

let pokemonData = [];
let pokeDataLink = 'https://pokeapi.co/api/v2/pokemon';
let res = {}

async function getAllPokemon(){
    
    while(res.data.next != null){
        let res = await axios.get(pokeDataLink);

    
    res.data.results.forEach(el => {
        pokemonData.push(el);
    });

    pokeDataLink = res.data.next;
    }
}



async function showResult() {
    await getAllPokemon();

    console.log(pokemonData);
}

showResult();