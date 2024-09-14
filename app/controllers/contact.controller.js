const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");


exports.findAllFavorite = (req, res) => {
    res.send({message: "findAllFavorite"});
}

exports.create = async (req, res, next) => {
    if(!req.body?.name) { // req tại body không chứa name
        return next(new ApiError(400, "Name can not empty")); // next() chuyển tới middleware để xử lý lỗi
    }

    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    }catch(error) {
        return next(
            new ApiError(500, "An error occured while creating the contact")
        );
    }
}

exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const contactService = new ContactService(MongoDB.client);
        const { name }= req.query; // lấy giá trị của tham số name từ trong query
        if(name) {
            console.log("1");
            documents = await contactService.findByName(name);
        }else {
            onsole.log("2");
            documents = await contactService.find({});
        }
    }catch(error){
        return next(
            new ApiError(500, "An error occured while retrieving contatcs")
        )
    }
    return res.send(documents);
};

exports.findOne = async(req, res, next) => {
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id); // lấy id trên method get để tìm
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    }catch(error){
        return next(
            new ApiError(500, `Error retrieving contact with id =${req.params.id}`)
        );
    }
};

exports.update = async(req, res, next) => {
    if(Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body); // tìm id và update với dữ liệu từ req.body
        if(!document){
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: "Contact was updated sucessfully"});
    }catch(error){
        return next(
            new ApiError(500, `Error updating contact with id = ${req.params.id}`)
        );
    }
};