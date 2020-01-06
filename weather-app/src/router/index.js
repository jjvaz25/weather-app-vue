import Vue from 'vue'
import VueRouter from 'vue-router'
import MyWeather from '../views/MyWeather.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'my-weather',
    component: MyWeather
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
