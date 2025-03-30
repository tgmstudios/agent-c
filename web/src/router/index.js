import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PlannerForm from '@/views/PlannerForm.vue'
import ScheduleView from '@/views/ScheduleView.vue'

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
  },
  {
    path: '/schedule',
    name: 'Schedule',
    component: ScheduleView
  },
  {
    path: '/schedule/:pathId',
    name: 'ScheduleWithId',
    component: ScheduleView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
