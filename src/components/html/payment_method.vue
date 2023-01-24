<template>

  <v-client-table :data="tableData" :ref="_ref" :columns="columns" :options="options">

    <template #No="props">
      {{ props.index }}
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

  }

}

</script>
