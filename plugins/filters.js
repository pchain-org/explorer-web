import Vue from 'vue'
import * as filters from '@/utils/filters' // global filters
// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
