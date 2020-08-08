<template>
  <div class="container amplify-container">
    <amplify-authenticator>
      <amplify-sign-up
        slot="sign-up"
        username-alias="email"
        :form-fields.prop="formFields"
      ></amplify-sign-up>
    </amplify-authenticator>
  </div>
</template>

<style lang="scss">
:root {
  --amplify-primary-color: #40bde7;
  --amplify-primary-tint: #c4cccc;
  --amplify-primary-shade: #55595c;
}

// // FIXME: Fix scss loader so we can grab this value from variables file
// $corpliteBlue: #40bde7;
// $corpliteGrey: #c4cccc;

// button[class^='Button'],
// button[class^='Button']:active {
//   background-color: $corpliteBlue;
// }

// // Override the AWS buttons
// button[class^='Button__button'] {
//   border-radius: 50px;
// }

// button[class^='Button__button'],
// button[class^='Button__button']:active {
//   background-color: $corpliteBlue;
// }

// button[class^='Button__button']:visited,
// button[class^='Button__button']:focus {
//   background-color: $corpliteGrey;
// }

// // Override AWS anchor text
// a[class^='Anchor__'] {
//   color: $corpliteBlue;
// }

// // Override AWS error message
// .error {
//   padding: 0.5em 0em;
//   background: none;
// }
</style>

<script>
import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignUp,
} from '@aws-amplify/ui-vue';

export default {
  name: 'MyComponent',
  props: [],
  data() {
    return {
      formFields: [
        {
          type: 'email',
          label: 'Email',
          placeholder: 'email@yourbusiness.com',
          required: true,
        },
        {
          type: 'password',
          label: 'Password',
          placeholder: 'Enter your password',
          required: true,
        },
        {
          type: 'custom:businessName',
          label: 'Business Name',
          placeholder: 'e.g. Your Business Pty Ltd',
          required: true,
        },
        {
          type: 'address',
          label: 'Business Address',
          placeholder: 'e.g. 92 Murphey St, Collingwood',
          required: true,
        },
        {
          type: 'custom:postcode',
          label: 'Postcode',
          placeholder: 'e.g. 3000',
          required: true,
        },
        {
          type: 'custom:state',
          label: 'State',
          placeholder: 'e.g. VIC, NSW, QLD, ACT, NT, WA, TAS',
          required: true,
        },
      ],
    };
  },
};
</script>
