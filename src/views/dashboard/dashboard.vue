<template src="./dashboard.html"></template>


<script>

import dashboard_service from "./dashboard-service";



export default {

    mounted() {
        dashboard_service.api = this;

    }


}

</script>
