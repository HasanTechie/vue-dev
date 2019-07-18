import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {store} from './vuex/store'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import VueSweetalert2 from 'vue-sweetalert2';
import MultiFiltersPlugin from './plugins/MultiFiltersPlugin'

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

//to be removed
// import axios from 'axios'
// window.axios=axios
// axios.defaults.baseURL = 'http://35.158.76.194/api';
//

// import component and stylesheet
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker'
import 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css'

// see docs for available options
const datepickerOptions = {}

// make sure we can use it in our components
Vue.use(AirbnbStyleDatepicker, datepickerOptions)

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
}
Vue.use(VueSweetalert2,options);

const requireComponent = require.context(
    // The relative path of the components folder
    './components',
    // Whether or not to look in subfolders
    false,
    // The regular expression used to match base component filenames
    /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName)

  // Get PascalCase name of component
  const componentName = upperFirst(
      camelCase(
          // Gets the file name regardless of folder depth
          fileName
              .split('/')
              .pop()
              .replace(/\.\w+$/, '')
      )
  )


  // Register component globally
  Vue.component(
      componentName,
      // Look for the component options on `.default`, which will
      // exist if the component was exported with `export default`,
      // otherwise fall back to module's root.
      componentConfig.default || componentConfig
  )
})

Vue.config.productionTip = false

Vue.use(MultiFiltersPlugin)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
