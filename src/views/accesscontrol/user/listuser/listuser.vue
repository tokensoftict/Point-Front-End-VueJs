<template src="./listuser.html"></template>

<style scoped>
.searchable-container .switch {
  width: auto;
  height: auto;
}
.searchable-container .searchable-items.grid .items .user-profile .custom-checkbox {
  display: none !important;
}
</style>

<script>

import {  ref } from 'vue';
import {AccessControl} from "../../access-control";
import textbox from "../../../../components/html/textbox.vue";
import button from "../../../../components/html/button.vue";
import textarea from "../../../../components/html/textarea.vue";
import file from "../../../../components/html/file.vue";
import select from "../../../../components/html/select.vue";
import Multiselect from "@suadelabs/vue3-multiselect";


export default {

  components: {
    'app-textbox': textbox,
    'app-button': button,
    'app-textarea': textarea,
    'app-file': file,
    'app-select' : select,
    Multiselect : Multiselect
  },

  data()
  {
    return {
      params : ref({ id: null, name: '', email: '', username : '' ,password: null, usergroup_id:'' ,phone: '', branch_id : ''  }),
      contacts_list :[],
      filterd_contacts_list : ref([]),
      search_user : '',
      ids : ref([]),
      grid_type : ref('list'),
      groups : ref([]),
      branches : ref([])
    }
  },

  computed :{

    addContactModal()
    {
      return  new window.bootstrap.Modal(document.getElementById('addContactModal'));
    },

    accessControl()
    {
      return new AccessControl(this.$api);
    }


  },


  methods : {

    getUsers(){
      this.accessControl.getUsers().then((response)=>{
        this.contacts_list = response.data.data;
        this.filterd_contacts_list = response.data.data;
      })
    },

    getGroups()
    {
      this.accessControl.get().then((response)=>{
        this.groups = ref(response.data.data);
      });
    },

    saveUser()
    {

      for(var key in this.params)
      {
        if(key !== "id" && key !=="password")
        {
          if(this.params[key] === "")
          {
            this.$helper.error(this.$notify,"User Management","All Fields are required!")
            return false;
          }
        }
      }

      this.$refs.saveUser.toggleProcessing();
      const removeKeys = ['permission' ,'token' , 'user_token', 'created_at', 'updated_at', 'last_login' , 'status','email_verified_at','settings'];
      removeKeys.forEach((item, index)=>{
          delete this.params[item];
      })
      this.accessControl.post(this.params.id,this.params).then((response)=>{
        this.$refs.saveUser.toggleProcessing();
        if(response.data.data.id)
        {
          this.$helper.success(this.$notify,"User","User has been created/updated successfully");
          this.addContactModal.hide();
          this.getUsers();
        }
      })
    },

    add_user(){
      this.params =  ref({ id: null, name: '', email: '', username : '' ,password: null, usergroup_id:'' ,phone: '', branch_id : '' });
      this.params.id = null;
      this.addContactModal.show();
    },
    edit_user(user)
    {
      this.params = user;
      this.addContactModal.show();
    },
    search_contacts()
    {
      this.filterd_contacts_list =ref( this.contacts_list.filter((d) => d.name.toLowerCase().includes(this.search_user)));
    },

    getBranches()
    {
      this.accessControl.$branchService.get().then((response)=>{

        for(let key in response.data.data)
        {
          this.branches.push({id:response.data.data[key]['id'],'name':response.data.data[key]['name']})
        }
      });
    }

  },

  mounted() {

    this.getGroups();
    this.getUsers();
    this.getBranches();
  }

}

</script>
