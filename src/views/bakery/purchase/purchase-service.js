import {SupplierService} from "../../settings/supplier/supplier-service";
import {AccessControl} from "../../accesscontrol/access-control";

export class PurchaseService {

    constructor(http) {
        this.$http = http;
        this.$suppler = new SupplierService(this.$http);
        this.$accessControl = new AccessControl(this.$http);
    }


    get() {
        return this.$http.get("purchaseorders/purchaseorders?type=Modules\\BakeryManager\\Entities\\Rawmaterial");
    }

    remove(id) {
        return this.$http.delete("purchaseorders/purchaseorders/"+id+"/remove");
    }

    insert(data) {
        return this.$http.post("purchaseorders/purchaseorders/store/",data);
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

        return this.$http.post("purchaseorders/purchaseorders/"+id+"/update",data);
    }


    show(id){
        return this.$http.get("purchaseorders/purchaseorders/"+id+"/show");
    }


    complete(id){
        return this.$http.get("purchaseorders/purchaseorders/"+id+"/markAsComplete");
    }


    custom(filter)
    {
        return this.$http.post("purchaseorders/purchaseorders/custom",filter);
    }
}
