<template>
  <v-app>
    <top-nav />
    <v-content>
      <weather />
    </v-content>
    <bottom-footer />
  </v-app>
</template>

<script>
import TopNav from './components/TopNav'
import BottomFooter from './components/BottomFooter'
import Weather from './components/Weather'

export default {
  name: 'App',

  components: {
    'top-nav': TopNav,
    'bottom-footer': BottomFooter,
    'weather': Weather
  },

  data: () => ({
    //
  }),
};
</script>
