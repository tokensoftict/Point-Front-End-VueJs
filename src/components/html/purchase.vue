<template>

  <div class=" flex-wrap justify-content-center justify-content-sm-start">

    <vue3-json-excel v-if="columns.length > 0" type="xls" class="btn btn-primary m-1" name="purchase-order-table.xls" :fields="columns" :json-data="tableData">Export Excel</vue3-json-excel>

    <vue3-json-excel v-if="columns.length > 0" type="csv" class="btn btn-secondary m-1" name="purchase-order-table.csv" :fields="columns" :json-data="tableData">Export CSV</vue3-json-excel>


    <div class="float-end">
      <app-branch  design="sm" shift="40px" :refresh="refresh" :nolabel="false"></app-branch>
    </div>

  </div>

  <v-client-table :data="tableData" v-if="$user.access.includes('/bakeryManager/purchase/add')" ref="customer_table" :columns="columns" :options="options">
    <template #beforeFilter>
      <router-link to="/bakeryManager/purchase/add" class="btn me-2 btn-primary">New Material Purchase
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-plus"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </router-link>
    </template>

    <template #Status="props">
      <span class="badge me-1" :class="'badge-'+props.row.Status.label">{{ props.row.Status.name }}</span>
    </template>

    <template #No="props">
      {{ props.index }}
    </template>

    <template #Action="props">
      <router-link v-if="$user.access.includes('/bakeryManager/purchase/:id/show')" :to="{ name : 'show-purchase-Material',  params: {id: props.row.id} }" class=" text-white btn btn-sm btn-primary"><i class="far fa-1x fa-eye"></i></router-link>
      &nbsp; &nbsp;
      <router-link v-if="$user.access.includes('/bakeryManager/purchase/:id/complete') && props.row.Status.name !== 'Complete'" :to="{ name : 'edit-purchase-Material',  params: {id: props.row.id} }" class=" text-white btn btn-sm btn-success"><i class="far fa-1x fa-edit"></i></router-link>
    </template>


    <template #afterBody>
      <tr>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th>{{ $currency(total_purchase) }}</th>
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
    total_purchase() {
      let total = 0;
      this.tableData.forEach((item, index) => {
        console.log(item['Total_']);
        total += parseFloat(item['Total_'])
      })
      return total;
    },
  }
}

</script>
