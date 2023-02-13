import {CustomerService} from "../customermanager/customer/customer-service";
import {StockService} from "../stock/stockService";
import {BranchService} from "../settings/branch/branch-service";

export class AccessControl {

    constructor(http) {
        this.$http = http;
        this.$branchService = new BranchService(this.$http);
    }

    get() {
        return this.$http.get("access-control/user-group");
    }

    update(data, id){
        if(data instanceof FormData) {
            data.set("_method", "PUT");
        }
        else {
            data['_method'] = "PUT";
        }
        return this.$http.post("access-control/user-group/"+id,data);
    }

    postGroup(data)
    {
        return this.$http.post("access-control/user-group",data);
    }

    permissions(id)
    {
        return this.$http.get("access-control/user-group/"+id+"/permission")
    }

    savePermissions(id,data)
    {
        return this.$http.post("access-control/user-group/"+id+"/permission",data);
    }

    toggleGroup(id)
    {
        return this.$http.get("access-control/user-group/"+id+"/toggle");
    }



    getUsers()
    {
        return this.$http.get("access-control/user");
    }

    post(id,data)
    {
        if(id!== null) return this.updateUser(data,id);

        if(id === null) return this.saveUser(data);
    }

    saveUser(data)
    {
        return this.$http.post("access-control/user",data);
    }

    updateUser(data,id)
    {
        if(data instanceof FormData) {
            data.set("_method", "PUT");
        }
        else {
            data['_method'] = "PUT";
        }
        return this.$http.post("/access-control/user/"+id,data);
    }

    toggleUser(id)
    {
        return this.$http.get("/access-control/user/"+id+"/toggle");
    }
}
