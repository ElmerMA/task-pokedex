<template>
  <v-app>
    <v-app-bar
      app
      color="red darken-1"
      dark
    >

    <h1 class="hoverItem" @click="backToTop">Pokédex</h1>
      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import {getAllPokemon} from './apiHandler'

export default {
  name: 'App',
  methods: {
    backToTop() {
      this.$vuetify.goTo(0)
    }
  },
  async created(){
    this.$store.state.pokemonList = await getAllPokemon();
  }
};
</script>

<style>
  .hoverItem {
    cursor: pointer;
  }
</style>