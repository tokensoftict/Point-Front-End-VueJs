<template src="./header.html"></template>

<script>

export default {


  methods : {

      logout()
      {
        this.$user.logout(this);
      }
  }


}

</script>

