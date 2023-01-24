import {CustomerService} from "../customermanager/customer/customer-service";


export class PaymentService {


    constructor(http) {
        this.$http = http;
        this.$customer = new CustomerService(this.$http)
    }

    get() {
        return this.$http.get("PaymentManager/payment");
    }

    save(data)
    {
      return this.post(data)
    }

    post(data){
        return this.$http.post("PaymentManager/payment",data);
    }

    storeCreditPayment(data){
        return this.$http.post("PaymentManager/payment/storeCreditPayment",data);
    }

    invoice(id)
    {
        return this.$http.get("PaymentManager/payment/"+id+"/invoice");
    }

    payment_by_method()
    {
        return this.$http.get("PaymentManager/payment/payment_by_method");
    }

    custom(filter)
    {
        return this.$http.post("PaymentManager/payment/custom",filter);
    }

}
