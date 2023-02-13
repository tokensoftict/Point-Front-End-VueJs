
export class BranchService {

    constructor(http) {
        this.$http = http;
    }

    get() {
        return this.$http.get("/settings/branch");
    }


    remove(id) {
        return this.$http.delete("settings/branch/"+id);
    }

    post(data) {
        return this.$http.post("/settings/branch",data);
    }

    update(data, id){
        data.set("_method","PUT");
        return this.$http.post("/settings/branch/"+id,data);
    }


}
