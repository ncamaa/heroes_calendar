<template>
  <div class="h-screen bg-gradient-to-tr from-yellow-500 to-pink-400 flex items-center">
  
    <div class="p-4 bg-gray-50  md:w-10/12 mx-auto grid grid-cols-3">
      <div v-for="(modal, index) in showModals" :key="modal" class="text-center">
        <button class="p-4 bg-green-400 text-white rounded text-xl mx-2 hover:bg-green-300" @click="modal.show=true">
          Open Modal {{index+1}}
        </button>
      </div>
    </div>

    <div v-for="(modal, index) in showModals" :key="modal">
      <transition name="fade-normal">
        <Modal v-if="modal.show" @toggle-login-modal="modal.show=!modal.show">
          <template #title>
            I am model #{{index+1}}'s title: <br>
            {{modal.title}}
          </template>
          <template #text>
            I am model #{{index+1}}'s text: <br>
            {{modal.text}}
          </template>
          <template #footer>
            I am model #{{index+1}}'s footer
          </template>
        </Modal>
      </transition>
    </div>
  </div>

</template>

<script>
import Modal from '../components/Modal'
import {ref} from 'vue'
export default {
  components:{Modal},
  setup() {
    const showModals = ref([
      {title:'hello', text: 'hello, i\'m the first modal', show: false},
      {title:'hello', text: 'hello, i\'m the second modal', show: false},
      {title:'hello', text: 'hello, i\'m the thrid modal', show: false},
    ])
    return {showModals}
  }
}
</script>

<style>
  .modalBackground {
    width: calc(100% - 150px);
    margin-left: 150px;
  }
</style>