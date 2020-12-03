<template>
  <div @click="clickedOnBackground($event.target)" class="modalBackground w-screen h-screen fixed left-0 top-0 bg-opacity-50 bg-black flex items-center justify-center">
    <form @submit.prevent="submitForm()" class="p-10 bg-white shadow-md flex flex-col max-w-full" style="width: 480px">
      
      <button @click="signInWithGoogle" class="p-3 border-black shadow-sm text-lg border-2 rounded">Sign in with Google</button>

      <p class="mt-3">Or</p>
      
      <input v-model="email" type="email" placeholder="Email" class="p-3 border-b-2 mb-2 border-black text-lg outline-none focus:border-blue-600">
      <input v-model="password" type="password" placeholder="Password" class="p-3 border-b-2 mb-2 border-black text-lg outline-none focus:border-blue-600">
      <button class="mt-3 text-lg p-3 bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded hover:opacity-90" type="submit">Submit</button>
      
      <transition name="fade-normal">
        <div v-if="isLoading" class="flex mt-5 items-center"> 
          <div class="spinner"></div>
          <div class="ml-5">Loading</div>
        </div>
      </transition>
      
      <transition name="fade-normal">
        <div v-if="loginErrorMessage" class="text-red-600 my-4 font-bold">
          {{ loginErrorMessage }}
        </div>
      </transition>

    </form>
  </div>
</template>

<script>
import firebase from '../utilities/firebase'
export default {
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
      loginErrorMessage: '',
    }
  },
  methods: {
    signInWithGoogle() {
      this.isLoading = true
      this.loginErrorMessage = ''
      
      var provider = new firebase.auth.GoogleAuthProvider()
      
      firebase.auth().signInWithPopup(provider).then(function() {
        this.isLoading = false  
      }).catch(function(error) {
        this.loginErrorMessage = error.message
        this.isLoading = false
      })
    },
    clickedOnBackground(target) {
      if( target.classList.contains('modalBackground')) {
        this.$emit('toggle-login-modal')
      }
    },
    submitForm() {
      this.isLoading = true
      this.loginErrorMessage = ''
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        console.log(user)
        this.isLoading = false
      })
      .catch((error) => {
        this.isLoading = false
        this.loginErrorMessage = error.message
      });
    }
  }
}
</script>

<style>
    @keyframes spinner {
      to {transform: rotate(360deg);}
    }
 
    .spinner { 
      display: block;
      box-sizing: border-box;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 1px solid #ccc;
      border-top-color: #07d;
      animation: spinner .6s linear infinite;
    }
  
</style>