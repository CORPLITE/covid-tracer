<template>
  <div>
    <TitleSection
      :title="businessName"
      :subtitle="$t('message.subtitleData')"
    />

    <section class="section-content">
      <div class="table-container tile is-child box" position="is-centered">
        <Table :business-id="businessId" />
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.table-container {
  padding: 0rem;
}
</style>

<script>
import AmplifyStore from '@/store/store';
import { Table, TitleSection } from '@/components';

export default {
  name: 'TracingData',
  components: { TitleSection, Table },
  computed: {
    businessName: () => {
      return AmplifyStore.getters.identBusinessName;
    },
    businessId: () => {
      return AmplifyStore.getters.identBusinessId;
    },
  },
};
</script>
