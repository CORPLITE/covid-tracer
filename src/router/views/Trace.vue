<template>
  <div>
    <TitleSection title="Check-in" :subtitle="headerSubtitle" />
    <TracingForm :fields="fields" @receiveName="onReceiveName" />
  </div>
</template>

<style lang="scss"></style>

<script>
import { TitleSection, TracingForm } from '@/components';
import { logger } from '@/lib/logger';

export default {
  name: 'Trace',
  components: { TitleSection, TracingForm },
  data() {
    return {
      businessName: '',
      fields: [
        {
          type: 'string',
          name: 'firstName',
          label: 'First Name',
          placeholder: 'First Name',
          rules: 'required',
        },
        {
          type: 'string',
          name: 'lastName',
          label: 'Last Name',
          placeholder: 'Last Name',
          rules: 'required',
        },
        {
          type: 'tel',
          name: 'phone',
          label: 'Phone Number',
          placeholder: 'Phone Number',
          rules: 'required',
        },
      ],
    };
  },
  computed: {
    headerSubtitle: function () {
      return `Your location is: ${this.businessName}`;
    },
  },
  methods: {
    onReceiveName(value) {
      this.businessName = value;
    },
  },
};
</script>
