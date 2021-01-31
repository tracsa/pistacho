import Vue from 'vue'
import App from './App.vue'

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

// Components

new Vue({
  render: h => h(App),
}).$mount('#app')
