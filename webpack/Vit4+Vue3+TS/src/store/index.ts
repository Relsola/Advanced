import { createPinia } from 'pinia';
import { App } from 'vue';

const store = createPinia();

const install = (app: App): void => {
  app.use(store);
};
export default { install };
