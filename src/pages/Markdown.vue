<template>
  <h1 class="text-center text-2xl my-3"> Markdown </h1>
  <section class="flex w-full p-3 mx-auto bg-gray-50 h-screen">
    <article class="left w-1/2  bg-gray-100 mr-2">
      <textarea @input="update" class="w-full h-full p-2" :value="text"> </textarea>
    </article>
    <article class="right w-1/2 p-2 bg-blue-50 ml-2" v-html="markedText"></article>
  </section>
</template>

<script>
import marked from 'marked'
import debounce from '../utilities/mixins/debounce.js'
export default {
  mixins: [debounce],
  data() {
    return {
      text: 'sdsdf',
      timeout: null,
    }
  },
  methods: {
    update(e) {
      const task = ()=> {this.text = e.target.value}
      this.debounce(task, 500)
    },    
  },
  computed: {
    markedText() {return marked(this.text) }
  }
}
</script>

<style>

</style>