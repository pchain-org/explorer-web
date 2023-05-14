<template>
  <div class="error-404 py-6">
    <div class="container mx-auto lg:flex lg:items-center min-h-full space-1">
      <div class="lg:first-letter:w-60 xl:w-50">
        <div class="mb-10">
          <h1 class="text-blue-600 text-4xl mb-3">Search not <span class="font-medium">found</span></h1>
          <p class="mb-0 text-gray-600">Oops! The search string you entered was: <b>{{ key }}</b></p>
          <p class="mb-4 text-gray-600">Sorry! This is an invalid search string.</p>
        </div>

        <a class="" href="/">
          <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Back Home</button>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { key: '' }
  },
  created() {
    this.key = this.$route.query.q
  },
}
</script>
<style scoped>
.error-404 {
  /* 241px */
  height: calc(100vh - 56px - 80px);
  background-image: url('@/static/svg/error-404.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>