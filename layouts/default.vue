<template>
  <div>
    <AppHeader />
    <main>
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