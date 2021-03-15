import Vue from 'vue'

import FormEdit from './FormEdit'
import FormView from './FormView'
import InputEdit from './InputEdit'
import InputView from './InputView'
import NodeEdit from './NodeEdit'
import NodeView from './NodeView'
import ProcessCreator from './ProcessCreator'
import ProcessEdit from './ProcessEdit'
import ProcessView from './ProcessView'
import XlsxExport from './XlsxExport'
import XmlExport from './XmlExport'

import {
  mdbInput,
  mdbBtn,
  mdbBtnGroup,
} from "mdbvue";

Vue.component('mdb-input', mdbInput)
Vue.component('mdb-btn', mdbBtn)
Vue.component('mdb-btn-group', mdbBtnGroup)

Vue.component('app-form-edit', FormEdit)
Vue.component('app-form-view', FormView)
Vue.component('app-input-edit', InputEdit)
Vue.component('app-input-view', InputView)
Vue.component('app-node-edit', NodeEdit)
Vue.component('app-node-view', NodeView)
Vue.component('app-process-creator', ProcessCreator)
Vue.component('app-process-edit', ProcessEdit)
Vue.component('app-process-view', ProcessView)
Vue.component('app-xlsx-export', XlsxExport)
Vue.component('app-xml-export', XmlExport)
