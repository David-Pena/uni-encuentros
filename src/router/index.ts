import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from 'vue-clerk'
import Landing from '../views/Landing.vue'
import EventList from '../views/EventList.vue'
import EventCreate from '../views/EventCreate.vue'
import EventPreview from '../views/EventPreview.vue'
import Presenters from '../views/Presenters.vue'
import LogoManager from '../views/LogoManager.vue'
import Settings from '../views/Settings.vue'
import Profile from '../views/Profile.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing,
      meta: { requiresAuth: false }
    },
    {
      path: '/dashboard',
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'events',
          component: EventList
        },
        {
          path: 'create',
          name: 'create',
          component: EventCreate
        },
        {
          path: 'preview/:id',
          name: 'preview',
          component: EventPreview
        },
        {
          path: 'presenters',
          name: 'presenters',
          component: Presenters
        },
        {
          path: 'logos',
          name: 'logos',
          component: LogoManager
        },
        {
          path: 'settings',
          name: 'settings',
          component: Settings
        },
        {
          path: 'profile',
          name: 'profile',
          component: Profile
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  const { isSignedIn } = useAuth()
  
  if (to.meta.requiresAuth && !isSignedIn.value) {
    return { name: 'landing' }
  }
  
  if (isSignedIn.value && to.name === 'landing') {
    return { name: 'events' }
  }
})

export default router