<template>
  <nav class="p-3 primary-nav bg-gray-900 text-white text-lg flex flex-wrap">
    
    <router-link v-for="item in list" :key="item" class="w-full flex flex-col items-center" :to="item.to" :class="'hover:text-'+item.color+'-400'">
      <component :is="item.icon" class="w-10" fill="none" /><span>
        {{item.title}} </span>
    </router-link>
    <div class="w-full cursor-pointer hover:text-yellow-400 flex flex-col items-center" @click="this.$store.commit('setShowLoginModal', true)">
      <!-- Login -->
      <span v-if="!this.$store.state.isUserLoggedIn"> 
        <Login class="w-10 mx-auto" />
        <button>Login</button>
      </span>
      <!-- Logout -->
      <span v-else @click="logout()">
        <Logout class="w-10 mx-auto" />
        <button>Logout</button>
      </span>
    </div>
  </nav>
</template>

<script>
import firebase from '../utilities/firebase'
import Home from '../../node_modules/heroicons/vue/outline/Home'
import Calendar from '../../node_modules/heroicons/vue/outline/Calendar'
import LightningBolt from '../../node_modules/heroicons/vue/outline/LightningBolt'
import Code from '../../node_modules/heroicons/vue/outline/Code'
import ChevronDoubleRight from '../../node_modules/heroicons/vue/outline/ChevronDoubleRight'
import Calculator  from '../../node_modules/heroicons/vue/outline/Calculator'
import Cash from '../../node_modules/heroicons/vue/outline/Cash'
import Chat  from '../../node_modules/heroicons/vue/outline/Chat'
import Login  from '../../node_modules/heroicons/vue/outline/Login'
import Logout  from '../../node_modules/heroicons/vue/outline/Logout'
import UserGroup  from '../../node_modules/heroicons/vue/outline/UserGroup'

export default {
  data() {
    return {
      list: [
        {title: 'Home', to: '/', icon: Home, color: ' home-color '},
        {title: 'Calendar', to: '/calen', icon: Calendar, color: 'purple'},
        {title: 'Heroes', to: '/heroes', icon: LightningBolt, color: 'pink'},
        {title: 'Markdown', to: '/markdown', icon: Code, color: 'green'},
        {title: 'Slider', to: '/slider', icon: ChevronDoubleRight, color: 'yellow'},
        {title: 'Calculator', to: '/calculator', icon: Calculator, color: 'red'},
        {title: 'Modals', to: '/modals', icon: Cash, color: 'blue'},
        {title: 'Chat', to: '/chat', icon: Chat, color: 'indigo'},
        {title: 'UserCrud', to: '/user-crud', icon: UserGroup, color: 'green'},
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
  },
  components: {
    Home,
    Calendar,
    LightningBolt,
    Code,
    ChevronDoubleRight,
    Calculator,
    Cash,
    Chat,
    Login,
    Logout
  }
}
</script>

<style lang="scss">
  nav.primary-nav {
    position: fixed;
    height: 100vh;
    width: 150px;
    .home-color {
      &:hover {
        color: #3ebfc7;
      }
    }
    span {
      font-size: 0.9rem;
    }
    svg {
      path {
        fill: transparent;
        stroke-width: 1px;
      }
    }
  }
</style>