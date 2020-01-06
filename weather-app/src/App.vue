<template>
  <v-app>
    <top-nav />
    <v-content class="grey lighten-2">
      <router-view></router-view>
    </v-content>
    <bottom-footer />
  </v-app>
</template>

<script>
import TopNav from './components/TopNav'
import BottomFooter from './components/BottomFooter'

export default {
  name: 'App',

  components: {
    'top-nav': TopNav,
    'bottom-footer': BottomFooter,
  },

  data: () => ({
    //
  }),
};
</script>
