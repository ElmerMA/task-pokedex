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

    <div v-if="Object.keys(selectedPokemon).length != 0">
      <v-dialog
        v-model="selectDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-card tile>
          <v-toolbar
            flat
            dark
            color="primary"
          >
            <v-btn
              icon
              dark
              @click="clearSelectedPokemon"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{selectedPokemon.name[0].toUpperCase() + selectedPokemon.name.substr(1)}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                dark
                text
                @click="dialog = false"
              >
                Save
              </v-btn>
            </v-toolbar-items>
            <v-menu
              bottom
              right
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  dark
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
            </v-menu>
          </v-toolbar>

          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>
    </div>

    <v-row justify="space-between" class="mt-5">
      <v-col v-for="(item ,index) in $store.state.pokemonData" :key="index" md=2 sm=12>
        <v-card max-width="auto" elevation="2" @click="getSelectedPokemon(index)">
        <v-card-title class="justify-center">#{{index + 1}}</v-card-title>
        <v-img class="mx-auto" :src="$store.state.spriteUrl + (index+1) + '.png'" max-width="50%">

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
        headers: [{text:"Image", value: 'image', sortable: false}, {text:' Name', value: 'name'}],
        selectedPokemon: {},
        selectDialog: false

      }
    },
    methods: {
      async getSelectedPokemon(id){
        let {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id+1}`);
        this.selectedPokemon = data;
        this.selectDialog = true;
      },
      clearSelectedPokemon(){
        this.selectedPokemon = {};
        this.selectDialog = false;
      }
    },
  }
</script>
