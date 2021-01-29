import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faArrowDown,
  faChevronDown,
  faChevronUp,
  faClipboardList,
  faClipboardCheck,
  faFileExport,
  faFlag,
  faHome,
  faPencilAlt,
  faPlus,
  faSave,
  faTrashAlt,
  faUpload,
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
  faArrowDown,
  faChevronDown,
  faChevronUp,
  faClipboardList,
  faClipboardCheck,
  faFileExport,
  faFlag,
  faHome,
  faGithub,
  faPencilAlt,
  faPlus,
  faSave,
  faTrashAlt,
  faUpload,
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(BootstrapVue)

// Components

new Vue({
  render: h => h(App),
}).$mount('#app')
