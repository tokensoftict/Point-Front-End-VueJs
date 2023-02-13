<template src="./group.html"></template>

<script>

import textbox from "../../../../components/html/textbox.vue";
import button from "../../../../components/html/button.vue";
import textarea from "../../../../components/html/textarea.vue";
import file from "../../../../components/html/file.vue";
import select from "../../../../components/html/select.vue";
import {AccessControl} from "../../access-control";

export default {

  components: {
    'app-textbox': textbox,
    'app-button': button,
    'app-textarea': textarea,
    'app-file': file,
    'app-select' : select
  },

  data() {
    return {
      tableData: [],
      columns: ["No",'Name','action'],
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
      update: {
        id: ""
      },
      update_name: "",
      new_controls: ['name'],
      update_controls: ['update_name'],
      modules : [],
      permissions : [],
      selectpermission : ""
    }
  },

  computed: {

    accessControl()
    {
      return new AccessControl(this.$api);
    },

    updateModal()
    {
      return  new bootstrap.Modal(document.getElementById('updateUserGroup'), {})
    }
    ,
    newModal()
    {
      return  new bootstrap.Modal(document.getElementById('newUserGroup'), {})
    },
    updateGroupPermission()
    {
      return  new bootstrap.Modal(document.getElementById('groupPermission'), {})
    },

    prepare_permission()
    {
      let permission = [];
      for(let key in this.permissions)
      {
        if(this.permissions[key] !== false)
        {
          permission.push(key);
        }
      }
      return permission
    }

  },

  mounted() {
    this.get()
  },

  methods: {

    savePermsssions()
    {
        if(this.prepare_permission.length === 0)
        {
          this.$helper.error(this.$notify,"Access Control","Please select at least one permission");
          return false;
        }
        this.$refs.permission_button.toggleProcessing();
        this.accessControl.savePermissions( this.selectpermission,{'privileges':this.prepare_permission})
            .then((response)=>{
              this.$refs.permission_button.toggleProcessing();
              this.$helper.success(this.$notify,"Access Control","Permission and privileges has been assigned successfully");
              this.updateGroupPermission.hide();
              this.permissions = [];
              this.modules = [];

            })
            .error((response)=>{
              this.$refs.permission_button.toggleProcessing();
              this.$helper.error(this.$notify,"Access Control","There was error while assigning permission and privileges has been assigned successfully");
            });
    },

    get() {
      this.$refs.group_table.setLoadingState(true);
      this.accessControl.get().then((response) => {
        this.tableData = response.data.data;
        this.$refs.group_table.setLoadingState(false);
      });
    },

    edit(group) {

      this.update = group;

      for (let key in group) {
        if(typeof this.$refs["update_" + key] !== "undefined"){

          this.$refs["update_" + key].setValue(group[key]);

        }
      }
      this.updateModal.show();
    },

    save() {
      if (this.$helper.validateSingle(this.$refs, this.new_controls) === false) {
        this.$refs.submit_button.toggleProcessing();

        const storedata = new FormData;

        for (let key of this.new_controls) {

          if (typeof this.$refs[key].valid !== "undefined") {

            storedata.set(key, this.$refs[key].getValue());

          }

        }

        this.accessControl.postGroup(storedata)
            .then((response) => {
              this.$refs.submit_button.toggleProcessing();
              this.get();
              this.newModal.hide();
              this.$refs.newform.reset();
              this.$notify({
                title: "Point",
                type: "success",
                text: "User group has been created Successfully"
              });
            })
            .catch((response) => {
              this.$refs.submit_button.toggleProcessing();
            });
      }
    },

    updateGroup() {

      if (this.$helper.validateSingle(this.$refs, this.update_controls) === false) {

        this.$refs.update_button.toggleProcessing();

        const storedata = new FormData;

        for (let key of this.update_controls) {

          if (typeof this.$refs[key].valid !== "undefined") {

            storedata.set(key.replace("update_",""), this.$refs[key].getValue());

          }

        }

        this.accessControl.update(storedata, this.update.id)
            .then((response) => {
              this.$refs.update_button.toggleProcessing();
              this.get();
              this.updateModal.hide();
              this.$refs.updateform.reset();
              this.$notify({
                title: "Point",
                type: "success",
                text: "Group has been updated Successfully"
              });
            })
            .catch((response) => {
              this.$refs.update_button.toggleProcessing();
            })

      }

    },

    fetchPermission(id)
    {
      this.modules = [];
      this.updateGroupPermission.show();
      this.selectpermission = id;
      this.permissions = [];
      this.accessControl.permissions(id).then((response)=>{
        this.modules = response.data.data.data.modules
        this.modules.forEach((item, index)=>{
              item['tasks'].forEach((task, task_index) =>{
                  if(task.permissions.length > 0)
                  {
                    this.permissions[task.id] = true;
                  }
              });
        });
      });
    }

  }

}

</script>
