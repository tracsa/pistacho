import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '~/components'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

// Components

new Vue({
  render: h => h(App),
}).$mount('#app')
