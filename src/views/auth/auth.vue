
<template src="./auth.html"></template>

<style lang="scss" src="./auth.scss"></style>

<script>

import Button from "../../components/html/button.vue";
import Textbox from "../../components/html/textbox.vue";

export default {

    components : {
        'app-button' : Button,
        'app-textbox' : Textbox
    },

    data() {
        return {
            username : "",
            password : "",
            error : "",
            loginSuccess : false
        }
    },

    methods : {
        login () {
            this.error = "";
            if(this.$helper.validate(this.$refs) === false)
            {

                this.$refs.submit_button.toggleProcessing();

                const loginData = new FormData;

                loginData.set("email",this.username);
                loginData.set("password",this.password);

                const obj = this;

                this.$user.login(this,loginData).then((response)=>{

                    this.$helper.success(
                        this.$notify,
                        "Authentication",
                        "Login successful, Welcome back "+this.$user.name
                    )

                    setTimeout(function(){
                        obj.$router.push({name : 'AppHome'});
                    },1700)

                }).catch((response)=>{

                    obj.$refs.submit_button.toggleProcessing();
                    console.log(response.response.data.error);
                    if(typeof response === "object" && typeof response.response.data.error !== "undefined")
                    {
                        this.$helper.error(
                            this.$notify,
                            "Authentication",
                            response.response.data.error
                        )

                        obj.error = response.response.data.error;

                    }

                });
            }

        }

    },

    mounted() {
      this.$nextTick(function(){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
    }
}
</script>
