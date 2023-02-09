<template>

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
