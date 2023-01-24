<template src="./app-layout.html"></template>

<script>

    import Header from '../../components/layout/header/header.vue'
    import Footer from '../../components/layout/footer/footer.vue'
    import Sidebar from '../../components/layout/sidebar/sidebar.vue'


    export default {
        components : {
            Header,
            Footer,
            Sidebar,
        },

        mounted() {
            window.loading = document.getElementById('loader');
            window.application = document.getElementById('application');
        }
    }
</script>


