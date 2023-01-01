<template src="./newproduction.html"></template>

<style src="./newproduction.css"></style>

<script>


import _ from "lodash";
import textbox from "../../../../components/html/textbox.vue";
import button from "../../../../components/html/button.vue";
import textarea from "../../../../components/html/textarea.vue";
import file from "../../../../components/html/file.vue";
import select from "../../../../components/html/select.vue";

import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import {RawmaterialService} from "../../material/rawmaterial-service";
import {StockService} from "../../../stock/stockService";
import {ProductionService} from "../production-service";



export default {


  components: {
    'app-textbox': textbox,
    'app-button': button,
    'app-textarea': textarea,
    'app-file': file,
    'app-select': select,
    Multiselect : Multiselect
  },

  computed: {

    _date(){
      return new Date(this.date).toISOString().slice(0, 10);
    },
    materialService() {
      return new RawmaterialService(this.$api)
    },
    productService() {
      return new StockService(this.$api);
    },
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
    product_total(){
      let product_total = 0;
      this.product_Items.forEach((item,index) => {
        product_total += (item.quantity * item.selling_price);
      });
      return product_total;
    },
    prepare_data(){
      return {
        production_date : this.date,
        production_time: this.time,
        name : this.$refs.name.getValue(),
        remark : this.$refs.remark.getValue(),
        items : this.materialItems,
        products : this.product_Items
      }
    }
  },

  data(){
    return {
      time : new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
      date : new Date().toISOString().slice(0, 10),
      timeConfig : {
        enableTime: true,
        noCalendar: true,
        dateFormat: "h:i K",
        altInput: true,
        altFormat: "h:i K",
      },
      selected: null,
      isSubmittedLoading : false,
      results: [],
      isLoading: false,
      materialItems : [],
      name : "",
      remark : "",
      // for product

      product_selected : null,
      product_results: [],
      product_isLoading : false,
      product_Items : []
    }
  },

  methods : {
    async getItems(search) {
      if(search.length > 3) {
        this.isLoading = true
        this.search(search, this);
      }
    },

    search: _.debounce((search, vm) => {
      vm.materialService.availableSearch({query:search},).then((response) => {
        vm.results = response.data.data
        vm.isLoading = false
      });
    }, 350),

    removeItem(index){
      this.materialItems.splice(index,1);
    },

    addItem(){
      let existing = false;
      this.materialItems.forEach((item,index) => {
        if(item.id === this.selected.id){
          existing = true;
        }
      });

      if(this.$refs.quantity.getValue() > this.selected.quantity)
      {
        this.$refs.quantity.showError("Quantity can not be more than "+this.selected.quantity);
        return ;
      }

      if(existing === true)
      {
        this.$notify(
            {
              title:"Error",
              text:"Material Already exist in the list",
              type: 'error',
              duration: 2000,
            }); return ;
      }


      if (this.$helper.validateSingle(this.$refs, ['quantity']) === false) {
        const item = {
          id: this.selected.id,
          cost_price: this.selected.cost_price,
          quantity: this.$refs.quantity.getValue(),
          name: this.selected.name,
        }

        this.$refs.quantity.valid = true;

        this.$refs.quantity.setValue("");

        this.materialItems.push(item);

        this.selected = null;

      }
    },

    // for product

    async getProducts(search)
    {
      if(search.length > 3) {
        this.product_isLoading = true
        this.searchProduct(search, this);
      }
    },

    searchProduct: _.debounce((search, vm) => {

      vm.productService.search({query:search},).then((response) => {

        vm.product_results = response.data.data
        vm.product_isLoading = false
      });

    }, 350),


    removeProduct(index){
      this.product_Items.splice(index,1);
    },

    addProduct(){
      let existing = false;
      this.product_Items.forEach((item,index) => {
        if(item.id === this.selected.id){
          existing = true;
        }
      });

      if(existing === true)
      {
        this.$notify(
            {
              title:"Error",
              text:"Product already exist in the list",
              type: 'error',
              duration: 2000,
            }); return ;
      }


      if (this.$helper.validateSingle(this.$refs, ['product_quantity']) === false) {
        const item = {
          id: this.product_selected.id,
          selling_price: this.product_selected.selling_price,
          quantity: this.$refs.product_quantity.getValue(),
          name: this.product_selected.name,
        }

        this.$refs.product_quantity.valid = true;

        this.$refs.product_quantity.setValue("");

        this.product_Items.push(item);

        this.product_selected = null;

      }
    },



    validateBasic()
    {
      return !(this.$helper.validateSingle(this.$refs,['name']));
    },

    validateProduct()
    {

      const validate = this.product_Items.length > 0;

      if(!validate) this.$helper.error(this.$notify,"Production","Please add one more product for production");

      this.name = this.$refs.name.getValue();
      this.remark = this.$refs.remark.getValue();

      return validate;

    },

    validateMaterial()
    {

      const validate = this.materialItems.length > 0;

      if(!validate) this.$helper.error(this.$notify,"Production","Please add one more material for production");

      return validate;

    },

    completeProduction()
    {
      this.productionService.post(this.prepare_data,this.id)
          .then((response)=>{

              if(this.id !== undefined)
              {
                this.$helper.success(this.$notify,"Production has been created successful");
              }
             else
              {
                this.$helper.success(this.$notify,"Production has been updated successful");
              }

             this.materialItems = [];
             this.product_Items = [];
             document.getElementById("myform").reset();
             this.$refs.form_wizard.reset();
          });
    },

    getProduction()
    {
      this.productionService.show(this.id).then((response) => {

        this.product_Items = response.data.data["bakery_production_products_items"];
        this.materialItems = response.data.data["bakery_production_material_items"];

        this.$refs.name.setValue(response.data.data['name']);
        this.$refs.remark.setValue(response.data.data['remark']);

        this.date = response.data.data['production_date'];
        this.time = response.data.data['production_time'];

      })
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
