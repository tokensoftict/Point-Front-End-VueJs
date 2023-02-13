<template>

  <div class=" flex-wrap justify-content-center justify-content-sm-start">

    <vue3-json-excel v-if="columns.length > 0" type="xls" class="btn btn-primary m-1" name="payment-table.xls" :fields="columns" :json-data="tableData">Export Excel</vue3-json-excel>

    <vue3-json-excel v-if="columns.length > 0" type="csv" class="btn btn-secondary m-1" name="payment-table.csv" :fields="columns" :json-data="tableData">Export CSV</vue3-json-excel>

    <div class="float-end">
      <app-branch  design="sm" shift="40px" :refresh="refresh" :nolabel="false"></app-branch>
    </div>

  </div>

  <v-client-table :data="tableData" :ref="_ref" :columns="columns" :options="options">



    <template #No="props">
      {{ props.index }}
    </template>

    <template #Action="props">
      <div class="btn-group dropup dropdown custom-dropdown">
        <button id="btnGroupVerticalDrop1" type="button" class="btn btn-sm btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Action
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
        <div class="dropdown-menu" aria-labelledby="btnGroupVerticalDrop1">
          <template v-for="(link,index) in props.row.Action">
            <router-link  v-if="link.type==='internal' && $user.access.includes(link['permission'])" class="dropdown-item" :to="link.link">{{ index }}</router-link>

            <a  @click="$user.popMenu(link.link)" v-if="link.type==='external' && $user.access.includes(link['permission'])"  href="javascript:;" class="dropdown-item">{{ index }}</a>
          </template>
        </div>
      </div>
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
        <th></th>
        <th></th>
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
    totalInvoice(){
      let total = 0;
      this.tableData.forEach((item,index) => {
        total+=parseFloat(item['total_paid'])
      })
      return total;
    }
  }

}

</script>
