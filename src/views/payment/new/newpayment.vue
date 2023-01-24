<template src="./newpayment.html"></template>


<script>

import textbox from "../../../components/html/textbox.vue";
import button from "../../../components/html/button.vue";
import textarea from "../../../components/html/textarea.vue";
import file from "../../../components/html/file.vue";
import select from "../../../components/html/select.vue";
import {PaymentService} from "../payment-service";

export default {


  components: {
    'app-textbox': textbox,
    'app-button': button,
    'app-textarea': textarea,
    'app-file': file,
    'app-select': select
  },

  data(){

    return {
      invoice : {
        "Invoice Number" : "",
        "ID" : "",
        "Sub Total" : "",
        "Date" : "",
        "Time" : "",
        "Created By" : "",
        "Customer" : "",
      },
      payment_method : 1,
      methods : [],
      status : false,
      cash_tendered : "",
      pos_bank_id : "",
      transfer_bank_id : "",
      banks : [],
      split : {
        1 : {
          amount : 0,
        },
        2 : {
          amount : 0,
          bank_id : ""
        },
        3 : {
          amount : 0,
          bank_id : ""
        },
        4 : {
          amount : 0,
        },
      }
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

    splitTotal()
    {
      let total =0;
      for(let method_id of Object.keys(this.split))
      {
        total += this.split[method_id]['amount']
      }
      return total;
    },

    validateSplitPayment()
    {
      if(this.split[2]['amount'] > 0 && this.split[2]['bank_id'] === "")
      {
        this.$helper.error(this.$notify,"Payment","Please Select All Payment Pos Bank");
        return false;
      }

      if(this.split[3]['amount'] > 0 && this.split[3]['bank_id'] === "")
      {
        this.$helper.error(this.$notify,"Payment","Please Select All Payment Transfer Bank");
        return false;
      }


      if(this.invoice["Sub Total_"] !== this.splitTotal)
      {
        console.log(this.invoice["Sub Total_"] +" "+ this.splitTotal);
        this.$helper.error(this.$notify,"Payment","Invalid total amount, amount not equal to invoice total");
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
      else if(this.payment_method === "split")
      {
        return this.split
      }
      else if(this.payment_method === 4)
      {
        return {
          'credit_payment' : 'credit_payment'
        };
      }

    },

    prepare_data()
    {
      return {
        payment_method : this.payment_method,
        payment_data : this.payment_data,
        invoice_id : this.invoice.ID
      }
    }


  },

  methods : {

    fetchInvoice()
    {

      if(this.$refs.invoice_id.getValue() === ""){
        this.$helper.error(this.$notify,"Payment","Enter Invoice ID / Invoice Number");
        return false;
      }
      this.$refs.proceed.toggleProcessing();
      this.methods = [];
      this.invoice = {};
      this.status = false;
      this.paymentService.invoice(this.$refs.invoice_id.getValue())
          .then((response) =>
          {
            this.$refs.proceed.toggleProcessing();

            this.status = response.data.data.status

            if(response.data.data.status === true)
            {
              this.methods = response.data.data.methods
              this.invoice = response.data.data.invoice
              this.banks = response.data.data.banks
              this.$helper.success(this.$notify,"Invoice retrieved successfully!");

            }
            else if(response.data.data.status === false)
            {
              this.$helper.error(this.$notify,response.data.data.message);
            }

          });
    },
    processPayment()
    {

      if(this.payment_method === 1 && this.validateCashPayment !== false) this.postPayment()
      if(this.payment_method === 2 && this.validatePosPayment !== false) this.postPayment()
      if(this.payment_method === 3 && this.validateTransferPayment !== false) this.postPayment()
      if(this.payment_method === "split" && this.validateSplitPayment !== false) this.postPayment()
      if(this.payment_method === 4) this.postPayment()

    },

    postPayment()
    {
      this.$refs.processpayment.toggleProcessing();
      this.paymentService.save(this.prepare_data)
          .then((response)=> {
            this.$refs.processpayment.toggleProcessing();
            if(response.data.data.status === true)
            {
              this.invoice = {
                "Invoice Number" : "",
                "ID" : "",
                "Sub Total" : "",
                "Date" : "",
                "Time" : "",
                "Created By" : "",
                "Customer" : "",
              };
              this.payment_method = 1;
              this.methods = [];
              this.status = false;
              this.cash_tendered = "";
              this.pos_bank_id = "";
              this.transfer_bank_id = "";
              this.banks = [];
              this.$refs.invoice_id.setValue("");
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
