<template>
  <ValidationProvider
    v-slot="{ errors }"
    :vid="vid"
    :rules="rules"
    :name="label"
  >
    <b-field
      :type="{ 'is-danger': errors[0] }"
      v-bind="$attrs"
      :message="errors"
    >
      <b-select v-model="innerValue" :placeholder="placeholder">
        <slot />
      </b-select>
    </b-field>
  </ValidationProvider>
</template>

<style lang="scss">
$invalid-color: red;

.select.is-danger {
  color: $invalid-color;
  // Select arrow
  &:not(:hover)::after {
    border-color: $invalid-color;
  }
  select {
    border-color: $invalid-color;
  }
}
</style>

<script>
import { ValidationProvider } from 'vee-validate';

export default {
  components: {
    ValidationProvider,
  },
  props: {
    vid: {
      type: String,
      default: '',
    },
    rules: {
      type: [Object, String],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: null,
      default: '',
    },
  },
  data: () => ({
    // This needs to be null for placeholder to show on a select element
    innerValue: null,
  }),
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit('input', newVal);
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = newVal;
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  },
};
</script>
