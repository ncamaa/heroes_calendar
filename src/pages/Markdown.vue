<template>
  <div>
    <section class="flex w-full p-3 mx-auto bg-gray-50 h-screen bg-gray-700">
      <article class="left w-1/2  bg-gray-100 mr-2">
        <textarea placeholder="Start typing..." @input="update" class="w-full bg-gray-600 text-white h-full p-2" :value="text"> 
          
        </textarea>
      </article>
      <article class="right w-1/2 p-2 bg-blue-50 ml-2" v-html="markedText"></article>
    </section>
  </div>
</template>

<script>
import marked from 'marked'
import debounce from '../utilities/mixins/debounce.js'
export default {
  mixins: [debounce],
  data() {
    return {
      text: `<p class="text-9xl bg-gradient-to-t p-4 rounded text-white from-green-400 to-yellow-400">Try ME!</p>`,
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