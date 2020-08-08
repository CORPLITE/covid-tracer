<template>
  <section>
    <TitleSection
      :title="$t('message.titleProfile')"
      :subtitle="$t('message.subtitleProfile')"
      section-class-name="profileTitle"
    />
    <ProfileForm v-if="user" :user="user" :fields="fields" />
  </section>
</template>

<style lang="scss"></style>

<script>
import AmplifyStore from '@/store/store';
import { ProfileForm, TitleSection } from '@/components';

export default {
  name: 'Profile',
  components: { TitleSection, ProfileForm },
  data: () => {
    return {};
  },
  computed: {
    user: function () {
      return AmplifyStore.state.user;
    },
    fields: function () {
      return [
        {
          type: 'string',
          name: 'email',
          label: this.$t('message.email'),
          placeholder: 'email@yourbusiness.com',
          rules: 'required',
          disabled: true,
        },
        {
          type: 'string',
          name: 'custom:businessName',
          label: this.$t('message.businessName'),
          placeholder: 'e.g. Your Business Pty Ltd',
          rules: 'required|no_special_char|max:25',
        },
        {
          type: 'string',
          name: 'address',
          label: this.$t('message.address'),
          placeholder: 'e.g. 92 Murphey St, Collingwood',
          rules: 'required',
        },
        {
          type: 'dropdown',
          name: 'custom:state',
          label: this.$t('message.state'),
          options: ['VIC', 'NSW', 'QLD', 'ACT', 'NT', 'WA', 'TAS'],
          placeholder: 'State',
          rules: 'required',
        },
        {
          type: 'string',
          name: 'custom:postcode',
          label: this.$t('message.postcode'),
          placeholder: 'e.g. 3000',
          rules: 'required|numeric|length:4',
        },
      ];
    },
  },
};
</script>
