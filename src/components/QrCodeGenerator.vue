<template>
  <div>
    <p class="title is-4">{{ $t('message.qrCode') }}</p>
    <!-- QR Element -->
    <div id="QrContainer">
      <VueQr
        class="qr-shadow"
        :qid="'CovidTracingQR'"
        :text="qrData"
        :size="size"
        :margin="margin"
        :color-dark="colorDark"
        :color-light="colorLight"
        :bg-src="bgSrc"
        :background-color="backgroundColor"
        :logo-src="logoSrc"
        :logo-scale="logoScale"
        :logo-margin="logoMargin"
        :logo-background-color="logoBackgroundColor"
        :logo-corner-radius="logoCornerRadius"
        :white-margin="whiteMargin"
        :dot-scale="dotScale"
        :auto-color="autoColor"
        :gif-bg-src="gifBgSrc"
        :binarize="binarize"
        :binarize-threshold="binarizeThreshold"
        :callback="qrCallback"
        :background-dimming="backgroundDimming"
        :correct-level="correctLevel"
      ></VueQr>
    </div>

    <!-- QR Settings -->
    <form id="QRConfig">
      <!-- Colour form controls -->
      <b-field :label="$t('message.colourSettings')"></b-field>
      <b-field label-for="colorDark">{{ $t('message.darkColor') }}</b-field>
      <b-field>
        <b-input
          v-model="colorDark"
          type="color"
          name="colorDark"
          value="#000000"
        />
      </b-field>
      <b-field label-for="colorLight">{{ $t('message.lightColor') }}</b-field>
      <b-field>
        <b-input
          v-model="colorLight"
          type="color"
          name="colorLight"
          value="#ffffff"
        />
      </b-field>
      <b-field label-for="backgroundColor">{{
        $t('message.backgroundColor')
      }}</b-field>
      <b-field>
        <b-input
          v-model="backgroundColor"
          type="color"
          name="backgroundColor"
          value="#ffffff"
        />
      </b-field>

      <!-- Background Image form controls -->
      <b-field :label="$t('message.backgroundImageSettings')"></b-field>
      <b-field>
        <FileUpload
          title="Background Image"
          updating="bgSrc"
          :reset-file="resetFiles"
          @clicked="updateFormData"
        />
      </b-field>

      <!-- Logo form controls -->
      <b-field :label="$t('message.logoSettings')"></b-field>
      <b-field>
        <FileUpload
          title="Logo"
          updating="logoSrc"
          :reset-file="resetFiles"
          @clicked="updateFormData"
        />
      </b-field>
    </form>
    <div id="updateQrImageContainer">
      <b-field grouped>
        <b-button class="is-secondary" @click="resetQr()">{{
          $t('message.reset')
        }}</b-button>
        <b-button class="is-primary" @click="updateQrHandler()">{{
          $t('message.update')
        }}</b-button>
      </b-field>
    </div>
  </div>
</template>

<style scoped lang="scss">
form {
  width: 75%;
  margin-top: 0.75rem;
}

#QrContainer {
  width: 250px;
}

#updateQrImageContainer {
  margin-top: 0.75rem;
  width: 250px;

  button {
    margin-right: 2.75rem;
  }
}

.collapse {
  padding-top: 0rem;
  padding-bottom: 0rem;
}

.input {
  padding: 40px;
}
</style>

<script>
const VueQr = require('vue-qr').default;
import FileUpload from '@/components/FileUpload';
import { QRErrorCorrectLevel, QRErrorCorrectSelect } from '@/lib/const';

export default {
  name: 'QRCodeGenerator',
  components: { VueQr, FileUpload },
  props: {
    qrData: {
      type: String,
      required: true,
    },
    businessId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      size: 500,
      margin: 0,
      dotScale: 1,
      whiteMargin: false,
      colorDark: '#000000',
      colorLight: '#ffffff',
      autoColor: false,
      maskedDots: false,
      backgroundColor: '#ffffff',
      logoBackgroundColor: '#000000',
      backgroundDimming: undefined,

      correctLevel: QRErrorCorrectLevel.M,
      bgSrc: undefined,
      gifBgSrc: undefined,
      logoSrc: undefined,
      logoScale: 0.2,
      logoMargin: 6,
      logoCornerRadius: 8,
      binarize: false,
      binarizeThreshold: 128,
      callback: undefined,
      bindElement: undefined,
      bgSrcUpload: undefined,
      gifBgUpload: undefined,
      logoSrcUpload: undefined,
      QRDataUrl: undefined,
      QRErrorCorrectSelect,
      resetFiles: false,
    };
  },
  watch: {
    logoSrcUpload(newVal, oldVal) {
      this.logoSrc = URL.createObjectURL(newVal);
    },
  },
  mounted() {
    // Parse data from local storage with the corresponding bussines ID as the key
    let localData = JSON.parse(localStorage.getItem(this.businessId));
    this.colorDark = localData['colorDark'];
    this.colorLight = localData['colorLight'];
    this.backgroundColor = localData['backgroundColor'];
  },
  methods: {
    resetQr() {
      // Reset colours;
      this.colorDark = '#000000';
      this.colorLight = '#ffffff';
      this.backgroundColor = '#ffffff';

      // Reset image sources
      this.resetFiles = !this.resetFiles;
      this.bgSrc = undefined;
      this.logoSrc = undefined;
    },
    updateQrHandler() {
      this.updateQr(this.QRDataUrl);
    },
    updateQr(qrDataURI) {
      // Inserts QR color data into local storage, via business ID as the key
      localStorage.setItem(
        this.businessId,
        JSON.stringify({
          colorDark: this.colorDark,
          colorLight: this.colorLight,
          backgroundColor: this.backgroundColor,
        }),
      );
      this.$emit('qr-data-uri', qrDataURI);
    },
    updateFormData(formProp, value) {
      this[formProp] = value;
    },
    imageInput(e, id) {
      const files = e.target.files || e.dataTransfer.files;
      if (files.length <= 0) return;
      const file = files[0];
      if (!file.type.toString().startsWith('image/')) {
        alert('Oops, the file type is not correct.');
        return;
      }
      // Set image URL
      this[id] = URL.createObjectURL(file);
    },
    qrCallback(dataURI) {
      // This callback is called everytime the QR code image settings are updated.
      // Update QR image URI on load
      if (this.QRDataUrl == undefined) {
        this.updateQr(dataURI);
      }
      this.QRDataUrl = dataURI;
    },
    download(downloadUrl, filename) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.setAttribute('download', filename);
      a.click();
    },
  },
};
</script>
