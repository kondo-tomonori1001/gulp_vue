import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Sample from '../components/Sample';
import Index from '../components/Index';

export const router = new VueRouter({
  mode: "history",
  base:"/",
  routes: [
    {path:"/",component: Index},
    {path: "/sample",component: Sample},
  ]
})