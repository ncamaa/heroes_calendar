<template>
  <div class="p-3">
    <h2 class="my-4"> {{heroesCount}} </h2>
    <ul>
      <li v-for="(hero, index) in heroes" :key="hero" class="flex justify-between">
        <div>{{hero.name}}</div>
        <button @click="removeHero(index)">x</button>
      </li> 
    </ul>
    <form @submit.prevent="addHero" class="mt-5">
      <input type="text" v-model="newHero" placeholder="Add Hero Here." class="border-b p-1 mr-2" ref="newHeroInput">
      <button type="submit" class="p-2 bg-gradient-to-tr from-pink-400 to-indigo-400 text-white"> Add Hero </button>
    </form>
  </div>
</template>

<script>
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
      {name: "spiderman"},
      {name: "aquaman"},
      {name: "flash"},
      {name: "wolverine"},
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

    return {heroes, newHero, removeHero, addHero, newHeroInput, heroesCount}
  },
}
</script>

<style>

</style>