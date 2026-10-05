import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import { reveal } from './directives/reveal'
import { spotlight } from './directives/spotlight'
import { tilt } from './directives/tilt'

createApp(App)
  .directive('reveal', reveal)
  .directive('spotlight', spotlight)
  .directive('tilt', tilt)
  .mount('#app')
