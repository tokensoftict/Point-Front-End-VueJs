<template src="./showproduction.html"></template>


<script>

import hyperbutton from "../../../../components/html/hyperbutton.vue";
import button from "../../../../components/html/button.vue";
import {ProductionService} from "../production-service";


export default {

  components: {
    'app-button': button,
    'app-hyperbutton': hyperbutton,
  },

  computed: {

    productionService()
    {
      return new ProductionService(this.$api);
    },

    material_total(){
      let purchase_total = 0;
      this.materialItems.forEach((item,index) => {
        purchase_total += (item.quantity * item.cost_price);
      });
      return purchase_total;
    },
    extimate_product_total(){
      let product_total = 0;
      this.product_Items.forEach((item,index) => {
        product_total += (item.estimate_quantity * item.selling_price);
      });
      return product_total;
    },
    product_total(){
      let product_total = 0;
      this.product_Items.forEach((item,index) => {
        product_total += (item.quantity * item.selling_price);
      });
      return product_total;
    },
  },

  data(){
    return {
      product_Items : [],
      materialItems : [],
      date : null,
      time : null,
      name : "",
      remark : "",
      production : {
        id : "",
        status : {
          name : ""
        },
        created_by : {
          name : ""
        },
        completed_by : {
          name : ""
        },
      }
    }
  },

  props : ['id'],
  methods :{
    print(){
      window.print()
    },

    getProduction()
    {
      this.productionService.show(this.id)
          .then((response)=>{
            this.product_Items = response.data.data["bakery_production_products_items"];
            this.materialItems = response.data.data["bakery_production_material_items"];

            this.name = response.data.data['name'];
            this.remark = response.data.data['remark'];

            this.date = response.data.data['production_date'];
            this.time = response.data.data['production_time'];

            this.production = response.data.data;
          });
    },

    completeProduction()
    {

    }
  },

  mounted(){
    this.getProduction();
  }

}

</script>


