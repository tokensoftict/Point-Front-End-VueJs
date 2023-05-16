<template>

  <div class="flex-wrap justify-content-center justify-content-sm-start col-12">

    <vue3-json-excel v-if="columns.length > 0" type="xls" class="btn btn-primary m-1" name="invoice-table.xls" :fields="columns" :json-data="tableData">Export Excel</vue3-json-excel>

    <vue3-json-excel v-if="columns.length > 0" type="csv" class="btn btn-secondary m-1" name="invoice-table.xls" :fields="columns" :json-data="tableData">Export CSV</vue3-json-excel>

    <div class="float-end">
      <app-branch  design="sm" shift="40px" :refresh="refresh" :nolabel="false"></app-branch>
    </div>

  </div>



  <v-client-table :data="tableData" :ref="_ref" :columns="columns" :options="options">


    <template #No="props">
      {{ props.index }}
    </template>



    <template #afterBody>
      <tr>
        <th></th>
        <th></th>
        <th></th>
        <th>{{ $currency(totalSelling)}}</th>
        <th>{{ $currency(totalCost) }}</th>
      </tr>
    </template>

  </v-client-table>

</template>

<script>



import branch from "./branch.vue";

export default {

  components:{
    'app-branch' : branch
  },

  props : {

    tableData : {
      type : Object,
      default : []
    },

    columns : {
      type : Object,
      default : []
    },

    options : {
      type : Object,
      default : []
    },

    _ref: {
      type : String,
      default : ""
    },

    refresh :{
      type : Function,
      default : {
        return (){
        }
      }
    }

  },

  computed : {
    totalCost(){
      let total = 0;
      this.tableData.forEach((item,index) => {
          total+=parseFloat(item['Total Cost Price'])
      })
      return total;
    },
    totalSelling(){
      let total = 0;
      this.tableData.forEach((item,index) => {
        total+=parseFloat(item['Total Selling Price'])
      })
      return total;
    },
  }

}

</script>
