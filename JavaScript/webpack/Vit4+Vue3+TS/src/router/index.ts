// src/router/index.ts
import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

const install = (app: App): void => {
  app.use(router);
};

export default { install };
