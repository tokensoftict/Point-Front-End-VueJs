<template src="./listtransfer.html"></template>

<script>

import {TransferService} from "../transfer-service";


export default {

  data() {

    return {
      columns: [],
      options: [],
      tableData: []
    }

  },


  computed: {

    transferService()
    {
      return new TransferService(this.$api);
    },

  },

  mounted() {
    this.transferService.get().then((response)=>{
      this.columns = response.data.data.columns
      this.tableData = response.data.data.data
    });
  }

}

</script>
