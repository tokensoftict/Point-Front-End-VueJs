
export class CustomerService {

    constructor(http) {
        this.$http = http;
    }

    get() {
        return this.$http.get("customerManager/customer/");
    }

    toggle(id) {
        return this.$http.get("customerManager/customer/"+id+"/toggle");
    }

    remove(id) {
        return this.$http.delete("customerManager/customer/"+id);
    }

    post(data) {
        return this.$http.post("customerManager/customer/",data);
    }

    update(data, id){
        data.set("_method","PUT");
        return this.$http.post("customerManager/customer/"+id,data);
    }

    search(search)
    {
        return this.$http.post("customerManager/customer/find/",search);
    }

    phoneSearch(phoneNumber)
    {
        return this.$http.post('customerManager/customer/findByphone/',{phoneNumber : phoneNumber});
    }

    balanceSheet(filter)
    {
        return this.$http.post('customerManager/customer/balancesheet/',filter);
    }

    creditors()
    {
        return this.$http.get('customerManager/customer/creditors');
    }

}
