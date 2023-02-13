<template src="./completedInvoice.html"></template>


<script>
import {InvoiceService} from "../invoice-service";
import textbox from "../../../components/html/textbox.vue";
import button from "../../../components/html/button.vue";
import textarea from "../../../components/html/textarea.vue";
import file from "../../../components/html/file.vue";
import select from "../../../components/html/select.vue";
import invoice from "../../../components/html/invoice.vue";
import {NumberSpinner} from "vue3-number-spinner";


export default
{

  components: {
    'app-textbox': textbox,
    'app-button': button,
    'app-textarea': textarea,
    'app-file': file,
    'app-select': select,
    'app-invoice' : invoice,
    'app-number-spinner' :  NumberSpinner
  },

  data()
  {
    return {
      invoiceList : [],
      columns : [],
      options : []
    }
  },

  computed : {
    invoiceService() {
      return new InvoiceService(this.$api)
    },

  },

  methods: {

    get()
    {
      this.invoiceService.complete()
          .then((response)=> {
            this.invoiceList = response.data.data.data
            this.columns = response.data.data.columns
          });
    }

  },

  mounted() {

    this.invoiceService.complete()
        .then((response)=> {
           this.invoiceList = response.data.data.data
           this.columns = response.data.data.columns
        });
  }




}


</script>
