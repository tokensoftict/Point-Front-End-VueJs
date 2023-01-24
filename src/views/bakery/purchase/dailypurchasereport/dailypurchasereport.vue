<template src="./dailypurchasereport.html"></template>


<script>


import {PurchaseService} from "../purchase-service";
import purchase from "../../../../components/html/purchase.vue";
import button from "../../../../components/html/button.vue";


export default
{

  components: {
    'app-purchase' : purchase,
    'app-button' : button
  },

  data()
  {
    return {
      purchaseList : [],
      columns : [],
      options : [],
      from : this.$user.settings.date
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
      this.purchaseService.custom({'filter':{'date_created':this.from}})
          .then((response)=> {
            this.$refs.go.toggleProcessing();
            this.purchaseList = response.data.data.data
            this.columns = response.data.data.columns
          });
    }

  },

  mounted() {
    this.$refs.go.toggleProcessing();
    this.purchaseService.custom({'filter':{'date_created':this.from}})
        .then((response)=> {
          this.$refs.go.toggleProcessing();
          this.purchaseList = response.data.data.data
          this.columns = response.data.data.columns
        });
  }


}


</script>
