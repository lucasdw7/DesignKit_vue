import { createApp } from 'vue'  
import './style.css'           
import App from './App.vue'      
import router from './router'    
// initialisationn de firebase au démarage
import './environments/firebase'


createApp(App)
  .use(router)    
  .mount('#app')
