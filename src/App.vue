<template>
  <div class="flex" id="generalWrapper">
    <AppHeader />
    
    <div class="app h-screen">
      <div class="w-full h-full bg-gray-700">
        <router-view v-slot="{ Component }">
          <transition name="no-mode-fade" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
  <teleport to="body">
    <transition name="no-mode-fade" mode="out-in">
      <LoginModal v-if="$store.state.showLoginModal" />
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
      this.$store.commit('toggleLoginModal')
    }
  },
  data() {
    return {
      showLoginModal: false,
      currentUser: {},
      isUserLoggedIn: false,
      store: this.$store.state
    }
  },
  mounted() {
    console.log(this.$store.state);
    firebase.auth().onAuthStateChanged( (user)=> {
      if (user) {
        // this.currentUser = user
        // this.isUserLoggedIn = true
        this.$store.commit('setShowLoginModal', false)
        this.$store.commit('setIsLoggedIn', true)
        this.$store.commit('setCurrentUser', user)
        console.log(this.$store.state)
      } else {
        this.$store.commit('setIsLoggedIn', false)
        this.$store.commit('setCurrentUser', {})
        // this.currentUser = {}
        // this.isUserLoggedIn = false
      }
    } )
  }
}
</script>

<style lang="scss">

  #generalWrapper {
    .app {
      width: calc(100% - 150px);
      margin-left: 150px;
      path {
        stroke-width: 1.5px;
      }
    }
  }
  .no-mode-fade-enter-active, .no-mode-fade-leave-active {
    transition: opacity .1s
  }

  .no-mode-fade-enter-from, .no-mode-fade-leave-to {
    opacity: 0
  }
</style>