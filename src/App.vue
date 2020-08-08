<template>
  <div id="app">
    <v-menu :hide-nav-bar-items="hideNavBarItems" />
    <section class="main-content">
      <div class="container">
        <router-view />
      </div>
    </section>
    <v-footer />
  </div>
</template>

<script>
import Vue from 'vue';
import Menu from '@/components/layout/menu';
import Footer from '@/components/layout/footer';
import { ValidationProvider } from 'vee-validate';

Vue.component('v-menu', Menu);
Vue.component('v-footer', Footer);
Vue.component('ValidationProvider', ValidationProvider);

window.LOG_LEVEL = 'VERBOSE';

export default {
  name: 'App',
  computed: {
    hideNavBarItems: function () {
      const invalidRoutes = ['/trace', '/auth', '/qr/*'];
      // Used to match with /qr/* endpoint
      if (this.$route.matched[0]) {
        return invalidRoutes.includes(this.$route.matched[0].path);
      }
      return invalidRoutes.includes(this.$route.path);
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.pre {
  background: #f8f8f8;
}

.lineBreak {
  height: 0;
  border-bottom: 1px solid #ededed;
  margin: 1em 10%;
}
.form {
  display: inline-block;
  width: 320px;
}

@media only screen and (max-width: 1023px) {
  .form {
    width: 100%;
  }
}

inputRow {
  display: block;
  margin-top: 0.5em;
}
.input {
  width: 100%;
  font-size: 1em;
  padding: 0.5em;
  box-sizing: border-box;
  outline: none;
  border: none;
  border-bottom: 2px solid #2196f3;
}
.inputLabel {
  display: block;
  text-align: left;
}
.actionRow {
  display: flex;
  margin-top: 0.5em;
  text-align: right;
}
.action {
  font-size: 1em;
  border: none;
  outline: none;
  padding: 12px 50px;
  background-color: #ededed;
  cursor: pointer;
}

.link {
  text-decoration: underline;
  cursor: pointer;
}
.error {
  background: orange;
  padding: 0.5em;
}

.item {
  font-weight: 500;
  padding: 0 0.5em;
  cursor: pointer;
}

.avatar {
  max-height: 150px;
}

.avatar-pic {
  max-height: 100px;
}

/* accordion */
.message {
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.message-header {
  cursor: pointer;
}

.message-body {
  padding: 0;
  max-height: 50em;
  width: 100%;
  overflow: hidden;
  transition: 0.3s ease all;
}

.is-closed .message-body {
  max-height: 0;
}
</style>

<style lang="scss">
@import '../static/css/buefy.scss';
</style>
