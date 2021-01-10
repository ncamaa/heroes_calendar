// import VueRouter from 'vue-router'
import {createRouter, createWebHistory} from 'vue-router'
import Heroes from './pages/Heroes'
import Calen from './pages/Calen'
import Home from './pages/Home'
import Markdown from './pages/Markdown'
import Slider from './pages/Slider'
import Calc from './pages/Calc'
import Modals from './pages/Modals'
import Chat from './pages/Chat'
import UserCrud from './pages/UserCrud'

const routes = [
  { path: '/',       component:Home },
  { path: '/heroes', component:Heroes },
  { path: '/calen',  component:Calen },
  { path: '/markdown',  component:Markdown },
  { path: '/slider',  component:Slider },
  { path: '/calculator',  component:Calc },
  { path: '/modals',  component:Modals },
  { path: '/chat',  component:Chat },
  { path: '/user-crud',  component:UserCrud },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;