import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import App from './components/App';
import Sample from './components/Sample';
import Index from './components/Index';

const router = new VueRouter({
  mode: "history",
  base:"/",
  routes: [
    {path:"/",component: Index},
    {path: "/sample",component: Sample},
  ]
})

new Vue({
  el: '#sampleApp', 
  router,
  render: h => h(App)
})


console.log('sampleApp');