<template>
  <div class="flex flex-col h-full">
    <div class="flex-1">
      <h1 class="font-600 leading-tight text-[72px] rubik">
        Build your own financial
        <span class="bg-gradient-to-r from-[#43B37D] to-[#B1E04B] bg-clip-text text-transparent">
        plan.
      </span>
      </h1>

      <div class="financial-plan-text max-w-[80%] mt-[10px]">
        <p
            class="text-neutral-400 text-[18px] leading-relaxed text-justify max-w-[60ch]"
        >
          With our new program, we'll help you to create your
          financial plan to make your better life in the future.
        </p>
      </div>

      <div class="flex items-center gap-6 mt-[40px]">
        <BaseButton>Get it now</BaseButton>

        <button
            class="text-neutral-300 hover:text-white underline-offset-4 hover:underline text-[18px] cursor-pointer"
            @click="$emit('scroll-how-it-works')"
        >
          How it works?
        </button>
      </div>
    </div>

    <div class="mb-6 mt-10 grid grid-cols-2 gap-8 max-w-md">
      <div class="flex flex-col rubik">
        <span class="font-semibold text-[42px]" style="font-weight: 400">250+
          <span class="text-[31px] text-[#B4B4B4]">M</span>
        </span>
        <span class="text-neutral-400 text-sm">Program Successful</span>
      </div>

      <div class="flex flex-col rubik">
        <span class="font-semibold text-[42px]" style="font-weight: 400">2.3
          <span class="text-[31px] text-[#B4B4B4]">M</span>
        </span>
        <span class="text-neutral-400 text-sm">Satisfied User</span>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '../ui/BaseButton.vue'

export default {
  name: 'FinancialPlan',
  components: { BaseButton },
  emits: ['scroll-how-it-works'],
}
</script>
