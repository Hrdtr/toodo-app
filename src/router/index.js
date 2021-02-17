import { createRouter, createWebHistory } from '@ionic/vue-router';
import { store } from '../store';
import Login from '../views/Login.vue'
import Tabs from '../views/Tabs.vue'

const isLoggedIn = store.state.isLoggedIn

const routes = [
  {
    path: '/',
    redirect: '/tabs/tab1',
  },
  {
    path: '/login',
    component: Login,
    beforeEnter: () => {
      if (isLoggedIn) return '/tabs/tab1'
      else return
    },
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1.vue'),
      },
      {
        path: 'tab1/:id',
        component: () => import('@/views/ProjectDetail.vue'),
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    if (!isLoggedIn) return '/login'
    else return
  }
  else return
})

export default router
