<template src="./listpayment.html"></template>


<script>

import textbox from "../../../components/html/textbox.vue";
import button from "../../../components/html/button.vue";
import textarea from "../../../components/html/textarea.vue";
import file from "../../../components/html/file.vue";
import select from "../../../components/html/select.vue";
import {PaymentService} from "../payment-service";
import payment from "../../../components/html/payment.vue"

export default {


  components: {
    'app-textbox': textbox,
    'app-button': button,
    'app-textarea': textarea,
    'app-file': file,
    'app-select': select,
    'app-payment' : payment
  },

  data()
  {
    return {
      payments : [],
      columns : [],
      options : []
    }
  },

  computed : {

    paymentService() {
      return new PaymentService(this.$api);
    },
  },

  methods : {
      get()
      {
        this.paymentService.get().then(
            (response)=>{
              this.payments = response.data.data.data;
              this.columns = response.data.data.columns;
            })
      }
  },

  mounted() {
    this.paymentService.get().then(
        (response)=>{
        this.payments = response.data.data.data;
        this.columns = response.data.data.columns;
    })
  }

}

</script>
