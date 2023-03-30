import Vue from 'vue'
import CreateApi from '~/api'
export default function ({ $axios }) {
  Vue.prototype.$api = new CreateApi($axios)
}
