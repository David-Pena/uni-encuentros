import { createApp } from 'vue'
import { clerkPlugin } from 'vue-clerk'
import './style.css'
import App from './App.vue'
import router from './router'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const app = createApp(App)

app.use(clerkPlugin, {
  publishableKey: PUBLISHABLE_KEY
})
app.use(router)
app.mount('#app')