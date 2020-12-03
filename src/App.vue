<template>
  <div class="mx-auto">
    <AppHeader @toggle-login-modal="toggleLoginModal()" />
    <div class="app">
      <router-view>
      </router-view>
    </div>
  </div>
  <teleport to="body">
    <transition name="fade-normal">
      <LoginModal v-if="showLoginModal" @toggle-login-modal="toggleLoginModal()" />
    </transition>
  </teleport>
</template>
<script>
import AppHeader  from './components/AppHeader.vue';
import LoginModal from './components/LoginModal.vue';
import firebase   from './utilities/firebase';
export default {
  components: {AppHeader, LoginModal},
  methods: {
    toggleLoginModal() {
      this.showLoginModal = !this.showLoginModal
    }
  },
  data() {
    return {
      showLoginModal: false,
      currentUser: {},
      isUserLoggedIn: false
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged( (user)=> {
      if (user) {
        this.currentUser = user
        this.isUserLoggedIn = true
        this.showLoginModal = false
      } else {
        this.currentUser = {}
        this.isUserLoggedIn = false
      }
    } )
  }
}
</script>

<style>
  .fade-normal-enter-active,
  .fade-normal-leave-active {
    transition: all 0.5s ease;
  }

  .fade-normal-enter-from,
  .fade-normal-leave-to {
    opacity: 0;
    top: -50px;
  }
</style>