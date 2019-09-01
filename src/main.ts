import { isUserLoggedin } from '@/genill/core/Users/signin/signin.getters';
import Vue from 'vue';
import VueRouter from 'vue-router';
// @ts-ignore
import App from './App.vue';
import userRoutes from './genill/core/Users/user.routes';
import store from './store/store';
import Vuelidate from 'vuelidate';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

// Vuelidate for Show error
Vue.use(Vuelidate);

// Route Config
Vue.config.productionTip = false;
Vue.use(VueRouter);
export const router = new VueRouter({
  mode: 'history',
  routes: userRoutes,
});

// Route Guard
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isUserLoggedin()) {
      next('/login');
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    if (isUserLoggedin()) {
      next('/profile');
    } else {
      next();
    }
  } else {
    next();
  }
});

// Global Component Register here
const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/,
);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1'),
    ),
  );

  Vue.component(
    componentName,
    componentConfig.default || componentConfig,
  );
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
