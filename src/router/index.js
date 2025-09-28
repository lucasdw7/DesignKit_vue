import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
   {
    path: '/colors',
    name: 'Colors',
    component: () => import('../views/ColorPage.vue')
  },
  {
    path: '/typeScale',
    name: 'TypeScale',
    component: () => import('../views/TypoPage.vue')
  },
  {
    path: '/project',
    name: 'project',
    component: () => import('../views/ProjectPage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
