/**
 * This file contains all the validation rules that can be used for ValidationProvider
 *
 * See: https://vee-validate.logaretm.com/v2/guide/rules.html#validation-rules
 */
import { extend } from 'vee-validate';
import { required, numeric } from 'vee-validate/dist/rules';

import i18n from '../i18n';

extend('required', {
  ...required,
  message: (_, values) => i18n.t('validation.required', values),
});

extend('no_special_char', {
  validate: (value) => {
    // Allows full stops, dashes, commas and whitespace
    const noSpecialCharRegex = /[~`!@#$%^&*+=[\]\\';/{}|\\":<>?()_]/g;
    return !noSpecialCharRegex.test(value);
  },
  message: (_, values) => i18n.t('validation.no_special_char', values),
});

extend('numeric', {
  ...numeric,
  message: (_, values) => i18n.t('validation.numeric', values),
});

extend('length', {
  validate: (value, { length }) => {
    // NOTE: Below won't work if value is a float type.
    return value.toString().length == length;
  },
  params: ['length'],
  message: (_, values) => i18n.t('validation.length', values),
});

extend('max', {
  validate: (value, { length }) => {
    return value.toString().length <= length;
  },
  params: ['length'],
  message: (_, values) => i18n.t('validation.max', values),
});
