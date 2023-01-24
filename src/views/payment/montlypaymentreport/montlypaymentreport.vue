<template src="./montlypaymentreport.html"></template>


<script>

import textbox from "../../../components/html/textbox.vue";
import button from "../../../components/html/button.vue";
import textarea from "../../../components/html/textarea.vue";
import file from "../../../components/html/file.vue";
import select from "../../../components/html/select.vue";
import payment from "../../../components/html/payment.vue";
import {PaymentService} from "../payment-service";


export default
{

  components: {
    'app-textbox': textbox,
    'app-button': button,
    'app-textarea': textarea,
    'app-file': file,
    'app-select': select,
    'app-payment' : payment,
  },

  data()
  {
    return {
      invoiceList : [],
      columns : [],
      options : [],
      from : this.$user.settings.monthly[0],
      to : this.$user.settings.monthly[1],
    }
  },

  computed : {
    paymentService() {
      return new PaymentService(this.$api)
    },

  },

  methods: {

    filterReport()
    {
      this.$refs.go.toggleProcessing();
      this.paymentService.custom({'filter':{'between':[this.from,this.to]}})
          .then((response)=> {
            this.$refs.go.toggleProcessing();
            this.invoiceList = response.data.data.data
            this.columns = response.data.data.columns
          });
    }

  },

  mounted() {
    this.$refs.go.toggleProcessing();
    this.paymentService.custom({'filter':{'between':[this.from,this.to]}})
        .then((response)=> {
          this.$refs.go.toggleProcessing();
           this.invoiceList = response.data.data.data
           this.columns = response.data.data.columns
        });
  }


}


</script>
