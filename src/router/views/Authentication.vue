<template>
  <div class="container amplify-container">
    <amplify-authenticator username-alias="email">
      <SignUp slot="sign-up"></SignUp>
    </amplify-authenticator>
  </div>
</template>

<style lang="scss">
:root {
  --amplify-primary-color: #40bde7;
  --amplify-primary-tint: #c4cccc;
  --amplify-primary-shade: #55595c;
}
</style>

<script>
import SignUp from '@/components/SignUp';

export default {
  name: 'Auth',
  components: { SignUp },
  props: [],
};
</script>
