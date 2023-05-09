import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/style.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'



library.add(faAngleRight, faSun, faMoon)

const app = createApp(App)
app.use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
