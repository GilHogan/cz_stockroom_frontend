import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import '@/styles/index.scss'
import '@/assets/icons' // 引入svg
import SvgIcon from '@/components/svg-icon/SvgIcon.vue'

const app = createApp(App).component('svg-icon', SvgIcon);
installElementPlus(app);
app.use(store).use(router).mount('#app');
