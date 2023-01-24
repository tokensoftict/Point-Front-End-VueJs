<template src="./listproduction.html"></template>

<script>


import {ProductionService} from "../production-service.js";
import textbox from "../../../../components/html/textbox.vue";
import button from "../../../../components/html/button.vue";
import textarea from "../../../../components/html/textarea.vue";
import file from "../../../../components/html/file.vue";
import select from "../../../../components/html/select.vue";
import production from "../../../../components/html/production.vue";

export default {

  components: {
    'app-textbox': textbox,
    'app-button': button,
    'app-textarea': textarea,
    'app-file': file,
    'app-production': production,
    'app-select': select,
  },

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
