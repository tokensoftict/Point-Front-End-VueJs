<template src="./listpurchase.html"></template>



<script>
import {PurchaseService} from "../purchase-service";
import purchase from "../../../../components/html/purchase.vue";

export default {

    components: {
      'app-purchase': purchase
    },

    data(){
        return {
            columns : [],
            options : [],
            tableData : []
        }
    },


    computed: {
        purchaseOrderService()
        {
            return new PurchaseService(this.$api);
        },
    },


    mounted() {

        this.getList();
    },

    methods:{
        getList(){
            this.purchaseOrderService.get().then( (response) => {
                this.columns = response.data.data.columns
                this.tableData = response.data.data.data
            });
        }
    }

}
</script>
