import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemonData: [],
    currentUrl: 'https://pokeapi.co/api/v2/pokemon?limit=898',
    spriteUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
    nextUrl: '',
  },
  mutations: {},
  actions: {},
  modules: {},
});
