<template>
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
