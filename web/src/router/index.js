import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PlannerForm from '@/views/PlannerForm.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/planner',
    name: 'PlannerForm',
    component: PlannerForm
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
