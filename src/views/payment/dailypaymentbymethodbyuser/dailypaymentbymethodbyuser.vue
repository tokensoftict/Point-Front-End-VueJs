<template src="./dailypaymentbymethodbyuser.html"></template>


<script>

import textbox from "../../../components/html/textbox.vue";
import button from "../../../components/html/button.vue";
import textarea from "../../../components/html/textarea.vue";
import file from "../../../components/html/file.vue";
import select from "../../../components/html/select.vue";
import payment_method from "../../../components/html/payment_method.vue";
import {PaymentService} from "../payment-service";
import branch from "../../../components/html/branch.vue";

export default {


  components: {
    'app-textbox': textbox,
    'app-button': button,
    'app-textarea': textarea,
    'app-file': file,
    'app-select': select,
    'app-payment-method' : payment_method,
    'app-branch' : branch
  },

  data()
  {
    return {
      payments : [],
      columns : [],
      options : [],
      keys : [],
      from : this.$user.settings.date,
      users : []
    }
  },

  computed : {

    paymentService() {
      return new PaymentService(this.$api);
    },
  },

  methods :{

    getPaymentList()
    {
      this.$refs.go.toggleProcessing();
      this.paymentService.payment_by_method_custom({'filter':{'between':[this.from,this.from],"user_id":this.$refs.user_id.getValue()}}).then(
          (response)=>{
            this.columns = response.data.data.columns;
            this.keys = Object.keys(response.data.data.data)
            this.payments =  response.data.data.data;
            this.$refs.go.toggleProcessing();
          })
    }

  },

  mounted() {
    this.$refs.go.toggleProcessing();
    this.paymentService.$accessControl.getUsers().then((users)=>{
      this.users = users.data.data;
      this.paymentService.payment_by_method_custom({'filter':{'between':[this.from,this.from],"user_id":1}}).then(
          (response)=>{
            this.columns = response.data.data.columns;
            this.keys = Object.keys(response.data.data.data)
            this.payments =  response.data.data.data;
            this.$refs.go.toggleProcessing();
          })
    });

  }
}

</script>
