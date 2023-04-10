<template>
  <div class="inline-flex">
    <button :disabled="disableFirstBtn" :class="[disableFirstBtn?'cursor-not-allowed text-gray-600':'text-blue-600 hover:bg-blue-600 hover:text-white']" class="inline-flex mr-2 items-center px-2 py-2 text-xs font-medium bg-blue-100 rounded" @click="first">
      First
    </button>
    <button :disabled="disableFirstBtn" :class="[disableFirstBtn?'cursor-not-allowed fill-gray-600 text-gray-600':'text-blue-600 fill-blue-600 hover:fill-white hover:bg-blue-600 hover:text-white']" class="inline-flex items-center mr-2 px-2 py-2 text-xs font-medium text-gray-600 bg-blue-100 rounded" @click="prev">
      <svg aria-hidden="true" class="w-4 h-4" fill="" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
      </svg>
      <!-- Prev -->
    </button>
    <div class="mr-2 rounded inline-flex items-center text-gray-600 font-medium bg-blue-100 px-2 py-2 text-xs">Page {{ currentPage }} of {{ totalPage }}</div>
    <button :disabled="disableLastBtn" :class="[disableLastBtn?'cursor-not-allowed fill-gray-600 text-gray-600':'text-blue-600 fill-blue-600 hover:fill-white hover:bg-blue-600 hover:text-white']" class="inline-flex items-center mr-2 px-2 py-2 text-xs font-medium text-gray-600 bg-blue-100 rounded" @click="next">
      <!-- Next -->
      <svg aria-hidden="true" class="w-4 h-4" fill="" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
      </svg>
    </button>
    <button :disabled="disableLastBtn" :class="[disableLastBtn?'cursor-not-allowed text-gray-600':'text-blue-600 hover:bg-blue-600 hover:text-white']" class="inline-flex items-center px-2 py-2 text-xs font-medium bg-blue-100 rounded" @click="last">
      Last
    </button>
  </div>
</template>
<script>
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'AppPagination',
  props: {
    // 数据总数
    total: { type: Number, default: 0 },
    // 每页显示条数
    pageSize: { type: Number, default: 25 },
    // 当前页
    pageNum: { type: Number, default: 1 },
  },
  data() {
    return {}
  },
  computed: {
    // 总页数
    totalPage: function () {
      return Math.ceil(this.totalCount / this.currentPageSize)
    },
    // 当前页
    currentPage() {
      return this.pageNum
      // 当前每页显示条数
    },
    currentPageSize() {
      return this.pageSize
    },
    // 总记录数
    totalCount() {
      return this.total
    },
    disableLastBtn() {
      return this.currentPage === this.totalPage
    },
    disableFirstBtn() {
      return this.currentPage <= 1
    },
  },
  watch: {
    currentPageSize() {
      // 监听改变每页显示数
      const totalPage = Math.ceil(this.totalCount / this.currentPageSize)
      if (this.pageNum > totalPage) {
        // this.currentPage = totalPage
        this.$emit('page-change', totalPage)
        this.emitChange()
      }
    },
  },
  methods: {
    setCurrentPageSize() {
      this.$emit('size-change', this.currentPageSize)
      this.emitChange()
    },
    prev() {
      if (this.currentPage > 1) {
        this.go(this.currentPage - 1)
      }
    },
    next() {
      if (this.currentPage < this.totalPage) {
        this.go(this.currentPage + 1)
      }
    },
    first() {
      if (this.currentPage !== 1) {
        this.go(1)
      }
    },
    last() {
      if (
        this.currentPage !== this.totalPage &&
        this.currentPage < this.totalPage
      ) {
        this.go(this.totalPage)
      }
    },
    go(page) {
      if (this.currentPage !== page) {
        // 父组件通过change方法来接受当前的页码
        this.$emit('page-change', page)
        this.emitChange(page, this.currentPageSize)
      }
    },
    emitChange(page, size) {
      scrollTo(0, 400)
      this.$emit('change', { page, size })
    },
  },
}
</script>