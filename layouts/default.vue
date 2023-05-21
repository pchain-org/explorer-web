<template>
  <div class="min-h-full h-full">
    <AppHeader />
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