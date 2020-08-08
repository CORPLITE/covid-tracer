<template>
  <div>
    <TitleSection :title="businessName" :subtitle="header.subtitle" />
    <section :key="'MyBusinessView'" class="section-content">
      <div class="container">
        <div class="columns is-variable is-6">
          <div class="column is-half">
            <QrCodeGenerator
              :qr-data="qrData"
              :business-id="businessid"
              @qr-data-uri="updateQr"
            />
          </div>

          <div class="column is-half">
            <DocumentTemplate
              :qr-data="qrData"
              :qr-image="dataURI"
              :document-title="businessName"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { TitleSection, QrCodeGenerator, DocumentTemplate } from '@/components';
import AmplifyStore from '@/store/store';

export default {
  name: 'MyBusiness',
  components: { TitleSection, QrCodeGenerator, DocumentTemplate },
  data() {
    return {
      dataURI: '',
      header: {
        subtitle: this.$t('message.subtitleBusiness'),
      },
    };
  },
  computed: {
    businessName: function () {
      return AmplifyStore.getters.identBusinessName;
    },
    businessid: function () {
      return AmplifyStore.getters.identBusinessId;
    },
    qrData: function () {
      return AmplifyStore.getters.traceFormUrl;
    },
  },
  methods: {
    download(downloadUrl, filename) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.setAttribute('download', filename);
      a.click();
    },
    updateQr: function (dataURI) {
      this.dataURI = dataURI;
    },
  },
};
</script>
