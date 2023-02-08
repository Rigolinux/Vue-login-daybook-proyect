import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import daybookRoutes from '@/modules/daybook/router'
import authRoutes from '@/modules/auth/router'
import isAuthenticatedGuard from './auth-guard';
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  {
    path: '/daybook',
    
    beforeEnter: [ isAuthenticatedGuard ],
    ...daybookRoutes
  },
  {
    path:'/auth',
    ...authRoutes
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
