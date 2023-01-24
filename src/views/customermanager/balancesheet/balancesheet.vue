<template src="./balancesheet.html"></template>


<script>
import textbox from "../../../components/html/textbox.vue";
import button from "../../../components/html/button.vue";
import textarea from "../../../components/html/textarea.vue";
import file from "../../../components/html/file.vue";
import select from "../../../components/html/select.vue";
import payment from "../../../components/html/payment.vue";
import {CustomerService} from "../customer/customer-service";

export default {

  components: {
    'app-textbox': textbox,
    'app-button': button,
    'app-textarea': textarea,
    'app-file': file,
    'app-select': select,
    'app-payment': payment,
  },

  data() {
    return {
      sheets: [],
      columns: [],
      options: [],
      from: this.$user.settings.monthly[0],
      to: this.$user.settings.monthly[1],
      customers: [],
      opening : 0
    }
  },

  computed: {

    customerService() {
      return new CustomerService(this.$api);
    }

  },

  methods: {

    filterReport() {
      this.$refs.go.toggleProcessing();
      this.customerService.balanceSheet({
        'filter': {
          'between': [this.from, this.to],
          "customer_id": this.$refs.customer_id.getValue()
        }
      })
          .then((response) => {
            this.$refs.go.toggleProcessing();
            this.sheets = response.data.data.histories
            this.columns = response.data.data.columns
            this.opening = response.data.data.opening
          });
    }

  },

  mounted() {
    this.$refs.go.toggleProcessing();
    this.customerService.get().then((customers) => {
      this.customers = customers.data.data;
      this.customerService.balanceSheet({'filter': {'between': [this.from, this.to], "customer_id": 1}})
          .then((response) => {
            this.$refs.go.toggleProcessing();
            this.sheets = response.data.data.histories
            this.columns = response.data.data.columns
            this.opening = response.data.data.opening
          });
    });
  }
}
</script>

