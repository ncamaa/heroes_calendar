<template>
  <div class="h-screen w-full flex items-center justify-center bg-gradient-to-tr from-pink-400 to-indigo-400">
    <div class="rounded bg-white border-gray-300 p-4 m-4 border sm:w-96 mx-auto">
    
      <div class="p-2 text-xl">
        <h2 class="my-4 text-2xl"> Hero Count: {{heroesCount}} </h2>
        <ul>
          <li v-for="(hero, index) in heroes" :key="hero" class="flex justify-between items-center py-1 border-b">
            <div>{{hero.name}}</div>
            <button @click="removeHero(index)" class="w-6 text-red-600">
              <XCircle />
            </button>
          </li> 
        </ul>
        <form @submit.prevent="addHero" class="mt-5">
          <input type="text" v-model="newHero" placeholder="Add Hero Here." class="border-b p-2 mr-1" ref="newHeroInput">
          <button type="submit" class="p-2 bg-gradient-to-tr from-pink-400 to-indigo-400 text-white"> Add Hero </button>
        </form>
      </div>
    
    </div>
  </div>

</template>

<script>
import XCircle  from '../../node_modules/heroicons/vue/outline/XCircle'
import { computed, onMounted, ref } from 'vue'
export default {
  setup() {
    const heroesCount = computed({
      get:()=> heroes.value.length
    })
    const newHeroInput = ref(null)
    const newHero = ref('')
    const heroes = ref([
      {name: "Batman"},
      {name: "Spiderman"},
      {name: "Aquaman"},
      {name: "Flash"},
      {name: "Wolverine"},
    ] )
    function removeHero(index) {
      heroes.value.splice(index,1)
    }
    function addHero() {
      if (newHero.value === '') return
      heroes.value.push({name: newHero.value})
      newHero.value = ''
      newHeroInput.value.focus()
    }
    onMounted(() => {
      newHeroInput.value.focus()
    })

    return {XCircle, heroes, newHero, removeHero, addHero, newHeroInput, heroesCount}
  },
}
</script>

<style>

</style>