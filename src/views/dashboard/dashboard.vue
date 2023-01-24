<template src="./dashboard.html"></template>


<script>


import {DashboardService} from "./dashboard-service";

export default {

  data(){
    return {
      creditorList : [],
      columns: ['firstname','lastname','company_name', 'phone_number', 'credit_balance'],
      options: {
        perPage: 10,
        perPageValues: [100, 500, 1000, 3000],
        skin: 'table',
        columnsClasses: {actions: 'actions text-center'},
        pagination: {nav: 'scroll', chunk: 5},
        texts: {
          count: 'Showing {from} to {to} of {count}',
          filter: '',
          filterPlaceholder: 'Search...',
          limit: 'Results:',
        },
        sortable: ['id', 'type', 'action'],
        sortIcon: {
          base: 'sort-icon-none',
          up: 'sort-icon-asc',
          down: 'sort-icon-desc',
        },
        resizableColumns: false,
      },
    }
  },

  computed : {
    dashboardService()
    {
      return new DashboardService(this.$api);
    },
    creditorModal()
    {
      return  new bootstrap.Modal(document.getElementById('creditorsPop'), {})
    },
  },


  methods:{
    creditors()
    {
      this.dashboardService.customer.creditors().then((response)=>{
        this.creditorList = response.data.data;
        if(this.creditorList.length > 0)
        {
          this.creditorModal.show();
        }
      });
    }
  },

  mounted() {
    if(this.$user.showCreditPop === false)
    {
      this.$user.showCreditPop = true;
      this.creditors();
    }

  }

}

</script>
