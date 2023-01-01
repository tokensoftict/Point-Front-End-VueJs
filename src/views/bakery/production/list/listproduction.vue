<template src="./listproduction.html"></template>

<script>


import {ProductionService} from "../production-service";

export default {

  data() {
    return {
      columns: [],
      options: [],
      tableData: []
    }
  },

  computed: {
    productionService()
    {
      return new ProductionService(this.$api);
    },
  },

  mounted() {
    this.getList();
  },

  methods:{
    getList(){
      this.productionService.get().then( (response) => {
        this.columns = response.data.data.columns
        this.tableData = response.data.data.data
      });
    }
  }

}


</script>
