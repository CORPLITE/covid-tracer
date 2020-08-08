<template>
  <ValidationProvider
    v-slot="{ errors }"
    :vid="vid"
    :rules="rules"
    :name="label"
  >
    <b-field
      v-bind="$attrs"
      :type="{ 'is-danger': errors[0] }"
      :message="errors"
    >
      <b-input
        v-model="innerValue"
        v-bind="$attrs"
        :placeholder="placeholder"
      />
    </b-field>
  </ValidationProvider>
</template>

<style lang="scss">
$invalid-color: red;

// Input border colour
.input.is-danger {
  border-color: $invalid-color;
}
// Icon colour
.has-text-danger {
  color: $invalid-color !important;
}
// Message colour
.help.is-danger {
  color: $invalid-color;
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
    innerValue: '',
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
