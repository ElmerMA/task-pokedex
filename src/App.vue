<template>
  <v-app>
    <v-app-bar
      app
      color="red darken-1"
      dark
    >

    <h1>Pokédex</h1>
      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',

  data: () => ({
    //
  }),
  async created(){
    let {data} = await axios.get(this.$store.state.currentUrl);
    data.results.forEach(el => {
      this.$store.state.pokemonData.push(el);
    });

    console.log(this.$store.state.pokemonData);
  }
};
</script>
