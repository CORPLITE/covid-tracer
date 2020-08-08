import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    business: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setBusiness(state, business) {
      state.business = business;
    },
  },
  getters: {
    user: (state) => {
      return state.user;
    },
    business: (state) => {
      return state.business;
    },
    shortId: (state) => {
      return _.get(state, 'business.shortId', null);
    },
    identBusinessName: (state) => {
      return _.get(state, "user.attributes['custom:businessName']", null);
    },
    identBusinessId: (state) => {
      return _.get(state, 'user.username', null);
    },
    authGroups: (state) => {
      return _.get(
        state,
        "user.signInUserSession.accessToken.payload['cognito:groups']",
        null,
      );
    },
    traceFormUrl: () => {
      const shortId = store.getters.shortId;
      const businessId = store.getters.identBusinessId;
      const businessName = store.getters.identBusinessName;

      return shortId
        ? encodeURI(`${window.location.origin}/qr/${shortId}`)
        : encodeURI(
            `${window.location.origin}/trace?id=${businessId}&business=${businessName}`,
          );
    },
  },
});

export default store;
