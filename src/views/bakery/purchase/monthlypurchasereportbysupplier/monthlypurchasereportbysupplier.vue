<template src="./monthlypurchasereportbysupplier.html"></template>


<script>


import {PurchaseService} from "../purchase-service";
import purchase from "../../../../components/html/purchase.vue";
import button from "../../../../components/html/button.vue";
import select from "../../../../components/html/select.vue";


export default
{

  components: {
    'app-purchase' : purchase,
    'app-button' : button,
    'app-select' : select
  },

  data()
  {
    return {
      purchaseList : [],
      columns : [],
      options : [],
      from : this.$user.settings.monthly[0],
      to : this.$user.settings.monthly[1],
      suppliers : [],
      supplier_id : 1
    }
  },

  computed : {
    purchaseService() {
      return new PurchaseService(this.$api)
    },

  },

  methods: {

    filterReport()
    {
      this.$refs.go.toggleProcessing();
      this.purchaseService.custom({'filter':{'between':[this.from,this.to],"supplier_id":this.supplier_id}})
          .then((response)=> {
            this.$refs.go.toggleProcessing();
            this.purchaseList = response.data.data.data
            this.columns = response.data.data.columns
          });
    }

  },

  mounted() {
    this.$refs.go.toggleProcessing();
    this.purchaseService.$suppler.get().then((sup)=>{
      this.suppliers = sup.data.data
      this.purchaseService.custom({'filter':{'between':[this.from,this.to],"supplier_id":1}})
          .then((response)=> {
            this.$refs.go.toggleProcessing();
            this.purchaseList = response.data.data.data
            this.columns = response.data.data.columns
          });
    })
  }


}


</script>
