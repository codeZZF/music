import "./assets/font-awesome-4.7.0/css/font-awesome.min.css"
import 'babel-polyfill'
import { createApp } from 'vue'
import App from './App.vue'
import mitt from "mitt"
const app = createApp(App)
app.config.globalProperties.$bus = mitt()
app.mount('#app')
