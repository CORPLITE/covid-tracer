<template>
  <section id="formSection" :key="'userForm'" class="section-content">
    <ValidationObserver ref="observer">
      <div :key="'contact-tracing-form'">
        <div v-for="field in fields" :key="field.name">
          <div class="fieldContainer">
            <b-field :label="field.label">
              <ValidatedInput
                v-model="formData[field.name]"
                :label="field.label"
                :name="field.name"
                :placeholder="field.placeholder"
                :rules="field.rules"
                :type="field.type"
              />
            </b-field>
          </div>
        </div>
        <div id="formButtonContainer" class="buttons">
          <b-button type="is-secondary" @click="create">Submit</b-button>
        </div>
      </div>
      <h3 id="footerText" class="subtitle">
        Want <a href="https://covidtracer.org.au/">COVIDTracer</a> for your
        business?
      </h3>
    </ValidationObserver>

    <b-message v-if="status === 'success'" type="is-success">{{
      statusMessage
    }}</b-message>
    <b-message v-if="status === 'fail'" type="is-warning">{{
      statusMessage
    }}</b-message>
  </section>
</template>

<style lang="scss">
#formSection {
  padding-top: 0px;
}

#formButtonContainer > button {
  margin-right: 2.75rem;
}

.fieldContainer {
  margin-bottom: 0.75rem;
}

#footerText {
  font-weight: 500;
  letter-spacing: 0.3px;
  margin-top: 0.75rem;
}
</style>

<script>
import Cookies from 'js-cookie';
import BusinessService from '@/services/business.service';
import TraceService from '@/services/trace.service';
import { ValidationObserver } from 'vee-validate';
import { ValidatedInput } from '@/components';
import { logger } from '@/lib/logger';

export default {
  name: 'TracingForm',
  components: { ValidationObserver, ValidatedInput },
  props: { fields: { type: Array, required: true } },
  data() {
    return {
      status: null,
      formData: { firstName: '', lastName: '', phone: '' },
      businessId: null,
      businessName: '',
      loading: false,
      numCheckIn: 0,
    };
  },
  computed: {
    headerSubtitle: function () {
      return `Your location is: ${this.businessName}`;
    },
  },
  async mounted() {
    const longId = this.$route.query.id;
    const shortId = this.$route.params.pathMatch || this.$route.query.i;
    if (longId) {
      // Grab business name and ID from query string
      this.businessId = this.$route.query.id;
      this.businessName = this.$route.query.business;
      this.$emit('receiveName', this.businessName);

      // Grab user's detail from cookie
      this.formData = {
        ...Cookies.getJSON('covidTrace'),
      };
    } else if (shortId) {
      const businessRequest = await BusinessService.getBusinessShortId(shortId)
        .then((res) => {
          if (res === 404) this.fourZeroFour();
          return res;
        })
        .catch((e) => {
          logger.debug('Business lookup error', e);
          this.fourZeroFour();
        });
      this.businessId = businessRequest.id;
      this.businessName = businessRequest.businessName;
      this.$emit('receiveName', this.businessName);

      this.formData = {
        ...Cookies.getJSON('covidTrace'),
      };
    } else {
      this.fourZeroFour();
    }
  },
  methods: {
    fourZeroFour() {
      this.$router
        .push('/404')
        .catch((err) => logger.debug(`Unable to 404 ${err}`));
    },
    create() {
      // Validate check-in form before storing values
      this.$refs.observer.validate().then((success) => {
        if (success && !this.loading) {
          this.loading = true;
          TraceService.create(this.formData, this.businessId)
            .then((res) => this.success(res))
            .catch((e) => this.fail(e));
        } else {
          this.setStatus('fail', 'Please fill in all fields correctly');
        }
      });
    },
    success(res) {
      this.loading = false;
      // Only update cookie for first person's details
      if (this.numCheckIn == 0) {
        Cookies.set('covidTrace', { ...this.formData }, { expires: 365 });
      }
      this.numCheckIn += 1;
      this.setStatus(
        'success',
        `${this.formData.firstName} has checked into ${this.businessName}`,
      );
      this.resetForm();
      logger.debug(`Trace created`, res);
    },
    fail(e) {
      this.loading = false;
      logger.error(`Error creating Trace`, e);
      this.setStatus('fail', 'Unable to Submit');
    },
    resetForm() {
      this.formData = { firstName: '', lastName: '', phone: '' };
      this.$refs.observer.reset();
    },
    setStatus(type, message) {
      this.status = type;
      this.statusMessage = message;

      // Hide after a short amount of time
      setTimeout(() => {
        this.status = null;
        this.statusMessage = '';
      }, 5000);
    },
  },
};
</script>
