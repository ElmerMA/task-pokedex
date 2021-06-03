<template>
  <v-container>
    <v-container>
      <h1 class="text-center my-5">Pokédex</h1>
      <h4 class="text-center">
        A list of all Pokémon of every Generation! <br />
        Click on a pokémon to get more details about it.
      </h4>
    </v-container>
    <div v-if="Object.keys(selectedPokemon).length != 0">
      <v-dialog max-width="700" v-model="selectDialog" scrollable>
        <v-card>
          <v-toolbar :color="selectedPokemon.types[0].type.name" dark>
            <h2>{{ Capitalize(selectedPokemon.name) }}</h2>
            <v-spacer></v-spacer>
            <v-icon @click="clearSelectedPokemon">mdi-close-thick</v-icon>
          </v-toolbar>
          <v-card-text>
            <v-row class="mt-5">
              <v-col cols="12" md="3">
                <v-img :src="selectedPokemon.sprites.front_default"> </v-img>
              </v-col>
              <v-col cols="9">
                <h2 class="mb-2">
                  #{{ selectedPokemon.id }} -
                  {{ Capitalize(selectedPokemon.name) }}
                </h2>
                <v-chip
                  small
                  label
                  :color="item.type.name"
                  class="primary mr-1"
                  v-for="(item, index) in selectedPokemon.types"
                  :key="index"
                >
                  {{ Capitalize(item.type.name) }}
                </v-chip>
                <div class="mt-2">
                  <h3>Possible abilites:</h3>
                  <div
                    v-for="(item, index) in selectedPokemon.abilities"
                    :key="index"
                  >
                    -
                    {{
                      Capitalize(item.ability.name) +
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
                      cols="4"
                      md="2"
                    >
                      <h4>{{ Capitalize(item.stat.name) }}</h4>
                      {{ item.base_stat }}
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
            <v-container class="text-center">
              <div v-if="selectedPokemon.evolutions.length != 0">
                <h2 class="mt-5 mb-3">Evolution</h2>
                <v-row>
                  <v-col
                    cols="12"
                    v-for="(first_evo, id) in selectedPokemon.evolutions"
                    :key="id"
                  >
                    <v-row>
                      <v-col cols="4">
                        <v-img :src="first_evo.baseForm.img_url"> </v-img>
                        <h4>{{ Capitalize(first_evo.baseForm.name) }}</h4>
                      </v-col>
                      <v-col cols="4">
                        <v-img :src="first_evo.img_url"></v-img>
                        <h4>{{ Capitalize(first_evo.name) }}</h4>
                      </v-col>
                      <v-col cols="4" v-if="first_evo.next_evo.length != 0">
                        <div
                          v-for="(last_evo, idx) in first_evo.next_evo"
                          :key="idx"
                        >
                          <v-img :src="last_evo.img_url"></v-img>
                          <h4>{{ Capitalize(last_evo.name) }}</h4>
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </div>
            </v-container>
            <v-container>
              <h2 class="mt-5 mb-3 text-center">Moves</h2>
              <template>
                <v-data-table
                  :headers="headers"
                  :items="selectedPokemon.moves"
                  :items-per-page="5"
                  class="elevation-1"
                  sort-by="learn_method"
                >
                  <template v-slot:item.move_name="{ item }">
                    {{ Capitalize(item.move_name) }}
                  </template>
                </v-data-table>
              </template>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>

    <v-row justify="space-between" class="mt-5">
      <v-col
        v-for="(item, index) in $store.state.pokemonList"
        :key="index"
        cols="6"
        md="2"
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
            <h2>{{ Capitalize(item.name) }}</h2>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getAllDetailsByUrl } from '../apiHandler';

export default {
  name: 'Home',
  data() {
    return {
      items: [],
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
      this.selectedPokemon = await getAllDetailsByUrl(pokemonUrl);
      //let pkmnDetails = await axios.get(pokemonUrl);
      // let speciesData = await axios.get(pkmnDetails.data.species.url);
      // let eRes = await axios.get(speciesData.data.evolution_chain.url);
      // let evos = [];

      // for (const first_evo of eRes.data.chain.evolves_to) {
      //   let baseDetails = await axios.get(
      //     `https://pokeapi.co/api/v2/pokemon/${eRes.data.chain.species.name}`,
      //   );

      //   let evoDetails = await axios.get(
      //     `https://pokeapi.co/api/v2/pokemon/${first_evo.species.name}`,
      //   );

      //   let next_evo_val = [];

      //   for (const last_evo of first_evo.evolves_to) {
      //     let l_evoDetails = await axios.get(
      //       `https://pokeapi.co/api/v2/pokemon/${last_evo.species.name}`,
      //     );

      //     next_evo_val.push({
      //       name: this.Capitalize(last_evo.species.name),
      //       img_url: l_evoDetails.data.sprites.front_default,
      //     });
      //   }

      //   evos.push({
      //     baseForm: {
      //       name: this.Capitalize(eRes.data.chain.species.name),
      //       img_url: baseDetails.data.sprites.front_default,
      //     },
      //     name: this.Capitalize(first_evo.species.name),
      //     img_url: evoDetails.data.sprites.front_default,
      //     next_evo: next_evo_val,
      //   });
      // }

      // this.selectedPokemon = {
      //   name: this.Capitalize(pkmnDetails.data.name),
      //   types: pkmnDetails.data.types,
      //   abilities: pkmnDetails.data.abilities,
      //   sprites: pkmnDetails.data.sprites,
      //   stats: pkmnDetails.data.stats,
      //   id: pkmnDetails.data.id,
      //   evolutions: evos,
      //   moves: this.filterMoveDetails(pkmnDetails.data.moves),
      // };

      this.selectDialog = true;
    },
    clearSelectedPokemon() {
      this.selectedPokemon = {};
      this.moveDetails = {};
      this.selectDialog = false;
    },
    Capitalize(name) {
      return name[0].toUpperCase() + name.substr(1);
    },
    //This function gets all the relevant details about the attacks of the lastest gen.
    filterMoveDetails(moveList) {
      return moveList.map(el => {
        let latestGame =
          el.version_group_details[el.version_group_details.length - 1];

        return {
          move_name: this.Capitalize(el.move.name),
          learned_at: latestGame.level_learned_at,
          learn_method: this.Capitalize(latestGame.move_learn_method.name),
          version_name: this.Capitalize(latestGame.version_group.name),
        };
      });
    },
  },
};
</script>
