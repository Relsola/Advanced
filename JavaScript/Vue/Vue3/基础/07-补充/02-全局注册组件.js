import { createApp } from 'vue';
import App from './App.vue';
import Root from './Root.vue';
import Base from "./components/Base.vue";

// createApp 可以创建多个根示例
createApp(App).mount('#app');

// 全局创建组件
const root = createApp(Root);
root.component("Base", Base);

root.mount('#root');