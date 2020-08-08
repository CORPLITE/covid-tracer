import Vue from 'vue';
import App from './App';
import router from './router';
import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue';
import awsconfig from './aws-exports';
import VueGtag from 'vue-gtag';

import './lib/validation';
import i18n from './i18n';

Vue.config.productionTip = false;

Amplify.configure(awsconfig);

Vue.use(VueGtag, {
  config: { id: 'AW-704179989' },
});

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  router: router,
  components: {
    App,
  },
  template: '<App/>',
});
