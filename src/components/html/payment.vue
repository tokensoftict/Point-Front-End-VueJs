<template>

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
        total+=parseFloat(item['total_paid'])
      })
      return total;
    }
  }

}

</script>
