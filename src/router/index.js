import Vue from 'vue';
import Buefy from 'buefy';
import Router from 'vue-router';
import * as AmplifyModules from 'aws-amplify';
import { Hub, Logger } from 'aws-amplify';
import '@mdi/font/css/materialdesignicons.css';
import '@aws-amplify/ui-vue';

import routes from './routes';
import BusinessService from '@/services/business.service';
import AuthService from '@/services/auth.service';
import UserService from '@/services/user.service';
import AmplifyStore from '../store/store';

Vue.use(Router);
Vue.use(Buefy, { defaultIconPack: 'mdi' });
Vue.use(AmplifyModules);
const logger = new Logger('My-Logger');

const listener = async (data) => {
  switch (data.payload.event) {
    case 'signIn':
      AmplifyStore.commit('setUser', await AuthService.getUser());
      if (UserService.isProfileFilled(AmplifyStore.getters.user)) {
        router.push({ path: '/' });
      } else {
        router.push({ path: '/profile' });
      }
      logger.debug('user signed in');
      break;
    case 'signUp':
      logger.debug('user signed up');
      break;
    case 'signOut':
      logger.debug('user signed out');
      AmplifyStore.commit('setUser', null);
      router.push({ path: '/auth' });
      break;
    case 'signIn_failure':
      logger.debug('user sign in failed');
      break;
    case 'configured':
      logger.debug('the Auth module is configured');
      break;
    default:
      logger.debug(`Unknown event: ${data.payload.event}`);
  }
};
Hub.listen('auth', listener);

const router = new Router({
  mode: 'history',
  routes: routes,
});

router.beforeResolve(async (to, from, next) => {
  const user = await AuthService.getUser();
  AmplifyStore.commit('setUser', user);
  if (user) {
    const business = await BusinessService.getBusiness(user.username);
    AmplifyStore.commit('setBusiness', business);
  }

  // Check if user is still authenticated before navigation
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // User not authenticated
    if (!AmplifyStore.getters.user) {
      return next({
        path: '/auth',
        query: {
          redirect: to.fullPath,
        },
      });
    }
  }

  // User has not filled out profile fully
  if (to.matched.some((record) => record.meta.requiresProfile)) {
    const profileFilled = UserService.isProfileFilled(
      AmplifyStore.getters.user,
    );
    if (!profileFilled) {
      return next({
        path: '/profile',
        query: {
          redirect: to.fullPath,
        },
      });
    }
  }
  return next();
});

export default router;
