<template src="./showInvoice.html"></template>

<script>


import textbox from "../../../components/html/textbox.vue";
import button from "../../../components/html/button.vue";
import textarea from "../../../components/html/textarea.vue";
import file from "../../../components/html/file.vue";
import select from "../../../components/html/select.vue";
import {InvoiceService} from "../invoice-service";


export default {

  components: {
    'app-textbox': textbox,
    'app-button': button,
    'app-textarea': textarea,
    'app-file': file,
    'app-select': select,
  },

  data()
  {
    return {
      products :  [],
      selectedCustomer : {
        "name": "",
        "phone_number" : "",
        "email" : "",
        "id" : ""
      },
      invoice_date : "",
      status : {"name":"","label":""},
      time :"",
      created_by : "",
      invoice_number : ""
    }
  },
  computed :{

    invoiceService(){
      return new InvoiceService(this.$api)
    },


    invoiceTotal()
    {
      let total = 0;
      this.products.forEach((item,index) => {
        total += ((item.selling_quantity === undefined ? 0 : item.selling_quantity) * item.selling_price);
      });
      return total;
    },


  },

  props : ["id"],

  mounted() {

    if(this.id !== undefined)
    {
      this.invoiceService.show(this.id).then((response)=>{
        this.products = response.data.data.items
        this.invoice_date = response.data.data.formatted_invoice_date;
        console.log(response.data.data.customer);
        this.selectedCustomer = response.data.data.customer;
        this.status = response.data.data.status;
        this.time = response.data.data.sales_time;
        this.created_by = response.data.data.created_by;
        this.invoice_number = response.data.data.invoice_number
      });
    }

  },

  methods : {

    completeInvoice()
    {
      this.$refs.completeInvoice.toggleProcessing();
      this.invoiceService.markeAsComplete(this.id).then((response)=>{
        this.$refs.completeInvoice.toggleProcessing();
          if(response.data.data.status === true)
          {
            this.products = response.data.data.invoice.items
            this.invoice_date = response.data.data.invoice.formatted_invoice_date;
            console.log(response.data.data.invoice.customer);
            this.selectedCustomer = response.data.data.invoice.customer;
            this.status = response.data.data.invoice.status;
            this.time = response.data.data.invoice.sales_time;
            this.created_by = response.data.data.invoice.created_by;
            this.invoice_number = response.data.data.invoice.invoice_number

            this.$helper.success(this.$notify,"Invoice Report","Invoice has been completed successfully!")
          }
          else
          {
            response.data.data.errors.forEach((message,index)=>{
              this.$helper.error(this.$notify,"Invoice Report",message)
            });
          }
      })
    }

  }

}
</script>
