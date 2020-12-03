<template>
  <h1 class="text-2xl mx-auto my-3 text-center">Slider</h1>
  <div class="slider-container relative flex flex-wrap w-full overflow-hidden" style="height: 360px">
    <div class="w-full absolute" v-for="(color, index) in colors" :key="color">
      <transition name="fade">
        <div
          v-if="currentSlide === index"
          :class="color"
          style="height: 350px"
        ></div>
      </transition>
    </div>
    <ul class="absolute bottom-0 flex justify-center w-full">
      <li v-for="(dot, index) in colors" :key="dot"
          class="rounded w-5 h-5 mx-2 cursor-pointer"
          :class="currentSlide === index ? 'bg-gray-600': 'bg-gray-300'"
          @click="goToIndex(index)"></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: ['bg-red-400', 'bg-blue-400', 'bg-green-400'],
      currentSlide: 0,
      sliderInterval: null
    }
  },
  mounted() {
    this.sliderInterval = setInterval(() => {
      if (this.currentSlide === 2) {
        this.currentSlide = 0
      } else {
        this.currentSlide++
      }
    }, 5300);
  },
  unmounted() {
    clearInterval(this.sliderInterval)
  },
  methods: {
    goToIndex(index) {
      this.currentSlide = index
    }
  }
}
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: all 1.3s;
  }
  .fade-enter-from {
    opacity: 0;
    transform: translateX(-100%)
  }
  .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateX(100%)
  }
</style>