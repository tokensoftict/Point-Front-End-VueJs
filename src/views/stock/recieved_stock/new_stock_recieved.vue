<template src="./new_stock_recieved.html"></template>

<script>

import textbox from "../../../components/html/textbox.vue";
import button from "../../../components/html/button.vue";
import textarea from "../../../components/html/textarea.vue";
import file from "../../../components/html/file.vue";
import select from "../../../components/html/select.vue";
import branch from "@/components/html/branch.vue";
import {StockService} from "../stockService";


export default {

  components: {
    'app-textbox': textbox,
    'app-button': button,
    'app-textarea': textarea,
    'app-file': file,
    'app-select': select,
  },

  data(){
    return {
      categories : [],
      manufacturers : [],
      classifications : [],
      groups : [],
      brands : [],
      suppliers : [],
      branches : [],
      stocks: []
    }
  },

  computed :{

    stockService(){
      return new StockService(this.$api)
    },

  },

  methods : {
    getRequisites()
    {
      this.stockService.getRequesiteData().then((response) => {
        const data = response.data.data;

        this.categories = data.categories;
        this.manufacturers = data.manufacturers;
        this.classifications = data.classifications;
        this.groups = data.groups;
        this.brands = data.brands;
        this.suppliers = data.suppliers;
        this.branches = data.branches;
        this.stocks = data.stocks;
      })


    },
    saveData()
    {
      if(this.$helper.validate(this.$refs) === false){
        this.$refs.save_button.toggleProcessing();
        const storedata = new FormData;
        for(let key in this.$refs)
        {
          if(typeof this.$refs[key].valid !== "undefined" && this.$refs[key].getValue() !== ""){
            storedata.set(key,this.$refs[key].getValue());
          }
        }

          this.stockService.postNewStockBatch(storedata).then((response) => {
            this.$refs.save_button.toggleProcessing();
            document.getElementById("myform").reset();
            this.$helper.success(this.$notify,"Stock","Stock has been posted successfully!");
          })


      }
    }
  },

  mounted() {
    this.getRequisites();
  },



}


</script>