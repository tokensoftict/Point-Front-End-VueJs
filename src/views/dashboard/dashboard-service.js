import {PaymentService} from "../payment/payment-service";
import {CustomerService} from "../customermanager/customer/customer-service";


export class DashboardService {

    constructor(http) {
        this.$http = http;
        this.paymentService = new PaymentService(this.$http);
        this.customer = new CustomerService(this.$http);
    }


}
