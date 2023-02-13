<template src="./branch.html"></template>

<script>

import textbox from "../../../components/html/textbox.vue";
import button from "../../../components/html/button.vue";
import textarea from "../../../components/html/textarea.vue";
import select from "../../../components/html/select.vue";
import file from "../../../components/html/file.vue";
import {BranchService} from "./branch-service";


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
            name: "",
            columns: ['Name','Address_1','Address_2' ,'Phone', 'created_at', 'action'],
            tableData: [],
            options: {
                perPage: 10,
                perPageValues: [100, 500, 1000, 300, -1],
                skin: 'table',
                columnsClasses: {actions: 'actions text-center'},
                pagination: {nav: 'scroll', chunk: 5},
                texts: {
                    count: 'Showing {from} to {to} of {count}',
                    filter: '',
                    filterPlaceholder: 'Search...',
                    limit: 'Results:',
                },
                sortable: ['id', 'name'],
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
            update_controls: ["update_name","update_address_1","update_address_2","update_phone"],
            new_controls: ["name","address_1","address_2","phone"],

        }
    },


    computed: {
        branchService() {
            return new BranchService(this.$api)
        },

        updateModal()
        {
            return  new bootstrap.Modal(document.getElementById('editBranch'), {})
        },


    },


    mounted() {
        this.get()
    },


    methods: {

        edit(branch) {

            this.update = branch;

            for (let key in branch) {

               if(typeof this.$refs["update_" + key] !== "undefined"){

                   this.$refs["update_" + key].setValue(branch[key]);

               }
            }

            this.updateModal.show();

        },

        updateBranch() {
            if (this.$helper.validateSingle(this.$refs, this.update_controls) === false) {

                this.$refs.update_button.toggleProcessing();

                const storedata = new FormData;

                for (let key of this.update_controls) {

                    if (typeof this.$refs[key].valid !== "undefined") {

                        storedata.set(key.replace("update_",""), this.$refs[key].getValue());

                    }

                }

                this.branchService.update(storedata, this.update.id)
                    .then((response) => {
                        this.$refs.update_button.toggleProcessing();
                        this.get();
                        this.updateModal.hide();
                        this.$refs.updateform.reset()
                        this.$notify({
                            title: "Point",
                            type: "success",
                            text: "Branch updated Successfully"
                        });
                    })
                    .catch((response) => {
                        this.$refs.update_button.toggleProcessing();
                    })

            }

        },


        get() {
            this.$refs.bank_table.setLoadingState(true);
            this.branchService.get().then((response) => {
                this.tableData = response.data.data;
                this.$refs.bank_table.setLoadingState(false);
            });
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

                this.branchService.post(storedata)
                    .then((response) => {
                        this.$refs.submit_button.toggleProcessing();
                        this.get();
                        this.$refs.newform.reset()
                        this.$notify({
                            title: "Point",
                            type: "success",
                            text: "Branch added Successfully"
                        });
                    })
                    .catch((response) => {
                        this.$refs.submit_button.toggleProcessing();
                    })

            }

        }

    }
}


</script>
