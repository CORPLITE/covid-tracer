<template>
  <div id="table-container" class="container">
    <section v-if="traceData.length <= 0">
      <h3 id="pageSubtitle" class="subtitle">
        {{ $t('message.tableSubtitle') }}
      </h3>
    </section>
    <section v-if="traceData.length > 0">
      <b-field grouped group-multiline>
        <b-select v-model="perPage" :disabled="!isPaginated">
          <option value="25">{{ $tc('message.perPage', 25) }}</option>
          <option value="50">{{ $tc('message.perPage', 50) }}</option>
          <option value="100">{{ $tc('message.perPage', 100) }}</option>
          <option value="250">{{ $tc('message.perPage', 250) }}</option>
        </b-select>
      </b-field>

      <b-table
        :data="traceBusinessData || traceData"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-simple="isPaginationSimple"
        :pagination-position="paginationPosition"
        :default-sort-direction="defaultSortDirection"
        :sort-icon="sortIcon"
        :sort-icon-size="sortIconSize"
        default-sort="createdAt"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <template slot-scope="props">
          <b-table-column
            field="createdAt"
            :label="$t('message.date')"
            sortable
            searchable
            :custom-sort="sortByDate"
          >
            <!-- eslint-disable-next-line  -->
            <template slot="searchable" slot-scope="props">
              <b-input
                v-model="props.filters[props.column.field]"
                :placeholder="$t('message.filterDate')"
                icon="magnify"
                size="is-small"
                expanded
              />
            </template>
            <span class="tag is-success">{{ props.row.createdAt }}</span>
          </b-table-column>

          <b-table-column
            field="firstName"
            :label="$t('message.firstName')"
            sortable
            >{{ props.row.firstName }}</b-table-column
          >

          <b-table-column
            field="lastName"
            :label="$t('message.lastName')"
            sortable
            >{{ props.row.lastName }}</b-table-column
          >

          <b-table-column
            field="phone"
            :label="$t('message.phoneNumber')"
            sortable
            >{{ props.row.phone }}</b-table-column
          >

          <b-table-column
            v-if="!businessId"
            field="businessName"
            label="Business Name"
            sortable
            >{{ props.row.businessName }}</b-table-column
          >

          <b-table-column
            v-if="!businessId"
            field="postcode"
            label="Postcode"
            sortable
            >{{ props.row.postcode }}</b-table-column
          >
        </template>
      </b-table>
      <b-field class="padding-med" group-multiline>
        <b-button
          v-if="canLoadMoreData"
          class="is-primary"
          @click="loadTraces()"
          >Load More Data</b-button
        >
        <b-button icon-left="download" class="is-primary" @click="downloadCSV()"
          >CSV</b-button
        >
      </b-field>
    </section>
  </div>
</template>

<style lang="scss">
.table-container {
  padding: 1rem;
}
</style>

<script>
import _ from 'lodash';
import AmplifyStore from '@/store/store';
import AuthService from '@/services/auth.service';
import TraceService from '@/services/trace.service';
import { logger } from '@/lib/logger';

export default {
  name: 'Table',
  props: {
    businessId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      traceData: [],
      requestNumber: 0,
      nextToken: null,
      traceBusinessData: null,
      isPaginated: true,
      isPaginationSimple: false,
      paginationPosition: 'both',
      defaultSortDirection: 'asc',
      sortIcon: 'chevron-up',
      sortIconSize: 'is-small',
      currentPage: 1,
      perPage: 25,
      businessList: {},
    };
  },
  computed: {
    canLoadMoreData: function () {
      const tracesPerPage = this.requestNumber * TraceService.requestLimit;
      const allTracesRequested =
        this.requestNumber > 0 && this.nextToken === null;
      return !allTracesRequested && this.traceData.length === tracesPerPage;
    },
  },
  async created() {
    await this.loadTraces();
  },
  methods: {
    async loadTraces() {
      const params = {
        nextToken: this.nextToken,
        businessId: this.businessId,
      };
      const fetchTrace = await TraceService.getUserTraceData(params);
      this.traceData = [...this.traceData, ...fetchTrace.traceData];
      this.nextToken = fetchTrace.nextToken;
      this.requestNumber++;
    },
    downloadCSV() {
      const csv = TraceService.convertTraceCSV(this.traceData);
      this.download('data:text/csv;charset=utf-8,' + csv, 'contact_traces.csv');
    },
    download(downloadUrl, filename) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.setAttribute('download', filename);
      a.click();
    },
    sortByDate(a, b, isAsc) {
      if (isAsc) {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
    },
  },
};
</script>
