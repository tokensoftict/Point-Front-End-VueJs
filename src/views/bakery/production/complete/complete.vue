<template src="./complete.html"></template>


<script>

import textbox from "../../../../components/html/textbox.vue";
import button from "../../../../components/html/button.vue";
import textarea from "../../../../components/html/textarea.vue";
import file from "../../../../components/html/file.vue";
import select from "../../../../components/html/select.vue";
import Multiselect from "@suadelabs/vue3-multiselect";
import {ProductionService} from "../production-service";

export default {

  components : {
    'app-textbox': textbox,
    'app-button': button,
    'app-textarea': textarea,
    'app-file': file,
    'app-select': select,
    Multiselect : Multiselect
  },


  data(){
    return {
      submitted  : false,
      product_Items: [],
    }
  },

  computed : {
    prepare_data(){
      return {
        products : this.product_Items
      }
    },
    productionService()
    {
      return new ProductionService(this.$api);
    },

    product_total(){
      let product_total = 0;
      this.product_Items.forEach((item,index) => {
        product_total += (item.quantity * item.selling_price);
      });
      return product_total;
    },
  },



  methods : {
    getProduction()
    {
      this.productionService.show(this.id).then((response) => {

        this.product_Items = response.data.data["bakery_production_products_items"];

      })
    },

    toggleError(index)
    {
      if(parseInt(this.product_Items[index]['quantity']) > 0)
      {
        this.product_Items[index]['error_status'] = false;
      }
      else
      {
        this.product_Items[index]['error_status'] = true;
      }
    },

    completeProduction()
    {
      let existing = false
      this.product_Items.forEach((item,index) => {
        if(parseInt(item.quantity) === 0 || parseInt(item.quantity) < 0 || isNaN(parseInt(item.quantity))  ){
          existing = true;
          this.product_Items[index]['error_status'] = true;
        }
        else
        {
          this.product_Items[index]['error_status'] = false;
        }
      });

      if(existing === true) return false;

      this.$refs.submit_button.toggleProcessing();

      this.productionService.complete(this.prepare_data,this.id)
          .then((response)=>{

            this.$helper.success(this.$notify,"Production has been completed successful and quantity has been transfered successfully");

            this.$router.push({name :"show-productions",params:{id : this.id}})

          });

    }

  },

  props : ["id"],

  mounted() {
    if(this.id !== undefined)
    {
      this.getProduction();
    }
  }

}

</script>
