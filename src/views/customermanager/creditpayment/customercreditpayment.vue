<template src="./customercreditpayment.html"></template>


<script>
import textbox from "../../../components/html/textbox.vue";
import button from "../../../components/html/button.vue";
import textarea from "../../../components/html/textarea.vue";
import file from "../../../components/html/file.vue";
import select from "../../../components/html/select.vue";
import payment from "../../../components/html/payment.vue";
import {CustomerService} from "../customer/customer-service";
import {PaymentService} from "../../payment/payment-service";


export default {

  components: {
    'app-textbox': textbox,
    'app-button': button,
    'app-textarea': textarea,
    'app-file': file,
    'app-select': select,
    'app-payment': payment,
  },

  data()
  {
    return {
      customer : {

      },
      methods : [],
      status : false,
      cash_tendered : "",
      pos_bank_id : "",
      transfer_bank_id : "",
      payment_method : 1,
      amount:'',
      banks : [],
    }
  },
  computed :{

    paymentService()
    {
      return new PaymentService(this.$api);
    },

    validateCashPayment()
    {
      if(this.cash_tendered === "")
      {
        this.$helper.error(this.$notify,"Payment","Please Enter Cash Tendered By Customer");
        return false;
      }
      return true;
    },
    validatePosPayment()
    {
      if(this.pos_bank_id === ""){
        this.$helper.error(this.$notify,"Payment","Please Select POS Bank");
        return false;
      }
      return true;
    },

    validateTransferPayment()
    {
      if(this.transfer_bank_id === ""){
        this.$helper.error(this.$notify,"Payment","Please Select Transfer Bank");
        return false;
      }
      return true;
    },



    payment_data()
    {

      if(this.payment_method === 1)
      {
        return {
          cash_tendered : this.cash_tendered,
        }
      }
      else if(this.payment_method === 2)
      {
        return {
          bank_id : this.pos_bank_id,
        }
      }
      else if(this.payment_method === 3)
      {
        return {
          bank_id : this.transfer_bank_id,
        }
      }

    },

    prepare_data()
    {
      return {
        payment_method : this.payment_method,
        payment_data : this.payment_data,
        customer_id : this.customer.id,
        amount : this.amount
      }
    },
  },
  methods : {

    fetchCustomer()
    {

      if(this.$refs.customer_id.getValue() === ""){
        this.$helper.error(this.$notify,"Payment","Enter Customer Phone Number");
        return false;
      }
      this.$refs.proceed.toggleProcessing();
      this.methods = [];
      this.customer = {};
      this.amount = "";
      this.cash_tendered = "";
      this.status = false;
      this.paymentService.$customer.phoneSearch(this.$refs.customer_id.getValue())
          .then((response) =>
          {
            this.$refs.proceed.toggleProcessing();

            this.status = response.data.data.status

            if(response.data.data.status === true)
            {
              this.methods = response.data.data.methods
              this.customer = response.data.data.customer
              this.banks = response.data.data.banks
              this.$helper.success(this.$notify,"Customer information retrieved successfully!");

            }
            else if(response.data.data.status === false)
            {
              this.$helper.error(this.$notify,response.data.data.message);
            }

          });
    },
    processPayment()
    {
      console.log(this.amount);
      if(this.amount === "" || parseInt(this.amount) === 0) {
        this.$helper.error(this.$notify, "Please enter amount customer wants to pay");
        return false;
      }
      if(this.payment_method === 1 && this.validateCashPayment !== false) this.postPayment()
      if(this.payment_method === 2 && this.validatePosPayment !== false) this.postPayment()
      if(this.payment_method === 3 && this.validateTransferPayment !== false) this.postPayment()


    },

    postPayment()
    {
      this.$refs.processpayment.toggleProcessing();
      this.paymentService.storeCreditPayment(this.prepare_data)
          .then((response)=> {
            this.$refs.processpayment.toggleProcessing();
            if(response.data.data.status === true)
            {
              this.customer = {

              };
              this.payment_method = 1;
              this.methods = [];
              this.status = false;
              this.cash_tendered = "";
              this.pos_bank_id = "";
              this.transfer_bank_id = "";
              this.banks = [];
              this.$refs.customer_id.setValue("");
              this.$helper.success(this.$notify,"Payment","Payment has been processed Successfully!");
            }
            else
            {
              this.$helper.error(this.$notify,"Payment",response.data.data.message);
            }
          });

    }

  }
}
</script>
