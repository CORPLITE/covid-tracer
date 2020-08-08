<template>
  <amplify-form-section
    :header-text="headerText"
    test-data-prefix="sign-up-form"
    @submit.prevent="signUp"
    @keyup.enter="signUp"
  >
    <b-field :label="emailAddress">
      <b-input
        v-model="signUpFields.email.value"
        :placeholder="signUpFields.email.placeholder"
        type="email"
      />
    </b-field>

    <b-field :label="password">
      <b-input
        v-model="signUpFields.password.value"
        type="password"
        :placeholder="signUpFields.password.placeholder"
      />
    </b-field>
    <b-field>
      <b-input
        v-model="signUpFields.passwordConfirm.value"
        type="password"
        :placeholder="signUpFields.passwordConfirm.placeholder"
      />
    </b-field>
    <div slot="amplify-form-section-footer" class="sign-up-form-footer">
      <slot name="footer">
        <slot name="secondary-footer-content">
          <span>
            {{ haveAccountText }}{{ ' ' }}
            <amplify-button
              variant="anchor"
              data-test="sign-up-sign-in-link"
              @click="handleAuthStateChangeSignIn"
              >{{ signInText }}</amplify-button
            >
          </span>
        </slot>
        <slot name="primary-footer-content">
          <amplify-button
            data-test="sign-up-create-account-button"
            @click="signUp"
          >
            <amplify-loading-spinner
              :style="{ display: loading ? 'initial' : 'none' }"
            />
            <span :style="{ display: loading ? 'none' : 'initial' }">{{
              submitButtonText
            }}</span>
          </amplify-button>
        </slot>
      </slot>
    </div>
  </amplify-form-section>
</template>

<style lang="scss">
// Copied from https://github.com/aws-amplify/amplify-js/blob/master/packages/amplify-ui-components/src/components/amplify-input/amplify-input.scss
.input {
  display: block;
  width: 100%;
  padding: 1rem;
  font-size: var(--amplify-text-sm);
  color: var(--color);
  background-color: var(--background-color);
  background-image: none;
  border: 1px solid var(--border-color);
  border-radius: 3px;
  box-sizing: border-box;
  margin: 0px;
  --color: var(--amplify-secondary-color);
  --background-color: var(--amplify-secondary-contrast);
  --border-color: var(--amplify-light-grey);
  --border-color-focus: var(--amplify-primary-color);
  height: 3.125rem;

  &:focus {
    outline: none;
    border-color: var(--border-color-focus);
  }

  &:disabled {
    opacity: 0.5;
  }

  &::placeholder {
    color: #787878;
  }
}

label {
  &.label {
    font-size: var(--amplify-text-sm);
    font-weight: 400;
  }
}

.field {
  margin-bottom: 15px !important;
}

.sign-up-form-footer {
  font-family: var(--footer-font-family);
  font-size: var(--footer-size);
  color: #828282;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: space-around;
}

@media (min-width: 672px) {
  .sign-up-form-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
  }
}
</style>

<script>
import { Auth } from '@aws-amplify/auth';
import { Logger } from 'aws-amplify';

import { I18n } from '@aws-amplify/core';
I18n.setLanguage('en');

