import Vue from 'vue'
import App from './App.vue'
import store from './store/store'

Vue.filter("formatNumber", function(value){
  return Number(Math.floor(value)).toLocaleString()
})

new Vue({
  el: '#app',
  render: h => h(App),
  store
})