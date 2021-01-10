<template>
  <div class="home-main flex align-middle justify-items-center h-full bg-gray-900">
    <h1 class="text-8xl text-white text-center content-center flex w-full justify-center items-center">Home</h1>
  </div>
</template>

<script>
export default {
  // data() {
  //   return {
  //     store: this.$store.state
  //   }
  // },
  mounted() {
    console.log(this.$store.state);
  },
}
</script>

<style>
  .home-main {
    background-image: linear-gradient(to top right, #30cfd0 0%, #330867 100%);
  }
</style>