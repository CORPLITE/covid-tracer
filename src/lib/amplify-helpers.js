// https://github.com/aws-amplify/amplify-js/blob/master/packages/amplify-ui-components/src/common/helpers.ts

import { Hub } from '@aws-amplify/core';
import {
  UI_AUTH_CHANNEL,
  TOAST_AUTH_ERROR_EVENT,
  AUTH_STATE_CHANGE_EVENT,
} from './amplify-const';

export const dispatchToastHubEvent = (error) => {
  Hub.dispatch(UI_AUTH_CHANNEL, {
    event: TOAST_AUTH_ERROR_EVENT,
    message: error.message,
  });
};

export const dispatchAuthStateChangeEvent = (nextAuthState, data) => {
  Hub.dispatch(UI_AUTH_CHANNEL, {
    event: AUTH_STATE_CHANGE_EVENT,
    message: nextAuthState,
    data,
  });
};

export const AuthState = {
  SignUp: 'signup',
  SignOut: 'signout',
  SignIn: 'signin',
  Loading: 'loading',
  SignedOut: 'signedout',
  SignedIn: 'signedin',
  SigningUp: 'signingup',
  ConfirmSignUp: 'confirmSignUp',
  confirmingSignUpCustomFlow: 'confirmsignupcustomflow',
  ConfirmSignIn: 'confirmSignIn',
  confirmingSignInCustomFlow: 'confirmingsignincustomflow',
  VerifyingAttributes: 'verifyingattributes',
  ForgotPassword: 'forgotpassword',
  ResetPassword: 'resettingpassword',
  SettingMFA: 'settingMFA',
  TOTPSetup: 'TOTPSetup',
  CustomConfirmSignIn: 'customConfirmSignIn',
  VerifyContact: 'verifyContact',
};
