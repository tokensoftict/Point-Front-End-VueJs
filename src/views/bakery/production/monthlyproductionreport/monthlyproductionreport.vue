<template src="./monthlyproductionreport.html"></template>


<script>




import textbox from "../../../../components/html/textbox.vue";
import button from "../../../../components/html/button.vue";
import textarea from "../../../../components/html/textarea.vue";
import file from "../../../../components/html/file.vue";
import select from "../../../../components/html/select.vue";
import production from "../../../../components/html/production.vue";
import {ProductionService} from "../production-service";

export default
{

  components: {
    'app-textbox': textbox,
    'app-button': button,
    'app-textarea': textarea,
    'app-file': file,
    'app-select': select,
    'app-production' : production,
  },

  data()
  {
    return {
      productionList : [],
      columns : [],
      options : [],
      from : this.$user.settings.monthly[0],
      to : this.$user.settings.monthly[1],
    }
  },

  computed : {
    productionService()
    {
      return new ProductionService(this.$api);
    },

  },

  methods: {

    filterReport()
    {
      this.$refs.go.toggleProcessing();
      this.productionService.custom({'filter':{'between':[this.from,this.to]}})
          .then((response)=> {
            this.$refs.go.toggleProcessing();
            this.productionList = response.data.data.data
            this.columns = response.data.data.columns
          });
    }

  },

  mounted() {
    this.$refs.go.toggleProcessing();
    this.productionService.custom({'filter':{'between':[this.from,this.to]}})
        .then((response)=> {
          this.$refs.go.toggleProcessing();
           this.productionList = response.data.data.data
           this.columns = response.data.data.columns
        });
  }


}


</script>
