import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from 'vue-clerk'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('../views/Landing.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/dashboard',
      component: () => import('../layouts/DashboardLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'events',
          component: () => import(/* webpackChunkName: "events" */ '../views/EventList.vue')
        },
        {
          path: 'create',
          name: 'create',
          component: () => import(/* webpackChunkName: "events" */ '../views/EventCreate.vue')
        },
        {
          path: 'preview/:id',
          name: 'preview',
          component: () => import(/* webpackChunkName: "events" */ '../views/Preview.vue')
        },
        // Separate chunk for presenter management
        {
          path: 'presenters',
          name: 'presenters',
          component: () => import(/* webpackChunkName: "presenters" */ '../views/Presenters.vue')
        },
        // Separate chunk for settings and logos
        {
          path: 'settings',
          name: 'settings',
          component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue')
        },
        {
          path: 'logos',
          name: 'logos',
          component: () => import(/* webpackChunkName: "settings" */ '../views/LogoManager.vue')
        }
      ]
    },
    {
      path: '/invite/:id',
      name: 'invitation',
      component: () => import('../views/EventInvitation.vue'),
      meta: { requiresAuth: false }
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
