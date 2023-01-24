<template src="./listtransfer.html"></template>

<script>

import {TransferService} from "../transfer-service";
import transfer from "../../../../components/html/transfer.vue";
import button from "../../../../components/html/button.vue";


export default {

  components:{
    'app-transfer' : transfer,
    'app-button' : button
  },

  data() {

    return {
      columns: [],
      options: [],
      tableData: [],
      from : this.$user.settings.date,
      to : this.$user.settings.date,
    }

  },

  methods :{
    filterTransfer()
    {
      this.$refs.go.toggleProcessing()
      this.transferService.custom({'filter':{'between':[this.from,this.to]}}).then((response)=>{
        this.$refs.go.toggleProcessing()
        this.columns = response.data.data.columns
        this.tableData = response.data.data.data
      });
    }
  },

  computed: {

    transferService()
    {
      return new TransferService(this.$api);
    },



  },

  mounted() {
    this.$refs.go.toggleProcessing()
    this.transferService.custom({'filter':{'between':[this.from,this.to]}}).then((response)=>{
      this.$refs.go.toggleProcessing()
      this.columns = response.data.data.columns
      this.tableData = response.data.data.data
    });
  }

}

</script>
