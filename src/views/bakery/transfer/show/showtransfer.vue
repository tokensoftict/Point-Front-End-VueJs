<template src="./showtransfer.html"></template>

<script>

import textbox from "../../../../components/html/textbox.vue";
import button from "../../../../components/html/button.vue";
import textarea from "../../../../components/html/textarea.vue";
import file from "../../../../components/html/file.vue";

import {TransferService} from "../transfer-service";
import select from "../../../../components/html/select.vue";

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

  methods : {
    get()
    {
      this.transferService.show(this.id).then((response) => {
        this.materialItems = response.data.data["bakery_production_material_items"];

        this.name = response.data.data['name'];
        this.remark = response.data.data['remark'];

        this.date = response.data.data['production_date'];
        this.time = response.data.data['production_time'];

        this.production = response.data.data;
      });
    },

    resetpage()
    {
      this.materialItems =[];

      this.name = ''
      this.remark = ''

      this.date = ''
      this.time = ''

      this.production =  {
        id : "",
        status : {
          name : ""
        }
      };
    },

    approve(){
      if(confirm("Are you sure want approve the transfer, This can not be reversed..!") === true)
      {
        this.$refs.approve.toggleProcessing();
        this.$refs.decline.toggleProcessing();
        this.resetpage();
        this.transferService.accept(this.id).then((response)=>{
          this.$helper.success(this.$notify,"Bakery Management","Material has been approved and transferred successfully!")
          this.get();
          this.$refs.approve.toggleProcessing();
          this.$refs.decline.toggleProcessing();
        });
      }
    },
    decline(){
      if(confirm("Are you sure want decline the transfer, This can not be reversed..!") === true)
      {
        this.$refs.decline.toggleProcessing();
        this.$refs.approve.toggleProcessing();
        this.resetpage();
        this.transferService.decline(this.id).then((response)=>{
          this.$helper.success(this.$notify,"Bakery Management","Material transfer has been declined successfully!")
          this.get();
          this.$refs.decline.toggleProcessing();
          this.$refs.approve.toggleProcessing();
        });
      }
    },

  },

  props: ['id'],

  mounted() {
    this.get();
  }


}

</script>
