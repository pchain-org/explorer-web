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

    <!-- Show tooltip on bottom -->
    <button id="tooltipButton" type="button" data-title="2332232" class="tooltipButton mb-2 md:mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tooltip bottom</button>
    <button type="button" data-title="我们" class="tooltipButton mb-2 md:mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tooltip bottom</button>
    <button type="button" data-title="你是" class="tooltipButton mb-2 md:mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tooltip bottom</button>
    <div id="tooltipContent" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
      {{ ageTitle }}
      <div class="tooltip-arrow" data-popper-arrow></div>
    </div>

    <!-- Show tooltip on bottom -->
    <button data-tooltip-target="tooltip-bottom" data-tooltip-placement="bottom" type="button" class="mb-2 md:mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @mouseenter="ageTitle='我怎么知道你在想什么还是那个地点那条机我爱你 爱着你就像老鼠爱大米'">Tooltip bottom</button>
    <button data-tooltip-target="tooltip-bottom" data-tooltip-placement="bottom" type="button" class="mb-2 md:mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @mouseenter="ageTitle='你数据'">Tooltip bottom</button>
    <button data-tooltip-target="tooltip-bottom" data-tooltip-placement="bottom" type="button" class="mb-2 md:mb-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Tooltip bottom</button>
    <div id="tooltip-bottom" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
      {{ ageTitle }}
      <div class="tooltip-arrow" data-popper-arrow></div>
    </div>

  </div>
</template>
<script>
import { Dropdown, Tooltip } from 'flowbite'

export default {
  data() {
    return {
      ageTitle: '',
    }
  },
  mounted() {
    this.init()
    this.initTooltip()
    this.tooltip.toggle()

    // setTimeout(() => {
    //   this.tooltip.toggle()
    // }, 3000)
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
    initTooltip() {
      // set the tooltip content element
      const $targetEl = document.getElementById('tooltipContent')

      // set the element that trigger the tooltip using hover or click
      const $triggerEl = document.getElementById('tooltipButton')
      // const $triggerEl = document.querySelectorAll('.tooltipButton')

      // options with default values
      const options = {
        placement: 'bottom',
        triggerType: 'hover',
        onHide: () => {
          // console.log('tooltip is shown')
        },
        onShow: (e) => {
          // console.log('tooltip is hidden', e)
          this.ageTitle = e._triggerEl.dataset.title
        },
        onToggle: (e) => {
          console.log('tooltip is toggled')
        },
      }
      this.tooltip = new Tooltip($targetEl, $triggerEl, options)

      // console.log($triggerEl, '2323')
      // $triggerEl.forEach((item) => {
      //   // this.tooltip =
      //   return new Tooltip($targetEl, item, options)
      // })
    },
  },
}
</script>