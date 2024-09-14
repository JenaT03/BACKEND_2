const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = (req, res) => {
    res.send({message : "create handler"});
}

exports.findAll = (req, res) => {
    res.send({message: "findAll handler"});
}

exports.findOne = (req, res) => {
    res.send({message: "findOne handler"});
}

exports.update = (req, res) => {
    res.send({message: "update handler"});
}

exports.delete = (req, res) => {
    res.send({message: "delete handler"});
}

exports.deleteAll = (req, res) => {
    res.send({message: "deleteAll handler"});
}

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