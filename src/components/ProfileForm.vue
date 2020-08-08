<template>
  <section id="profileFormSection" class="section-content">
    <ValidationObserver ref="observer">
      <div class="form">
        <b-field>
          <label>{{ $t('message.language') }} </label>
        </b-field>
        <b-field>
          <b-select
            v-model="$i18n.locale"
            :placeholder="$t('message.placeholderLang')"
            expanded
          >
            <option value="en">English</option>
            <option value="ru">Русский</option>
            <option value="zh">中文</option>
          </b-select>
        </b-field>

        <div v-for="field in fields" :key="field.name">
          <div class="fieldContainer">
            <b-field>
              <label class="inputLabel">{{ field.label || field.name }}</label>
            </b-field>

            <div v-if="field.type === 'string'">
              <ValidatedInput
                v-model="user[field.name]"
                :rules="field.rules"
                :label="field.label"
                :placeholder="field.placeholder"
                :disabled="field.disabled"
              />
            </div>

            <div v-if="field.type === 'dropdown'">
              <ValidatedSelect
                v-model="user[field.name]"
                :rules="field.rules"
                :label="field.label"
                :placeholder="field.placeholder"
                :disabled="field.disabled"
              >
                <option
                  v-for="option in field.options"
                  :key="option"
                  :value="option"
                  >{{ option }}</option
                >
              </ValidatedSelect>
            </div>
          </div>

          <div v-if="field.type === 'lineBreak'" class="lineBreak"></div>
        </div>

        <div class="actionRow">
          <b-button type="is-primary" @click="saveBtnClick">{{
            $t('message.save')
          }}</b-button>
        </div>

        <b-message v-if="status === 'success'" type="is-success">
          {{ statusMessage }}
        </b-message>
        <b-message v-if="status === 'fail'" type="is-warning">
          {{ statusMessage }}
        </b-message>
      </div>
    </ValidationObserver>
  </section>
</template>

<style lang="scss">
$invalid-color: red;

.fieldContainer {
  margin-bottom: 0.75rem;
}
</style>

<script>
import { ValidationObserver } from 'vee-validate';
import ValidatedInput from './ValidatedInput';
import ValidatedSelect from './ValidatedSelect';

import AmplifyStore from '@/store/store';
import { logger } from '@/lib/logger';
import BusinessService from '@/services/business.service';
import AuthService from '@/services/auth.service';

export default {
  name: 'ProfileForm',
  components: { ValidationObserver, ValidatedInput, ValidatedSelect },
  props: { fields: { type: Array, required: true } },
  data() {
    return {
      user: {},
      status: null,
      statusMessage: null,
    };
  },
  async mounted() {
    if (AmplifyStore.getters.user) {
      const currentUser = await AuthService.currentUserInfo();
      this.user = {
        ...currentUser.attributes,
      };
    }
  },
  methods: {
    async saveBtnClick() {
      // Validate form before storing values
      this.$refs.observer
        .validate()
        .then((success) => this.updateAuthAndBusinessRecords(success));
    },
    async updateAuthAndBusinessRecords(success) {
      const cognitoUser = AmplifyStore.getters.user;
      if (!this.user || !cognitoUser) {
        return;
      }
      if (success && !this.updating) {
        try {
          this.updating = true;
          this.resetStatus();
          await AuthService.updateUserAttributes(cognitoUser, this.user);
          await this.updateBusinessRecord();
          this.setStatus('success', this.$t('message.profileUpdated'));
          this.updating = false;
        } catch (e) {
          this.updating = false;
          logger.debug('Unable to save, please try again later', e);
          this.setStatus('fail', this.$t('message.unableToSave'));
        }
      } else {
        this.setStatus('fail', this.$t('message.fillFields'));
      }
    },
    async updateBusinessRecord() {
      const params = {
        id: AmplifyStore.getters.identBusinessId,
        shortId: AmplifyStore.getters.shortId
          ? AmplifyStore.getters.shortId
          : await BusinessService.uniqueShortId(),
        businessName: this.user['custom:businessName'],
        postcode: this.user['custom:postcode'],
        address: this.user.address,
      };

      await BusinessService.upsert(AmplifyStore.getters.shortId, params).then(
        (response) => {
          AmplifyStore.commit('setBusiness', response);
        },
      );
    },
    resetStatus() {
      this.status = null;
      this.statusMessage = '';
    },
    setStatus(type, message) {
      this.status = type;
      this.statusMessage = message;
    },
  },
};
</script>
