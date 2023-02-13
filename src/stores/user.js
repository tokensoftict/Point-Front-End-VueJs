import { defineStore } from 'pinia'
import environment from "./environment";

export const useUserStore = defineStore({

    id: 'user',
    state: () => ({
        token: false,
        base : environment[import.meta.env.MODE].baseUrl,
        id : '',
        access : [],
        status : false,
        showCreditPop : false
    }),

    actions: {
        login(vue, data) {
            let self =this;
            return new Promise(function(resolve, reject){
                vue.$api.post("auth",data)
                    .then(function(response){
                        self.status = true;
                        for(var _key in response.data.data)
                        {
                            self[_key] = response.data.data[_key];
                        }
                        response.data.data['default_branch'] = response.data.data['mybranches'][0]['id'];
                        localStorage.setItem("token",response.data.data.token);
                        localStorage.setItem("user",JSON.stringify(response.data.data));


                        self.access = response.data.data.permission.map((pmsn)=>{
                            return pmsn.route
                        });

                        resolve(response.data);
                    })
                    .catch(function(error){

                        reject(error);
                    })
            });
        },
        hasModuleAccess(name) {
            for(let i=0; i < this.access.length; i++)
            {
                if(this.access[i].includes(name)) return true;
            }
            return false;
        },
        logout(vue){
            let self =this;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            vue.$router.push({name : 'Login'});
            self = {
                token: false,
                base : environment[import.meta.env.MODE].baseUrl,
                id : '',
                access : [],
                status : false,
            }
            return new Promise(function(resolve, reject){
               vue.$api.get("logout")
                   .then(function(response){
                       resolve(response.data)
                   }).catch(function (error){
                    reject(error.response.data);
                })
            });
        },
        popMenu(link){
            var win = window.open(link, "MsgWindow", "width=800,height=500");
            win.onload = function(){
               
                win.print();
            }

        },
        refresh(){
            let data = localStorage.getItem("user");
            let token  = localStorage.getItem("token");

            if(!data) return;

            data = JSON.parse(data);

            if(token)
            {
                this.status = true;

                for(let _key in data)
                {
                    this[_key] = data[_key];
                }
            }

            if(data.permission)
            {
                this.access = data.permission.map((pmsn)=>{
                    return pmsn.route
                });
            }

            data['default_branch'] =data['mybranches'][0]['id'];

            return data;
        },
        islogin(){

            let user = localStorage.getItem("user");
            let token  = localStorage.getItem("token");
            return !!(user && token);

        },
        setDefaultBranch(value)
        {
            let data = JSON.parse(localStorage.getItem("user"));
             data['default_branch'] = value;
            localStorage.setItem("user",JSON.stringify(data));
            this['default_branch'] = value;
        }
    }
});
