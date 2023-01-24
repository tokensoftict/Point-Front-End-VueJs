import {AccessControl} from "../../accesscontrol/access-control";

export class ProductionService {

    constructor(http) {
        this.$http = http;
        this.$accessControl = new AccessControl(this.$http);
    }


    get() {
        return this.$http.get("bakeryManager/production");
    }

    remove(id) {
        return this.$http.delete("bakeryManager/production/"+id);
    }

    insert(data) {
        return this.$http.post("bakeryManager/production",data);
    }

    show(id) {
        return this.$http.get("bakeryManager/production/"+id+"/show");
    }

    post(data,id){
        if(id === undefined) return this.insert(data);

        if(id !== undefined) return this.update(data,id);
    }

    update(data, id){
        if(data instanceof FormData) {
            data.set("_method", "PUT");
        }
        else {
            data['_method'] = "PUT";
        }

        return this.$http.post("bakeryManager/production/"+id+"/update",data);
    }

    complete(data,id)
    {
        if(data instanceof FormData) {
            data.set("_method", "PUT");
        }
        else {
            data['_method'] = "PUT";
        }

        console.log(data);
        return this.$http.post("bakeryManager/production/"+id+"/complete",data);
    }

    custom(filter)
    {
        return this.$http.post("bakeryManager/production/custom",filter);
    }

}
