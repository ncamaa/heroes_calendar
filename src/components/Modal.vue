<template>
  <div @click="clickedOnBackground($event.target)" class="modalBackground w-screen h-screen fixed left-0 top-0 bg-opacity-50 bg-black flex items-center justify-center">
    <div class="p-10 bg-white shadow-md flex flex-col max-w-full" style="width: 480px">
      <h1 class="text-xl">
        <slot name="title">
        </slot>
      </h1>
      <p>
        <slot name="text">
        </slot>
      </p>
      <footer class="border-t-2 py-2 mt-2">
        <slot name="footer">
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickedOnBackground(target) {
      if( target.classList.contains('modalBackground')) {
        this.$emit('toggle-login-modal')
      }
    },
  }
}
</script>

<style>
  
</style>