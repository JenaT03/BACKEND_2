const {ObjectId} = require("mongo");

class ConatctService {
    constructor(client){
        this.Contact = client.db().collection("contacts");
    }
}

module.exports = ContactService;