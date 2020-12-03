<template>
  <nav class="p-3 bg-gradient-to-br from-blue-700 to-purple-500 text-white text-lg flex flex-wrap">
    <router-link v-for="item in list" :key="item" class="ml-3" :to="item.to"> {{item.title}} </router-link>
    <button v-if="!$parent.isUserLoggedIn" class="ml-3" @click="$emit('toggle-login-modal')">Login</button>
    <button v-if="$parent.isUserLoggedIn" class="ml-3" @click="logout()">Logout</button>
  </nav>
</template>

<script>
import firebase from '../utilities/firebase'
export default {
  data() {
    return {
      list: [
        {title: 'Home', to: '/'},
        {title: 'Calendar', to: '/calen'},
        {title: 'Heroes', to: '/heroes'},
        {title: 'Markdown', to: '/markdown'},
        {title: 'Slider', to: '/slider'},
        {title: 'Calculator', to: '/calculator'},
      ]
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(function() {
        console.log('Sign-out successful.')
      }).catch(function(error) {
        console.log('An error happened.' + error)
      });
    }
  }
}
</script>

<style>

</style>