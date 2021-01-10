<template>
  <div class="h-screen bg-gradient-to-tr from-pink-400 to-purple-500 flex items-center justify-center">
    <div>
    <h1 class="sm:w-96 text-white mx-auto text-3xl mt-3 text-center">Realtime Chat</h1>
    <div class="chat-window rounded bg-gray-100 border-gray-300 p-4 m-4 border sm:w-96 mx-auto">
      <div v-if="store.state.isUserLoggedIn" class="">
        <div class="max-h-80 overflow-auto flex flex-col-reverse h-80">
          <ul>
            <li v-for="chat in state.chats" :key="chat.message" class="my-2" :class="setChatLiClass(chat.user)">
              <span class="py-1 px-2 rounded max-w-full inline-block overflow-hidden" :class="setChatSpanClass(chat.user)">{{chat.message}}</span>
            </li>
          </ul>
        </div>
        <div class="input">
          <input
            @keydown.enter="addMessage"
            v-model="state.message"
            placeholder="Type to chat..."
            type="text"
            class="w-full mt-3 text-xl p-2 outline-none focus:border-blue-300 border-b-2">
          <small>Hint: type `clear` in order to clear the conversation</small>
        </div>
      </div>
      <p v-else>Please <strong class="underline cursor-pointer" @click="$store.commit('toggleLoginModal')">login</strong> in order to use the chat</p>
    </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue'
import  {chatsRef} from '../utilities/firebase'
import {useStore} from 'vuex'
export default {
  setup() {
    const store = useStore()
    // const chats = ref({})
    const state = reactive({
      chats:{},
      message:'',
      isUserLoggedIn: store.state.isUserLoggedIn,
      currentUserId: store.state.currentUser.uid
    })

    const userID = computed(()=> store.state.currentUser.uid)

    onMounted(  () => {

      chatsRef.on('value', (snapshot) =>{
        let initialChats = snapshot.val();
        state.chats = sortedGroupKeys(initialChats)
      })
      
    } )

    const addMessage = () => {
      const newChat = chatsRef.push()
      console.log('asd');
      newChat.set({user:userID.value, message: state.message})
      
      if (state.message === 'clear')  chatsRef.remove()
      state.message = ''
    }

    const setChatSpanClass = (userId) => {
      if (userId === userID.value) {
        return 'bg-blue-200'
      } return 'bg-green-200'
    }
    const setChatLiClass = (userId) => {
      if (userId === userID.value) {
        return 'text-left'
      } return 'text-right'
    }

    const sortedGroupKeys = (group)=> { 
        return group
    }

    return {state, addMessage, setChatSpanClass, setChatLiClass, userID, store}
  }
}
</script>

<style>

</style>