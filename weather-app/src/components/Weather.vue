<template>
  <div class="weather">
    <v-container style="max-width: 300px">
      <v-form align="center">
        <v-text-field 
          class="v-input input"
          v-model="zipcode" 
          label="Enter a zipcode"
        >
        </v-text-field>
        <v-btn class="primary mt-2" @click="getWeather">
          search
        </v-btn>
      </v-form>
    </v-container>

    <v-container>
      <v-card
        class="mx-auto"
        max-width="400"
        outlined
      >
      <v-row>
        <v-list-item>
          <v-col cols="7">
            <v-list-item-content>
              <v-list-item-title class="headline mb-1 text-wrap">{{ this.weatherInfo.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ this.formatDate() }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-col>
          
          <v-col cols="5" align="center">
            <v-list-item-avatar
              tile
              size="80"
              color="primary"
              class="mx-auto"
            >
            </v-list-item-avatar>
            <v-list-item-subtitle>{{ this.weatherInfo.description }}</v-list-item-subtitle>
          </v-col>
        </v-list-item>
        </v-row>
        <v-list-item>
        <v-row>
          <v-col>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1 text-wrap">{{ this.weatherInfo.temp }}</v-list-item-title>
              <v-list-item-subtitle>Feels like: {{ this.weatherInfo.feelsLike }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-col>
          <v-col cols="2" align="right" class="px-0">
            <v-list-item-subtitle>min:</v-list-item-subtitle>
            <v-list-item-subtitle>max:</v-list-item-subtitle>
            <v-list-item-subtitle>Hum:</v-list-item-subtitle>
            <v-list-item-subtitle>Wind:</v-list-item-subtitle>
          </v-col>
          <v-col cols="3" align="left" class="px-2">
            <v-list-item-subtitle>{{ this.weatherInfo.minTemp }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ this.weatherInfo.maxTemp }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ this.weatherInfo.humidity }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ this.weatherInfo.wind }}</v-list-item-subtitle>
          </v-col>
        </v-row>
        </v-list-item>
      </v-card>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'Weather',

  data() {
    return {
      zipcode: '',
      weatherInfo: {}
    }
  },

  methods: {
    async getWeather() {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${this.zipcode},us&APPID=115cf28cc50f49d3ab9fd208f9487bc4`, {mode: 'cors'})
      const data = await response.json()
      console.log(data)
      let weatherObject = {
        main: data['weather'][0]['main'],
        description: data['weather'][0]['description'],
        temp: data['main']['temp'],
        feelsLike: data['main']['feels_like'],
        minTemp: data['main']['temp_min'],
        maxTemp: data['main']['temp_max'],
        humidity: data['main']['humidity'],
        wind: data['wind']['speed'],
        country: data['sys']['country'],
        sunrise: new Date(data['sys']['sunrise']),
        sunset: new Date(data['sys']['sunset']),
        name: data['name']
      }
      this.weatherInfo = weatherObject
      console.log(this.weatherInfo)
      this.zipcode = ''
    },
    formatDate() {
      const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      let currentDate = new Date()
      let formattedDate = months[currentDate.getMonth()] + ' ' + currentDate.getDate() + " " + currentDate.getFullYear()
      return formattedDate
    }
  }
}

</script>

<style>
  .theme--light.v-input:not(.v-input--is-disabled) input {
    text-align: center
  }
</style>