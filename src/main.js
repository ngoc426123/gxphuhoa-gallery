import Vue from 'vue'
import App from './App.vue'
import router from './router'

// STORE
import store from './store'

// STYLE
import './assets/scss/index.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
