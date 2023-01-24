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
  },
  mounted() {
    this.$user.refresh();
    let routes = [];
    this.$router.options.routes.forEach(route => {
      if(route.path !== "/" && route.path !== "/dashboard") {
        routes.push(
            {
              'name': route.name,
              'path' : route.path,
              'moduleName' : route.modulename,
              'children' :( route.children ? route.children.map(child => (
                      {
                        name: child.name,
                        path: route.path+"/"+child.path,
                        title : child.title
                      }
                  ))
                  : [] )
            }
        )
      }
    });
    if(this.$user.status !== false)
    {
       this.$api.post("settings/store/syncTask",{'routes' : routes}).then((response)=>{});
    }

    setInterval(function(){
      var elem = document.getElementsByClassName('VueTables__table');
      if(elem.length > 0) {
        for (let i = 0; i < elem.length; i++) {
          elem[i].removeAttribute('style');
        }
      }
    },1000);

  }
}
</script>
