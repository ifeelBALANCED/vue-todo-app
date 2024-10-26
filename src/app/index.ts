import { createApp } from 'vue'
import App from './App.vue'
import { store } from './providers'

export const application = createApp(App)

application.use(store)
