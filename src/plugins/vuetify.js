import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        grass: colors.green,
        poison: colors.purple,
        water: colors.blue,
        fire: colors.red,
        electric: colors.yellow,
        flying: colors.lightBlue.darken3,
        ground: colors.brown,
        rock: colors.amber,
        fairy: colors.pink.lighten2,
        steel: colors.grey,
        fighting: colors.red.darken2,
        psychic: colors.pink,
        dark: colors.grey.darken2,
        ice: colors.lightBlue.lighten2,
        ghost: colors.deepPurple,
        dragon: colors.blue.darken3,
        normal: colors.grey.darken1,
        bug: colors.lightGreen,
      },
    },
  },
});
