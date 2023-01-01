<template src="./showtransfer.html"></template>

<script>

import {TransferService} from "../transfer-service";

export default {

  data(){
    return {
      materialItems : [],
      date : null,
      time : null,
      name : "",
      remark : "",
      production : {
        id : "",
        status : {
          name : ""
        }
      }
    }
  },

  computed: {

    transferService()
    {
      return new TransferService(this.$api);
    },

    material_total(){
      let purchase_total = 0;
      this.materialItems.forEach((item,index) => {
        purchase_total += (item.quantity * item.cost_price);
      });
      return purchase_total;
    },
  },


  props: ['id'],

  mounted() {
    this.transferService.show(this.id).then((response) => {
      this.materialItems = response.data.data["bakery_production_material_items"];

      this.name = response.data.data['name'];
      this.remark = response.data.data['remark'];

      this.date = response.data.data['production_date'];
      this.time = response.data.data['production_time'];

      this.production = response.data.data;
    });
  }

}

</script>
