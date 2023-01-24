<template src="./newInvoice.html"></template>
<style>
.np-title {
  margin-left: 20px;
  margin-top: 30px;
  font-size: 18px;
  color: rgb(0, 64, 255);
}

.np-input-search:hover {
  background: rgb(225, 225, 225);
  transition: all 0.4s;
}
.np-result-container {
  margin-top: -10px;
  text-align: left;
  position: absolute;
  width: 100%;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0px 1px 6px 1px rgb(0 0 0 / 40%);
}
.np-result-item {
  width: 100%;
  border: 1px solid #eee;
  padding: 4px 8px;
  cursor: pointer;
  transition: all 0.3s;
}
.np-result-item:hover {
  background: #eee;
  transition: all 0.3s;
}
.np-result-description {
  font-size: 11px;
}
.np-ib {
  display: inline-block;
}

.np-text-container {
  width: 100%;
  vertical-align: top;
  padding-left: 5px;
  color: black;
}


.np-result-details-title {
  font-size: 20px;
  padding: 8px 0px;
  font-weight: 500;
}
.np-result-details-description {
  font-size: 16px;
}
</style>

<script>

import textbox from "../../../components/html/textbox.vue";
import button from "../../../components/html/button.vue";
import textarea from "../../../components/html/textarea.vue";
import file from "../../../components/html/file.vue";
import select from "../../../components/html/select.vue";
import { NumberSpinner } from 'vue3-number-spinner'
import {InvoiceService} from "../invoice-service";
import _ from "lodash";
export default
{

  components: {
    'app-textbox': textbox,
    'app-button': button,
    'app-textarea': textarea,
    'app-file': file,
    'app-select': select,
    'app-number-spinner' :  NumberSpinner
  },

  data()
  {
    return {
      new_controls: ['firstname','lastname','company_name' ,'email', 'address','phone_number'],
      searchbox : "",
      customerbox : "",
      filteredResult : [],
      filteredCustomer : [],
      products :  [],
      selectedCustomer : {
        "name": "",
        "phone_number" : "",
        "email" : "",
        "id" : ""
      },
      invoice_date : this.$user.settings.date
    }
  },

  computed :{

    invoiceService(){
      return new InvoiceService(this.$api)
    },

    newModal()
    {
      return  new bootstrap.Modal(document.getElementById('newCustomer'), {})
    },

    invoiceTotal()
    {
      let total = 0;
      this.products.forEach((item,index) => {
        total += ((item.selling_quantity === undefined ? 0 : item.selling_quantity) * item.selling_price);
      });
      return total;
    },

    prepare_data()
    {

      return {
        "customer_id" : this.selectedCustomer.id,
        "items" : this.products,
        "date" : this.invoice_date,
      }

    }

  },

  methods: {

    productSearch(event)
    {
      if(event.target.value.length > 2)
      {
        this.product_Search(event.target.value,this);
      }
      else
      {
        this.filteredResult = [];
      }
    },

    product_Search : _.debounce(( search, vm) => {
      vm.invoiceService.$stock.searchAvailable({"query":search})
          .then((response)=>{
            vm.filteredResult = response.data.data;
          });
    }),


    addProduct(selectedItem)
    {
      this.filteredResult = [];
      this.searchbox = "";

      let existing = false;

      this.products.forEach((item,index) => {
        if(item.id === selectedItem.id){
          existing = true;
        }
        this.invoiceTotal += (item.quantity * item.cost_price);
      });

      if(existing === true)
      {
        this.$helper.error(this.$notify,"Invoice",selectedItem.name+" already exists in the product lists")
        return false;
      }

      selectedItem['selling_quantity'] = 1;
      selectedItem['error'] = false;

      this.products.push(selectedItem);


    },

    removeItem(index)
    {
      this.products.splice(index,1);
    },

    customerSearch(event)
    {
      if(event.target.value.length > 2)
      {
        this.customer_search(event.target.value, this);
      }
    },

    customer_search : _.debounce((search, vm) => {
      vm.invoiceService.$customer.search({"search":search})
          .then((response)=>{
            vm.filteredCustomer = response.data.data;
          });
    }),

    selectCustomer(customer)
    {
      this.selectedCustomer = customer;
      this.filteredCustomer = [];
      this.customerbox = "";
    },

    save() {

      if (this.$helper.validateSingle(this.$refs, this.new_controls) === false) {

        this.$refs.submit_button.toggleProcessing();

        const storedata = new FormData;

        for (let key of this.new_controls) {

          if (typeof this.$refs[key].valid !== "undefined") {

            storedata.set(key, this.$refs[key].getValue());

          }

        }

        this.invoiceService.$customer.post(storedata)
            .then((response) => {
              this.$refs.submit_button.toggleProcessing();
              this.newModal.hide();
              this.$refs.newform.reset()
              this.$notify({
                title: "Point",
                type: "success",
                text: "Customer added Successfully"
              });
              this.selectedCustomer = response.data.data;
            })
            .catch((response) => {
              this.$refs.submit_button.toggleProcessing();
            })

      }

    },

    saveInvoice()
    {
      if(this.selectedCustomer.name === "")
      {
        this.$helper.error(this.$notify,"Invoice","Please select a customer");
        return false;
      }

      if(this.invoice_date === "")
      {
        this.$helper.error(this.$notify,"Invoice","Please select Invoice date");
        return false;
      }

      if(this.products.length === 0)
      {
        this.$helper.error(this.$notify,"Invoice","Please add product to invoice");
        return false;
      }

      this.$refs.complete_purchase.toggleProcessing();

      this.invoiceService.save(this.prepare_data,this.id)
          .then((response)=> {
            this.$refs.complete_purchase.toggleProcessing();
            let data = response.data.data;
            if(data.status === true)
            {
              this.selectedCustomer = {
                "name": "",
                "phone_number" : "",
                "email" : "",
                "id" : ""
              };

              this.products = [];

              if(this.id === undefined)
              {
                this.$helper.success(this.$notify,"Invoice","Invoice has been Generated Successfully");
              }
              else
              {
                this.$helper.success(this.$notify,"Invoice","Invoice has been Updated Successfully");

                setTimeout(()=> {
                    this.$router.push({name : 'show-invoice', param : {"id":this.id}});
                },1200)

              }

            }
            else
            {
              const errors = data.error.errors;

              for (let key of Object.keys(errors)) {
                this.products[key]['error'] = errors[key];
              }


            }
          });
    }

  },

  props : ["id"],

  mounted() {

      if(this.id !== undefined)
      {
        this.invoiceService.show(this.id).then((response)=>{
            this.products = response.data.data.items
            this.invoice_date = response.data.data.invoice_date;

            this.selectedCustomer = response.data.data.customer;
        });
      }

  }

}


</script>
