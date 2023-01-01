
export class TransferService {

    constructor(http) {
        this.$http = http;
    }


    get() {
        return this.$http.get("bakeryManager/transfer");
    }

    show(id) {
        return this.$http.get("bakeryManager/transfer/"+id+"/show");
    }

    accept(id) {
        return this.$http.get("bakeryManager/transfer/"+id+"/accept");
    }

    decline(id) {
        return this.$http.get("bakeryManager/transfer/"+id+"/decline");
    }

}
