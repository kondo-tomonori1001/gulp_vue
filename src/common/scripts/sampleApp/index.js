import Vue from 'vue';
import Sample from './components/Sample';

new Vue({
  el: '#sampleApp', 
  components: { Sample }, 
  template: '<app/>', 
})

console.log('sampleApp');