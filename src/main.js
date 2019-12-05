import Vue from 'vue'
import App from './App.vue'

// vuex
import store from './store/store'

// vue-router
import VueRouter from 'vue-router'
import { routes } from './routes'
Vue.use(VueRouter)

// vue-analytics
import VueAnalytics from 'vue-analytics'
Vue.use(VueAnalytics, {
  id: 'UA-154025347-1',
  router
})

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (_to, _from, _savedPosition) {
    return new Promise((resolve, _reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 200)
    })
  }
})

// semantic-ui
import SuiVue from 'semantic-ui-vue'
import 'semantic-ui-css/semantic.min.css'
Vue.use(SuiVue)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})