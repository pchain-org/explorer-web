<template>
  <div class="inline-flex">
    <span :id="'clipboardIcon'+id" :data-tooltip-target="'clipboard-tooltip' + id" class="inline-flex cursor-pointer" @click="handleClipboard(undefined, $event)" @mouseleave="resetStatus">
      <svg v-if="isCopied" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline-block text-gray-500 pointer-events-none w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline-block text-gray-500 pointer-events-none w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
      </svg>
    </span>
    <div :id="'clipboard-tooltip'+id" role="tooltip" class="absolute z-50 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
      {{ tipContent }}
      <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
  </div>
</template>
<script>
import Clipboard from 'clipboard'
import { Tooltip } from 'flowbite'

export default {
  name: 'ClipboardIcon',
  props: {
    text: {
      type: String,
      default: '',
    },
    successTip: {
      type: String,
      default: 'Copied',
    },
    failTip: {
      type: String,
      default: 'Copy failed',
    },
    defaultTip: {
      type: String,
      default: 'Copy to clipboard',
    },
  },
  data() {
    return {
      isCopied: undefined,
      tooltip: null,
      tipContent: this.defaultTip,
      id: Math.random().toString().slice(-6),
    }
  },
  mounted() {
    this.initTooltip()
  },
  methods: {
    handleClipboard(text = this.text, event) {
      const clipboard = new Clipboard(event.target, {
        text: () => text,
      })
      this.tooltip.hide()
      clipboard.on('success', () => {
        this.isCopied = true
        this.tipContent = this.successTip
        this.changeStatus()
        setTimeout(() => {
          this.tooltip.show()
        }, 0)
        clipboard.destroy()
      })
      clipboard.on('error', () => {
        this.isCopied = false
        this.tipContent = this.failTip
        setTimeout(() => {
          this.tooltip.show()
        }, 0)
        clipboard.destroy()
      })
      clipboard.onClick(event)
    },
    changeStatus() {
      const timerId = setTimeout(() => {
        this.isCopied = undefined
        clearTimeout(timerId)
        setTimeout(() => {
          this.tooltip.show()
        }, 0)
      }, 1000)
    },
    initTooltip() {
      // set the tooltip content element
      const $targetEl = document.getElementById('clipboard-tooltip' + this.id)
      // set the element that trigger the tooltip using hover or click
      const $triggerEl = document.getElementById('clipboardIcon' + this.id)
      // options with default values
      const options = {
        placement: 'top',
        triggerType: 'hover',
        onHide: () => {},
        onShow: () => {},
        onToggle: () => {},
      }
      this.tooltip = new Tooltip($targetEl, $triggerEl, options)
    },
    resetStatus() {
      this.tipContent = this.defaultTip
      this.isCopied = undefined
    },
  },
}
</script>