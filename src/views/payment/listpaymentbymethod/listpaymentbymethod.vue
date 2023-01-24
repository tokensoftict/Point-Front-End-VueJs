<template src="./listpaymentbymethod.html"></template>


<script>

import textbox from "../../../components/html/textbox.vue";
import button from "../../../components/html/button.vue";
import textarea from "../../../components/html/textarea.vue";
import file from "../../../components/html/file.vue";
import select from "../../../components/html/select.vue";
import payment_method from "../../../components/html/payment_method.vue";
import {PaymentService} from "../payment-service";

export default {


  components: {
    'app-textbox': textbox,
    'app-button': button,
    'app-textarea': textarea,
    'app-file': file,
    'app-select': select,
    'app-payment-method' : payment_method
  },

  data()
  {
    return {
      payments : [],
      columns : [],
      options : [],
      keys : []
    }
  },

  computed : {

    paymentService() {
      return new PaymentService(this.$api);
    },
  },

  mounted() {
    this.paymentService.payment_by_method().then(
        (response)=>{
          this.columns = response.data.data.columns;
          this.keys = Object.keys(response.data.data.data)
          this.payments =  response.data.data.data;
        })
  }
}

</script>
