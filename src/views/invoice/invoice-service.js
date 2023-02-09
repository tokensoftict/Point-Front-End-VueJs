
import { CustomerService} from "../customermanager/customer/customer-service";
import {StockService} from "../stock/stockService";
import {AccessControl} from "../accesscontrol/access-control";

export class InvoiceService {

    constructor(http) {
        this.$http = http;
        this.$customer = new CustomerService(this.$http)
        this.$stock = new StockService(this.$http)
        this.$accessControl = new AccessControl(this.$http)
     }

    get() {
        return this.$http.get("InvoiceManager/invoice");
    }

    remove(id) {
        return this.$http.delete("InvoiceManager/invoice/"+id);
    }

    save(data,id)
    {
        if(id === undefined)
        {
            return this.post(data)
        }
        else
        {
            return this.update(data,id)
        }
    }

    post(data) {
        return this.$http.post("InvoiceManager/invoice/",data);
    }

    update(data, id){
        if(data instanceof FormData) {
            data.set("_method", "PUT");
        }
        else {
            data['_method'] = "PUT";
        }
        return this.$http.post("InvoiceManager/invoice/"+id,data);
    }

    draft() {
        return this.$http.get("InvoiceManager/invoice/draft");
    }

    complete() {
        return this.$http.get("InvoiceManager/invoice/complete");
    }

    markeAsComplete(id)
    {
        return this.$http.get("InvoiceManager/invoice/"+id+"/markAsComplete");
    }

    paid() {
        return this.$http.get("InvoiceManager/invoice/paid");
    }

    show(id) {
        return this.$http.get("InvoiceManager/invoice/"+id+"/show");
    }

    destroy(id)
    {
        return this.$http.get("InvoiceManager/invoice/"+id+"/destroy");
    }

    custom(filter)
    {
        return this.$http.post("InvoiceManager/invoice/daily",filter);
    }

}
