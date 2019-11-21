import Vue from 'vue'
import App from './App.vue'
import store from './store/store'

// semantic-ui
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';

Vue.use(SuiVue);

new Vue({
  el: '#app',
  render: h => h(App),
  store
})