// TODO: Extract this out into it's own locale folder
const dict = {
  en: {
    headerText: 'Create a new account',
    submitButtonText: 'Create Account',
    haveAccountText: 'Have an account?',
    signInText: 'Sign in here',
    usernameAlias: 'email',
    enterPassword: 'Enter your password',
    passwordConfirm: 'Confirm your password',
    passwordConfirmMessage: 'Please make sure your passwords match',
    errorEmail: 'Email cannot be empty',
    errorPassword: 'Password field cannot be empty',
    passwordLenth: 'Password must be at least 6 characters long',
    emailAddress: 'Email Address',
    password: 'Password',
  },
  ru: {
    headerText: 'Создать новый аккаунт',
    submitButtonText: 'Создать Аккаунт',
    haveAccountText: 'Есть Аккаунт?',
    signInText: 'Войти здесь',
    usernameAlias: 'Электронная почта',
    enterPassword: 'Введите ваш пароль',
    passwordConfirm: 'Подтвердите ваш пароль',
    passwordConfirmMessage: 'Пожалуйста, убедитесь, что пароли совпадают',
    errorEmail: 'Электронная почта обязательна',
    errorPassword: 'Пароль обязателен',
    passwordLenth: 'Пароль должен содержать не менее 6 символов',
    emailAddress: 'Электронная почта',
    password: 'Пароль',
    'Sign In': 'Войти',
    'Sign Up': 'Зарегистрироваться',
    'Sign Out': 'Выйти',
    'Sign in to your account': 'Войдите в свой аккаунт',
    'Email Address *': 'Электронная почта *',
    'Password *': 'Пароль *',
    'Enter your email address': 'Введите вашу электронную почту',
    'Enter your password': 'Введите ваш пароль',
    'No account?': 'Впервые в COVIDTracer? ',
    'Forgot your password?': 'Забыли пароль? ',
    'Reset password': 'Сбросить пароль',
    'Reset your password': 'Сбросить пароль',
    'User does not exist': 'Пользователь не существует',
    'User already exists': 'Пользователь уже существует',
    'Incorrect username or password': 'Неверная электронная почта или пароль',
    'Invalid password format': 'Неверный формат пароля',
    'Create account': 'Создать Аккаунт',
    'Back to Sign In': 'Вернуться в Войти',
    'Send Code': 'Отправить Код',
    'Confirm Sign up': 'Подтвердить регистрацию',
    'Confirmation Code': 'Код подтверждения',
    'Enter your code': 'Введите ваш код',
    Confirm: 'Подтвердить',
    'Lost your code?': 'Потеряли код?',
    'Resend Code': 'Отправить код еще раз',
    'Username cannot be empty': 'Имя пользователя не может быть пустым',
    'Custom auth lambda trigger is not configured for the user pool.':
      'Пользовательский лямбда-триггер аутентификации не настроен для пула пользователей.',
    'User does not exist.': 'Пользователь не существует.',
    'Incorrect username or password.': 'Неверное имя пользователя или пароль.',
    'Username/client id combination not found.':
      'Не найдено сочетание имени пользователя и идентификатора клиента.',
    'Verification code': 'Код подтверждения',
    'Enter code': 'Введите пароль',
    'New password': 'Новый пароль',
    'Enter your new password': 'Введите ваш новый пароль',
    Submit: 'Отправить',
    'Password cannot be empty': 'Пароль обязателен',
    'Confirmation code cannot be empty': 'Код подтверждения обязателен',
    'Username should be an email.':
      'Имя пользователя должно быть электронной почтой.',
  },
  zh: {
    headerText: '创建新帐户',
    submitButtonText: '创建帐户',
    haveAccountText: '有一个帐户吗？',
    signInText: '在这里登录',
    usernameAlias: '电子邮件',
    enterPassword: '输入密码',
    passwordConfirm: '确认密码',
    passwordConfirmMessage: '请确保密码匹配',
    errorEmail: '需要电子邮件',
    errorPassword: '需要密码',
    passwordLenth: '密码必须至少包含6个字符',
    emailAddress: '电子邮件',
    password: '密码',
    'Sign In': '登录',
    'Sign Up': '注册',
    'Sign Out': '退出',
    'Sign in to your account': '登录到您的帐户',
    'Email Address *': '电子邮件 *',
    'Password *': '密码 *',
    'Enter your email address': '输入您的电子邮件',
    'Enter your password': '输入密码',
    'No account?': 'COVIDTracer的新手？ ',
    'Forgot your password?': '忘记密码 ',
    'Reset password': '重置密码',
    'Reset your password': '重置密码',
    'User does not exist': '用户不存在',
    'User already exists': '用户已经存在',
    'Incorrect username or password': '无效的电子邮件或密码',
    'Invalid password format': '无效的密码格式',
    'Create account': '创建帐户',
    'Back to Sign In': '返回登录',
    'Send Code': '发送代码',
    'Confirm Sign up': '确认注册',
    'Confirmation Code': '确认代码',
    'Enter your code': '输入您的代码',
    Confirm: '确认',
    'Lost your code?': '遗失密码了吗?',
    'Resend Code': '再次重新发送代码',
  },
};
I18n.putVocabularies(dict);

import {
  dispatchToastHubEvent,
  AuthState,
  dispatchAuthStateChangeEvent,
} from '~/lib/amplify-helpers';

export default {
  name: 'SignUpForm',
  components: {},
  props: {
    headerText: { type: String, default: I18n.get('headerText') },
    submitButtonText: { type: String, default: I18n.get('submitButtonText') },
    haveAccountText: { type: String, default: I18n.get('haveAccountText') },
    signInText: { type: String, default: I18n.get('signInText') },
    usernameAlias: { type: String, default: I18n.get('usernameAlias') },
    emailAddress: { type: String, default: I18n.get('emailAddress') },
    password: { type: String, default: I18n.get('password') },
    handleAuthStateChange: {
      type: Function,
      default: dispatchAuthStateChangeEvent,
    },
  },
  data: () => {
    return {
      logger: {},
      loading: false,
      signUpFields: {
        email: { value: '', placeholder: 'email@yourbusiness.com' },
        password: { value: '', placeholder: I18n.get('enterPassword') },
        passwordConfirm: {
          value: '',
          placeholder: I18n.get('passwordConfirm'),
        },
      },
    };
  },
  computed: {
    signInState: function () {
      return AuthState.signInState;
    },
  },
  created() {
    this.logger = new Logger('SignUp_component');
  },
  methods: {
    handleAuthStateChangeSignIn() {
      this.handleAuthStateChange(AuthState.SignIn);
    },
    trackConfirmedSignUp() {
      this.$gtag.event('sign_up');
    },
    isValidPassword() {
      const { password, passwordConfirm } = this.signUpFields;

      // Valid Password length
      if (password.value.length < 6) {
        dispatchToastHubEvent({
          message: I18n.get('passwordLenth'),
        });
        return false;
      }

      // Passwords match
      if (password.value !== passwordConfirm.value) {
        dispatchToastHubEvent({
          message: I18n.get('passwordConfirmMessage'),
        });
        return false;
      }
      return true;
    },
    async signUp(Event) {
      const { email, password, passwordConfirm } = this.signUpFields;
      if (!this.isValidPassword()) {
        return;
      }

      const signUpAttributes = {
        username: email.value,
        password: password.value,
      };

      try {
        this.loading = true;
        const data = await Auth.signUp(signUpAttributes);
        this.loading = false;
        this.trackConfirmedSignUp();
        this.handleAuthStateChange(AuthState.ConfirmSignUp, {
          ...data.user,
          signUpAttrs: signUpAttributes,
        });
      } catch (error) {
        this.logger.debug(`Error SigningUp`, error);

        // TODO: Wait for @aws-amplify/ui-vue to allow for error message customisation.
        // Since we can't customise error messages in amplify ui
        switch (error.log) {
          case 'Username cannot be empty':
            error.message = I18n.get('errorEmail');
            break;
          case 'Password cannot be empty':
            error.message = I18n.get('errorPassword');
            break;
          default:
            break;
        }

        dispatchToastHubEvent(error);
        this.loading = false;
      }
    },
  },
};
</script>
