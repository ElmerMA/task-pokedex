import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemonList: [],
    spriteUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
  },
  mutations: {},
  actions: {},
  modules: {},
});
