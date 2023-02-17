<template src="./myprofile.html"></template>


<script>

import {  ref } from 'vue';
import {AccessControl} from "../access-control";
import textbox from "../../../components/html/textbox.vue";
import button from "../../../components/html/button.vue";
import textarea from "../../../components/html/textarea.vue";
import file from "../../../components/html/file.vue";
import select from "../../../components/html/select.vue";



export default {

  components: {
    'app-textbox': textbox,
    'app-button': button,
    'app-textarea': textarea,
    'app-file': file,
    'app-select' : select,
  },

  data()
  {
    return {
      params : ref({
        name: this.$user.name,
        email: this.$user.email,
        username : this.$user.username ,
        password: "",
        phone: this.$user.phone,
      }),
    }
  },

  computed : {
    accessControl (){
      return new AccessControl(this.$api)
    }
  },


  methods :{


    updateProfile()
    {
      for(let key in this.params)
      {
        if(key !== "id" && key !=="password")
        {
          if(this.params[key] === "")
          {
            this.$helper.error(this.$notify,"My Profile","All Fields are required!")
            return false;
          }
        }
      }

      this.$refs.saveUser.toggleProcessing();

      this.accessControl.updateProfile(this.params).then((response)=>{
        this.$refs.saveUser.toggleProcessing();

        if(response.data.data.id)
        {
          this.$helper.success(this.$notify,"My Profile","Profile have been updated successfully, Please re-login to view changes to you profile");
          this.params.password = "";
          this.$user.name  =  this.params.name;
          this.$user.email =  this.params.email;
          this.$user.phone =  this.params.phone;
          this.$user.username = this.params.username;
        }

      })

    }
  }


}

</script>
