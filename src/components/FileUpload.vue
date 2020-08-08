<template>
  <div>
    <b-field class="file" group-multiline>
      <b-upload v-if="!srcUpload" v-model="srcUpload">
        <a class="button is-secondary">
          <b-icon icon="upload"></b-icon>
          <span v-if="updating === 'bgSrc'">{{
            $t('message.backgroundImage')
          }}</span>
          <span v-if="updating === 'logoSrc'">{{
            $t('message.logoSettings')
          }}</span>
        </a>
      </b-upload>
      <b-button
        v-else
        type="is-danger"
        icon-left="delete"
        class="file-name"
        @click="removeFile"
      />
      <span v-if="srcUpload" class="file-name">
        {{ srcUpload.name }}
      </span>
    </b-field>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  props: {
    title: {
      type: String,
      required: true,
    },
    updating: {
      type: String,
      required: true,
    },
    resetFile: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      srcUpload: undefined,
      uploadDataUrl: undefined,
    };
  },
  watch: {
    srcUpload(newVal, oldVal) {
      const dataUrl = newVal ? URL.createObjectURL(newVal) : undefined;
      this.$emit('clicked', this.updating, dataUrl);
    },
    resetFile(newVal, oldVal) {
      // Whenever this value changes, we remove the file data
      this.removeFile();
    },
  },
  methods: {
    removeFile() {
      this.srcUpload = undefined;
      this.uploadDataUrl = undefined;
    },
  },
};
</script>
