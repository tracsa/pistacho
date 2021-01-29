import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faChevronDown,
  faChevronUp,
  faHome,
  faPencilAlt,
  faPlus,
  faSave,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import {
  faGithub,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '~/components'

library.add(
  faAngleDoubleDown,
  faAngleDoubleUp,
  faChevronDown,
  faChevronUp,
  faHome,
  faGithub,
  faPencilAlt,
  faPlus,
  faSave,
  faTrashAlt,
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(BootstrapVue)

// Components

new Vue({
  render: h => h(App),
}).$mount('#app')
