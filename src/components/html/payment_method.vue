<template>

  <div class="d-flex flex-wrap justify-content-center justify-content-sm-start">

    <vue3-json-excel v-if="columns.length > 0" type="xls" class="btn btn-primary m-1" name="payment-methods-table.xls" :fields="columns" :json-data="tableData">Export Excel</vue3-json-excel>

    <vue3-json-excel v-if="columns.length > 0" type="csv" class="btn btn-secondary m-1" name="payment-methods-table.csv" :fields="columns" :json-data="tableData">Export CSV</vue3-json-excel>

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
        <th></th>
        <th></th>
        <th>{{ $currency(totalInvoice) }}</th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
    </template>


  </v-client-table>

</template>

<script>

export default {


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
    }

  },

  computed : {
    totalInvoice(){
      let total = 0;
      this.tableData.forEach((item,index) => {
        total+=parseFloat(item['Amount_'])
      })
      return total;
    }
  }

}

</script>
