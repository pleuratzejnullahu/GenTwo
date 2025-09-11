<template>
  <div class="pt-16">
    <Container>
      <div class="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span class="font-extrabold leading-tight text-[72px]">
            Build your own financial
            <span class="bg-gradient-to-r from-[#43B37D] to-[#B1E04B] bg-clip-text text-transparent">
              plan.
            </span>
          </span>

          <p class="mt-5 text-neutral-400 max-w-xl text-[18px]">
            With our new program, we help you create your financial plan to make a better life in the future.
          </p>

          <div class="mt-8 flex items-center gap-6">
            <BaseButton>Get it now</BaseButton>

            <button class="text-neutral-300 hover:text-white underline-offset-4 hover:underline text-[18px] cursor-pointer">
              How it works?
            </button>
          </div>

          <dl class="mt-12 grid grid-cols-2 gap-8 max-w-md">
            <div class="flex flex-col">
              <span class="font-semibold text-[42px]" style="font-weight: 400">250+
                <span class="text-[31px] text-[#B4B4B4]">M</span>
              </span>

              <span class="text-neutral-400 text-sm">
                Program Successful
              </span>
            </div>

            <div class="flex flex-col">
              <span class="font-semibold text-[42px]" style="font-weight: 400">2.3
                <span class="text-[31px] text-[#B4B4B4]">M</span>
              </span>

              <span class="text-neutral-400 text-sm">
                Satisfied User
              </span>
            </div>
          </dl>
        </div>

        <AlphaCard />
      </div>
    </Container>
  </div>
</template>

<script>
import Container from '../ui/Container.vue'
import BaseButton from '../ui/BaseButton.vue'
import AlphaCard from './AlphaCard.vue'

export default {
  name: 'HeroSection',
  components: { Container, BaseButton, AlphaCard }
}
</script>
