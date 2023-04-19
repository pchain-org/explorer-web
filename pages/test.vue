<template>
  <div class="container mx-auto">
    <button id="dropdownButton" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg aria-hidden="true" class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg></button>
    <!-- Dropdown menu -->
    <div id="dropdownMenu" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownButton">
        <li>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
        </li>
        <li>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
        </li>
        <li>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
        </li>
        <li>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
        </li>
      </ul>
    </div>
    <div class="mt-6">
      <ClipboardIcon />
    </div>
  </div>
</template>
<script>
import { Dropdown } from 'flowbite'

export default {
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // set the dropdown menu element
      const $targetEl = document.getElementById('dropdownMenu')

      // set the element that trigger the dropdown menu on click
      const $triggerEl = document.getElementById('dropdownButton')

      // options with default values
      const options = {
        placement: 'bottom',
        triggerType: 'hover',
        offsetSkidding: 0,
        offsetDistance: 10,
        delay: 300,
        onHide: () => {
          console.log('dropdown has been hidden')
        },
        onShow: () => {
          console.log('dropdown has been shown')
        },
        onToggle: () => {
          console.log('dropdown has been toggled')
        },
      }
      this.dropdown = new Dropdown($targetEl, $triggerEl, options)
    },
  },
}
</script>