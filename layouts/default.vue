<template>
  <div class="min-h-full h-full">
    <AppHeader />
    <!-- <div class="bg-white dark:bg-gray-800">
      <h1 class="text-gray-900 dark:text-white">Dark mode</h1>
      <p class="text-gray-600 dark:text-gray-300">
        Lorem ipsum...
      </p>
    </div> -->
    <main class="app-main bg-gray-50 dark:bg-gray-900">
      <Nuxt />
    </main>
    <AppFooter />
  </div>
</template>
<script>
import { initFlowbite } from 'flowbite'

export default {
  data() {
    return {}
  },
  mounted() {
    initFlowbite()
  },
}
</script>