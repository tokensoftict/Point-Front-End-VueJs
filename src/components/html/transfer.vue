<template>

  <v-client-table :data="tableData" ref="customer_table" :columns="columns" :options="options">

    <template #Status="props">
      <span class="badge me-1" :class="'badge-'+props.row.Status.label">{{ props.row.Status.name }}</span>
    </template>

    <template #No="props">
      {{ props.index }}
    </template>

    <template #request_by="props">
      {{ props.row.request_by.name }}
    </template>


    <template #total_material="props">
      {{ $currency(props.row.total_material) }}
    </template>

    <template #profit="props">
      {{ $currency(props.row.profit) }}
    </template>

    <template #Action="props">
      <div class="btn-group dropup  dropdown custom-dropdown" v-if="$user.access.includes('/bakeryManager/transfer/:id/show')">
        <button id="btnGroupVerticalDrop1" type="button" class="btn btn-sm btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Action
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
        <div class="dropdown-menu" aria-labelledby="btnGroupVerticalDrop1">
          <router-link v-for="(link,index) in props.row.action" class="dropdown-item" :to="link">{{ index }}</router-link>

        </div>
      </div>
    </template>

    <!--
        <template #Action="props">
            <router-link :to="{ name : 'edit-productions',  params: {id: props.row.id} }" class=" text-white btn btn-sm btn-primary"><i class="far fa-1x fa-edit"></i></router-link>
        </template>
        -->
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
