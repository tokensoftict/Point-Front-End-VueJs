<template src="./available.html"></template>


<script>

import {RawmaterialService} from "../rawmaterial-service";
import branch from "../../../../components/html/branch.vue";


export default {

  components :{
    'app-branch' : branch
  },

  data(){
    return {
      tableData : [],
      columns: ['No','name','Branch','Quantity','description','type' ,'status'],
      options : []
    }
  },

  computed: {
    materialService() {
      return new RawmaterialService(this.$api)
    },
  },

  methods : {
    getData(){
      this.materialService.get().then( (response) => {
        this.tableData = response.data.data;
      });
    }
  },

  mounted() {
    this.getData()
  }

}

</script>
