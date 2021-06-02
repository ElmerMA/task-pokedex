<template>
  <!-- <v-container>
    <h1 class="mx-auto mb-2">Pokédex</h1>
    <v-data-table
      :headers="headers"
      :items="$store.state.pokemonData"
      class="elevation-1 w-75"
      
    >

    <template v-slot:item.image="{index}">
      <v-img :src="$store.state.spriteUrl + (index + 1) + '.png' " max-width="15%">

      </v-img>
    </template>

    <template v-slot:item.name="{item}">
      <div to="/about">{{ item.name[0].toUpperCase() + item.name.substr(1) }}</div>
    </template>
    </v-data-table>
  </v-container> -->
  <v-container>
    <v-container>
      <h1 class="text-center my-5">Pokédex</h1>
      <h4 class="text-center">
        A list of all Pokémon of every Generation! <br />
        Click on a pokémon to get more details about it.
      </h4>
    </v-container>
    <div v-if="Object.keys(selectedPokemon).length != 0">
      <v-dialog max-width="700"  v-model="selectDialog" scrollable>
        <v-card>
          <v-toolbar :color="selectedPokemon.types[0].type.name" dark>
            <h2>{{ firstLetterToUpperCase(selectedPokemon.name) }}</h2>
            <v-spacer></v-spacer>
            <v-icon @click="clearSelectedPokemon">mdi-close-thick</v-icon>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col cols="3">
                <v-img :src="selectedPokemon.sprites.front_default"> </v-img>
              </v-col>
              <v-col cols="9">
                <h2 class="mt-5 mb-2">
                  #{{ selectedPokemon.id }} -
                  {{ firstLetterToUpperCase(selectedPokemon.name) }}
                </h2>
                <v-chip
                  small
                  :color="item.type.name"
                  class="primary mr-1"
                  v-for="(item, index) in selectedPokemon.types"
                  :key="index"
                >
                  {{ firstLetterToUpperCase(item.type.name) }}
                </v-chip>
                <div class="mt-2">
                  <h3>Possible abilites:</h3>
                  <div
                    v-for="(item, index) in selectedPokemon.abilities"
                    :key="index"
                  >
                    -
                    {{
                      firstLetterToUpperCase(item.ability.name) +
                        `${item.is_hidden ? ' (Hidden Ability)' : ''}`
                    }}
                  </div>
                </div>
              </v-col>
              <v-col cols="12">
                <v-container class="text-center">
                  <h3 class="mb-5">Base Stats:</h3>
                  <v-row>
                    <v-col
                      v-for="(item, index) in selectedPokemon.stats"
                      :key="index"
                      cols="2"
                    >
                      <h4>{{ firstLetterToUpperCase(item.stat.name) }}</h4>
                      {{ item.base_stat }}
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
            <v-container class="text-center">
              <h2 class="mt-5 mb-3">Evolution</h2>
              {{selectedPokemon.evolutions.chain.evolves_to.length != 0 ? selectedPokemon.evolutions.chain.species.name + ' Level ' + (selectedPokemon.evolutions.chain.evolves_to[0].evolution_details[0].min_level != null ? selectedPokemon.evolutions.chain.evolves_to[0].evolution_details[0].min_level : selectedPokemon.evolutions.chain.evolves_to[0].evolution_details[0].item.name) + ' ' + selectedPokemon.evolutions.chain.evolves_to[0].species.name + ' Level ' + (selectedPokemon.evolutions.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level != null ? selectedPokemon.evolutions.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level : selectedPokemon.evolutions.chain.evolves_to[0].evolves_to[0].evolution_details[0].item.name) + ' ' + selectedPokemon.evolutions.chain.evolves_to[0].evolves_to[0].species.name : 'No Evolutions found'}}
            </v-container>
            <v-container>
              <h2 class="mt-5 mb-3 text-center">Moves</h2>
              <template>
                <v-data-table
                  :headers="headers"
                  :items="selectedPokemon.moves"
                  :items-per-page="5"
                  class="elevation-1"
                >
                </v-data-table>
              </template>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>

    <v-row justify="space-between" class="mt-5">
      <v-col
        v-for="(item, index) in $store.state.pokemonData"
        :key="index"
        md="2"
        sm="12"
      >
        <v-card
          max-width="auto"
          elevation="2"
          @click="getSelectedPokemon(item.url)"
        >
          <v-card-title class="justify-center">#{{ index + 1 }}</v-card-title>
          <v-img
            class="mx-auto"
            :src="$store.state.spriteUrl + (index + 1) + '.png'"
            max-width="50%"
          >
          </v-img>
          <v-card-text class="text-center mb-2">
            <h2>{{ item.name[0].toUpperCase() + item.name.substr(1) }}</h2>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      items: [],
      // headers: [
      //   { text: 'Image', value: 'image', sortable: false },
      //   { text: ' Name', value: 'name' },
      // ],
      headers: [
        { text: 'Attack', value: 'move_name' },
        { text: 'Learned at', value: 'learned_at' },
        { text: 'Learn method', value: 'learn_method' },
        { text: 'Game', value: 'version_name' },
      ],
      selectedPokemon: {},
      selectDialog: false,
    };
  },
  methods: {
    async getSelectedPokemon(pokemonUrl) {
      let pokemonInformation = await axios.get(pokemonUrl);
      let speciesData = await axios.get(pokemonInformation.data.species.url);
      let evolutionChain = await axios.get(
        speciesData.data.evolution_chain.url,
      );

      this.selectedPokemon = {
        name: this.firstLetterToUpperCase(pokemonInformation.data.name),
        types: pokemonInformation.data.types,
        abilities: pokemonInformation.data.abilities,
        sprites: pokemonInformation.data.sprites,
        stats: pokemonInformation.data.stats,
        id: pokemonInformation.data.id,
        evolutions: evolutionChain.data,
        moves: this.filterMoveDetails(pokemonInformation.data.moves),
      };
      this.selectDialog = true;
    },
    clearSelectedPokemon() {
      this.selectedPokemon = {};
      this.moveDetails = {};
      this.selectDialog = false;
    },
    firstLetterToUpperCase(name) {
      return name[0].toUpperCase() + name.substr(1);
    },
    //This function gets all the relevant details about the attacks of the lastest gen.
    filterMoveDetails(moveList) {
      return moveList.map(el => {
        let latestGame =
          el.version_group_details[el.version_group_details.length - 1];

        return {
          move_name: this.firstLetterToUpperCase(el.move.name),
          learned_at: latestGame.level_learned_at,
          learn_method: this.firstLetterToUpperCase(
            latestGame.move_learn_method.name,
          ),
          version_name: this.firstLetterToUpperCase(
            latestGame.version_group.name,
          ),
        };
      });
    },
  },
};
</script>
