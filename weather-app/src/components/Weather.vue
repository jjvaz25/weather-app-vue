<template>
  <div class="weather">

    <v-container style="max-width: 300px">
      <v-form ref="form" align="center" @submit.prevent="getWeather" autocomplete="off">
        <v-text-field 
          class="v-input input"
          v-model="zipcode" 
          label="Enter a zipcode"
          :rules="inputRules"
        >
        </v-text-field>
        <v-btn class="primary mt-2" type="submit" :loading="loading">
          search
        </v-btn>
      </v-form>
    </v-container>

    <v-container>
      <v-card
        class="mx-auto grey lighten-3"
        max-width="400"
        outlined
        v-if="weatherData"
      >
      <v-row class="px-0 mx-0">
        <v-list-item>
          <v-col cols="7">
            <v-list-item-content>
              <v-list-item-title class="headline mb-1 text-wrap font-weight-bold">{{ this.weatherInfo.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ this.formatDate() }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-col>
          <v-col cols="5" align="center">
            <v-list-item-avatar
              tile
              size="80"
              class="mx-auto"
              outlined
              color="primary"
            >
              <img :src="`http://openweathermap.org/img/wn/${this.weatherInfo.icon}@2x.png`" alt="">
            </v-list-item-avatar>
            <v-list-item-subtitle>{{ this.weatherInfo.description }}</v-list-item-subtitle>
          </v-col>
        </v-list-item>
        </v-row>
        <v-divider></v-divider>
        <v-row class="px-0 mx-0">
          <v-list-item>
            <v-col cols="7">
              <v-list-item-content v-if="!showCelcius" class="pt-0">
                <v-list-item-title class="headline mb-1 text-wrap font-weight-bold">{{ inFahrenheit(this.weatherInfo.temp) }}°F</v-list-item-title>
                <v-list-item-subtitle>Feels like: {{ inFahrenheit(this.weatherInfo.feelsLike) }}°F</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content v-if="showCelcius" class="pt-0">
                <v-list-item-title class="headline mb-1 text-wrap font-weight-bold">{{ inCelcius(this.weatherInfo.temp) }}°C</v-list-item-title>
                <v-list-item-subtitle>Feels like: {{ inCelcius(this.weatherInfo.feelsLike) }}°C</v-list-item-subtitle>
              </v-list-item-content>
            </v-col>
            <v-col cols="2" align="right" class="px-0">
              <v-list-item-subtitle>min:</v-list-item-subtitle>
              <v-list-item-subtitle>max:</v-list-item-subtitle>
              <v-list-item-subtitle>Hum:</v-list-item-subtitle>
              <v-list-item-subtitle>Wind:</v-list-item-subtitle>
            </v-col>
            <v-col cols="3" align="left" class="px-2">
              <v-list-item-subtitle v-if="!showCelcius">{{ inFahrenheit(this.weatherInfo.minTemp) }}°F</v-list-item-subtitle>
              <v-list-item-subtitle v-if="!showCelcius">{{ inFahrenheit(this.weatherInfo.maxTemp) }}°F</v-list-item-subtitle>
              <v-list-item-subtitle v-if="showCelcius">{{ inCelcius(this.weatherInfo.minTemp) }}°C</v-list-item-subtitle>
              <v-list-item-subtitle v-if="showCelcius">{{ inCelcius(this.weatherInfo.maxTemp) }}°C</v-list-item-subtitle>
              <v-list-item-subtitle>{{ this.weatherInfo.humidity }}%</v-list-item-subtitle>
              <v-list-item-subtitle v-if="!showCelcius">{{ Math.round(this.weatherInfo.wind * 2.237)}} mph</v-list-item-subtitle>
              <v-list-item-subtitle v-if="showCelcius">{{ this.weatherInfo.wind }} m/s</v-list-item-subtitle>
            </v-col>
          </v-list-item>
        </v-row>
        <v-row class="px-0 mx-0">
          <v-list-item>
            <v-col cols="12" class="py-0">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-checkbox v-model="showCelcius" label="Show in Celcius"></v-checkbox>
              </v-card-actions>
            </v-col>
          </v-list-item>
        </v-row>
        
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
      weatherInfo: {},
      showCelcius: false,
      weatherData: false,
      inputRules: [
        v => (v && v.length <= 5) || 'Please enter a valid 5-digit USA zipcode'
      ],
      loading: false
    }
  },

  methods: {
    async getWeather() {
      if (this.$refs.form.validate()) {
        this.loading = true
        try{
          const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${this.zipcode},us&APPID=115cf28cc50f49d3ab9fd208f9487bc4`, {mode: 'cors'})
          const data = await response.json()
          let weatherObject = {
            main: data['weather'][0]['main'],
            description: data['weather'][0]['description'],
            temp: data['main']['temp'],
            feelsLike: data['main']['feels_like'],
            minTemp: data['main']['temp_min'],
            maxTemp: data['main']['temp_max'],
            humidity: data['main']['humidity'],
            wind: data['wind']['speed'],
            name: data['name'],
            icon: data['weather'][0]['icon']
          }
          this.weatherInfo = weatherObject
          this.weatherData = true
          this.zipcode = ''
          this.$refs.form.reset()
          this.loading = false
        } catch (err) {
          console.error(err)
          alert('Zipcode not found. Please make sure you entered a valid 5-digit USA zip code')
        }
      }
    },
    formatDate() {
      const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      let currentDate = new Date()
      let formattedDate = months[currentDate.getMonth()] + ' ' + currentDate.getDate() + " " + currentDate.getFullYear()
      return formattedDate
    },
    inFahrenheit(kelvinNum) {
      let fahrenheit = (kelvinNum - 273.15) * 9/5 + 32
      return Math.round(fahrenheit)
    },
    inCelcius(kelvinNum) {
      this.$refs.form.reset()
      let celcius = kelvinNum - 273.15
      return Math.round(celcius)
    }  
  }
}

</script>

<style>
  .theme--light.v-input:not(.v-input--is-disabled) input {
    text-align: center
  }
</style>