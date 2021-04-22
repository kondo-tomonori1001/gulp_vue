import Vue from 'vue';
import App from './components/App';

import { router } from './router'

new Vue({
  el: '#sampleApp', 
  router,
  render: h => h(App)
})


console.log('sampleApp');