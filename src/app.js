import Vue from 'vue'
import Buefy from 'buefy'

import App from './app.vue'

Vue.use(Buefy)

new Vue({
  el: '#app',
  ...App
})
