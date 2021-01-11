<template>
  <section>
    <div
      class="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-tr from-purple-800 to-purple-400"
    >
      <div class="flex justify-center">
        <button
          class="prev p-2 text-pink-500 bg-gray-800 -left-20 w-16 h-16 rounded my-auto top-0 bottom-0"
          @click="isModalOpen = !isModalOpen"
          :disabled="false"
          :class="true ? 'hover:text-green-400' : ''"
        >
          <UserAdd />
        </button>
      </div>

      <div
        class="rounded relative bg-gray-800 border-gray-800 text-white m-4 md:w-6/12 mx-auto"
      >
        <button
          class="prev text-pink-500 bg-gray-800 -left-20 w-16 h-16 rounded absolute my-auto top-0 bottom-0"
          @click="prev"
          :disabled="isFirstPage"
          :class="!isFirstPage ? 'hover:text-green-400' : ''"
        >
          <ChevronLeft />
        </button>

        <button
          class="next text-pink-500 bg-gray-800 -right-20 w-16 h-16 rounded absolute my-auto top-0 bottom-0"
          @click="next"
          :disabled="isLastPage"
          :class="!isLastPage ? 'hover:text-green-400' : ''"
        >
          <ChevronRight />
        </button>

        <table class="w-full">
          <thead class="bg-pink-500">
            <tr>
              <th class="p-3 text-center">ID</th>
              <th class="p-3 text-center">Avatar</th>
              <th class="p-3 text-center">First Name</th>
              <th class="p-3 text-center">Last Name</th>
              <th class="p-3 text-center">Email</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(user, userIndex) in state.users" :key="user._id">
              <td class="p-3 bg-gray-700 relative group">
                <span class="group-hover:opacity-0 transition-opacity">{{ user._id.substring(0, 4) + '...' }}</span>
                <XCircle class="absolute cursor-pointer m-auto w-10 opacity-0 transition-all group-hover:opacity-100 fill-black h-10 text-pink-500 rounded-full top-0 bottom-0 left-0 right-0 hover:text-green-400" @click="removeEl(user._id, userIndex)" />
              </td>
              <td class="p-3">
                <avataaars></avataaars>
              </td>
              <td class="p-3">{{ user.first_name }}</td>
              <td class="p-3">{{ user.last_name }}</td>
              <td class="p-3">{{ user.email }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
  <teleport to="body">
    <Modal
      v-if="isModalOpen"
      @toggle-login-modal="isModalOpen = false"
      class="bg-black"
    >
      <template #title>
        <span class="text-pink-500 text-4xl"> Add New User </span>
      </template>
      <template #text>
        <form @submit.prevent="submit" id="addNewUs" class="pt-3 text-2xl text-pink-500">
          
          <div class="py-2 mb-1">
            <label for="first_name" class="mb-2 hidden"> Name </label>
            <input
              type="text"
              name="first_name"
              class="p-3 rounded w-full bg-gray-700 outline-none border-2 border-gray-700 hover:border-pink-500 focus:border-pink-500  "
              placeholder="First Name"
              v-model="state.form.first_name"
            />
          </div>
          
          <div class="py-2 mb-1">
            <label for="last_name" class="mb-2 hidden"> Name </label>
            <input
              type="text"
              name="last_name"
              class="p-3 rounded w-full bg-gray-700 outline-none border-2 border-gray-700 hover:border-pink-500 focus:border-pink-500  "
              placeholder="Last Name"
              v-model="state.form.last_name"
            />
          </div>
          
          <div class="py-2 mb-1">
            <label for="email" class="mb-2 hidden"> Email </label>
            <input
              type="text"
              name="email"
              class="p-3 rounded w-full bg-gray-700 outline-none border-2 border-gray-700 hover:border-pink-500 focus:border-pink-500   "
              placeholder="@"
              v-model="state.form.email"
            />
          </div>

          <button
            class="prev p-2 hover:text-green-400 hover:border-green-400 text-pink-500 bg-gray-800 mh-16 rounded my-auto w-full flex items-center justify-center border-pink-500 border-2 border-solid"
            type="submit"
          >
            <UserAdd class="max-h-10 w-10 mr-2" />
            <div>Add User!</div>
          </button>



        </form>
      </template>
    </Modal>
  </teleport>
</template>

<script>
import { computed, onMounted, reactive, ref } from "vue";
import axios from "../plugins/axios";
import ChevronLeft from "../../node_modules/heroicons/vue/outline/ChevronLeft";
import ChevronRight from "../../node_modules/heroicons/vue/outline/ChevronRight";
import XCircle from "../../node_modules/heroicons/vue/outline/XCircle";
import UserAdd from "../../node_modules/heroicons/vue/outline/UserAdd";
import Modal from "../components/Modal";
import avataaars from "../../node_modules/vuejs-avataaars/src/Avataaars";
axios.defaults.baseURL = 'https://crudcrud.com/api/c5352e3eee6f4dd9a8060bbcedcb7548'
export default {
  setup() {
    const isModalOpen = ref(false);

    const state = reactive({
      // randomAvatarNumber: Math.floor(Math.random() * 12) + 1,
      users: [],
      page: 1,
      form: {
        first_name: '',
        last_name: '',
        email: '',
      }
    });

    const isLastPage = computed(() => state.page === 1);
    const isFirstPage = computed(() => state.page === 1);

    onMounted(async () => {
      const { data } = await axios.get("/users");
      state.users = data;
    });

    async function next() {
      if (!isLastPage.value) {
        const { data } = await axios.get("/users?page=" + (state.page + 1));
        state.users = data;
      }
    }

    async function prev() {
      if (!isFirstPage.value) {
        const { data } = await axios.get("/users?page=1");
        state.users = data;
      }
    }
    
    async function submit() {
      const {data}      = await axios.post('/users', state.form)
      state.users.push(data)
      isModalOpen.value = false
      state.form.email, state.form.first_name, state.form.last_name, state.form.avatar = ''
    }
    
    async function removeEl(id, userIndex) {
      await axios.delete('/users/'+id)
      state.users.splice(userIndex, 1);
      // state.users.push(data)
      // isModalOpen.value = false
      // state.form.email, state.form.first_name, state.form.last_name, state.form.avatar = ''
    }

    return {
      state,
      next,
      prev,
      ChevronLeft,
      ChevronRight,
      XCircle,
      isFirstPage,
      isLastPage,
      Modal,
      UserAdd,
      isModalOpen,
      submit,
      removeEl,
      avataaars
    };
  },
};
</script>

<style lang="scss">
button[disabled] {
  opacity: 0.4;
  cursor: default;
}
table {
  th:first-child,
  tr:first-child {
    width: 40px;
  }
  th:nth-child(2),
  tr:nth-child(2),
  th:nth-child(3),
  tr:nth-child(3),
  th:nth-child(4),
  tr:nth-child(4) {
    width: 110px;
  }
}
.modalBackground {
  .bg-white {
    background-color: rgba(31, 41, 55, var(--tw-bg-opacity));
    footer {
      display: none;
    }
  }
}
.blur {
  filter: blur(.5)
}
.fill-black {
  fill: theme('colors.gray.900')
}
</style>