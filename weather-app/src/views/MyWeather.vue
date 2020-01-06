<template>
  <div class="home">
    <weather />
  </div>
</template>

<script>
// @ is an alias to /src
import Weather from '../components/Weather'

export default {
  name: 'MyWeather',
  components: {
    'weather': Weather
  }
}
</script>
