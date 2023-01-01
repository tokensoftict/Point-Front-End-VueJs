<template>
  <vue-progress-bar></vue-progress-bar>
  <router-view/>

  <notifications position="bottom right" />
</template>

<style lang="scss" src="../src/assets/main.scss"></style>

<script>


export default {
  components: {
  },
  data() {
    return {
      date: null,
      config: {
        altFormat: "Y-m-d",
        altInput: true
      }
    }
  }
}
</script>
