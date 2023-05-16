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
      logItems : [],
      stock_id : "",
      new_controls: ["bags","quantity","rough"]
    }
  },

  computed : {

    addLogModal()
    {
      return  new bootstrap.Modal(document.getElementById('addproduction'), {})
    },
    viewLogModal()
    {
      return  new bootstrap.Modal(document.getElementById('viewproduction'), {})
    },

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

    viewLog(stock_id){
      this.logItems = [];
      this.stock_id = stock_id;
      this.viewLogModal.show();

      this.productionService.view(stock_id, this.id).then((response)=>{
        console.log(response.data);
        let logs = response.data.data.data
        logs.map((item) => {
          item['buttonstatus'] = false;
          return item;
        });
        this.logItems = logs;
      })

    },

    deleteLog(log_id)
    {
      if(confirm("Are you sure, you want delete this log") === true) {

        this.logItems = this.logItems.map((item) => {
          if(item.id == log_id){
            item['buttonstatus'] = true;
          }
          return item;
        });

        this.productionService.removeLog(log_id)
            .then((response) => {
              this.product_Items = [];
              this.getProduction();
              this.$notify({
                title: "Point",
                type: "success",
                text: "Log as been deleted successfully"
              })

              this.viewLogModal.hide();

            });
      }
    },

    addLog()
    {
      if (this.$helper.validateSingle(this.$refs, this.new_controls) === false) {

        this.$refs.addlog.toggleProcessing();

        const data = new FormData;

        for (let key of this.new_controls) {

          data.set(key.replace("update_",""), this.$refs[key].getValue());

        }

        this.productionService.log(this.stock_id, this.id, data)
            .then((response) =>{
              this.logItems = response.data.data.data;

              this.$notify({
                title: "Point",
                type: "success",
                text: "Log as been added successfully"
              })

              this.$refs.addlog.toggleProcessing();

              for (let key of this.new_controls) {
                this.$refs[key].setValue("");
              }

              this.product_Items = [];

              this.getProduction();

              this.viewLogModal.hide();

            });
      }
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

            this.$helper.success(this.$notify,"Production has been completed successful and quantity has been transferred successfully");

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
