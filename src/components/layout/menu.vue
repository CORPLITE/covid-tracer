<template>
  <b-navbar
    spaced
    wrapper-class="container navbar-container"
    :mobile-burger="!hideNavBarItems"
  >
    <template slot="brand">
      <div class="nav-logo" @click="home">
        <img src="/static/Logo-White-PNG.png" alt="Covid Tracer" />
      </div>
    </template>
    <template v-if="user && !hideNavBarItems" slot="start">
      <b-navbar-item icon="link" label="My Business" @click="home">{{
        $t('message.home')
      }}</b-navbar-item>
      <b-navbar-item icon="link" label="Tracing Data" @click="tracingData">{{
        $t('message.tracingData')
      }}</b-navbar-item>
    </template>
    <template v-if="user && !hideNavBarItems" slot="end">
      <b-navbar-item tag="div">
        <a class="button is-secondary" @click="profile">{{
          $t('message.profile')
        }}</a>
      </b-navbar-item>

      <b-navbar-item tag="div">
        <a class="button is-primary" @click="signOut">{{
          $t('message.signOut')
        }}</a>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { Auth } from 'aws-amplify';
import AmplifyStore from '@/store/store';

export default {
  name: 'Menu',
  props: {
    hideNavBarItems: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    user() {
      return AmplifyStore.state.user;
    },
  },
  methods: {
    routeTo: function (routeName) {
      // We need to catch error as vue router will throw an error if user tries to route to the same webpage
      // See: https://github.com/vuejs/vue-router/issues/2881#issuecomment-520554378
      this.$router.push(routeName).catch((e) => e);
    },
    home: function () {
      this.routeTo('/');
    },
    notes: function () {
      this.routeTo('/notes');
    },
    tracingData: function () {
      this.routeTo('/tracing-data');
    },
    profile: function () {
      this.routeTo('/profile');
    },
    signOut: async function () {
      await Auth.signOut();
      this.$router.go();
    },
  },
};
</script>
