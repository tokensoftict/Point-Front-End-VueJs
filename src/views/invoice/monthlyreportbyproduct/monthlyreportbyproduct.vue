<template src="./monthlyreportbyproduct.html"></template>


<script>
import {InvoiceService} from "../invoice-service";
import textbox from "../../../components/html/textbox.vue";
import button from "../../../components/html/button.vue";
import textarea from "../../../components/html/textarea.vue";
import file from "../../../components/html/file.vue";
import select from "../../../components/html/select.vue";
import invoice from "../../../components/html/invoice.vue";
import {NumberSpinner} from "vue3-number-spinner";
import invoicebyproduct from "../../../components/html/invoicebyproduct.vue";


export default
{

  components: {
    'app-textbox': textbox,
    'app-button': button,
    'app-textarea': textarea,
    'app-file': file,
    'app-select': select,
    'app-invoice' : invoicebyproduct,
    'app-number-spinner' :  NumberSpinner
  },

  data()
  {
    return {
      invoiceList : [],
      columns : [
          'No',
          'Product Name',
          'Total Qty Sold',
          'Total Selling Price',
          'Total Cost Price'
      ],
      options : [],
      from : this.$user.settings.monthly[0],
      to : this.$user.settings.monthly[1],
      statuses : [
        {
          id : "Paid",
          text : 'Paid & Complete'
        },
        {
          id : "Draft",
          text : 'Draft'
        }
      ]
    }
  },

  computed : {
    invoiceService() {
      return new InvoiceService(this.$api)
    },

  },

  methods: {

    filterReport()
    {
      this.$refs.go.toggleProcessing();
      this.invoiceService.by_product({'filter':{'between':[this.from,this.to],"status":this.$refs.user_id.getValue()}})
          .then((response)=> {
            this.$refs.go.toggleProcessing();
            this.invoiceList = response.data.data.data
          });
    }

  },

  mounted() {
    this.$refs.go.toggleProcessing();
    this.invoiceService.$accessControl.getUsers().then((users)=>{
      this.users = users.data.data;
      this.invoiceService.by_product({'filter':{'between':[this.from,this.to],"status":"Paid"}})
          .then((response)=> {
            this.$refs.go.toggleProcessing();
            this.invoiceList = response.data.data.data
          });
    });

  }


}


</script>
