import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      isUserLoggedIn: false,
      showLoginModal: false,
      currentUser: {},
    }
  },
  mutations: {
    setShowLoginModal(state, payload) {
      state.showLoginModal = payload
    },
    setIsLoggedIn(state, payload) {
      state.isUserLoggedIn = payload
    },
    setCurrentUser(state, payload) {
      state.currentUser = payload
    },
    toggleLoginModal(state) {
      state.showLoginModal = !state.showLoginModal
    }
  }
})

export default store