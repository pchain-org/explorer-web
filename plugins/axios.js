import Vue from 'vue'
// import { getChainNum } from '~/utils/chain'
export default function ({ $axios, redirect }) {
  // 请求拦截
  $axios.onRequest((config) => {
    config.headers['Chain-Num'] = 0
    return config
  })
  // 响应拦截器
  $axios.onResponse((response) => {
    const res = response
    // 返回数据逻辑处理
    if (res.data.code === 0) {
      return res
    } else {
      Vue.prototype.$message.error(res.data.enMsg || 'Error')
      return Promise.reject(res.data.enMsg)
    }
  })
  $axios.onError((error) => {
    const code = parseInt(error && error.status)
    switch (code) {
      case 400:
        error.message = '请求错误(400)'
        break
      case 403:
        error.message = '拒绝访问(403)'
        break
      case 404:
        error.message = '请求出错(404)'
        break
      case 408:
        error.message = '请求超时(408)'
        break
      case 500:
        error.message = '服务器错误(500)'
        break
      case 501:
        error.message = '服务未实现(501)'
        break
      case 502:
        error.message = '网络错误(502)'
        break
      case 503:
        error.message = '服务不可用(503)'
        break
      case 504:
        error.message = '网络超时(504)'
        break
      case 505:
        error.message = 'HTTP版本不受支持(505)'
        break
      default:
        error.message = ''
      // error.message = `连接出错(${code})!`;
    }
    if (error.message) {
      // Message({
      //   message: error.message,
      //   type: 'error',
      //   duration: 3 * 1000,
      // })
    }
    return Promise.reject(error)
  })
}
