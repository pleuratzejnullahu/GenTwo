<template>
  <button
      :type="type"
      class="inline-flex items-center justify-center rounded-[70px]
           px-8 py-4 text-[18px] font-bold transition
           bg-gradient-to-r from-[#43B37D] to-[#B1E04B] text-white
           hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#43B37D]/50 cursor-pointer max-h-[55px]"
      v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    type: { type: String, default: 'button' }
  }
}
</script>
