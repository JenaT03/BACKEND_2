const {ObjectId} = require("mongodb");

class ContactService {
    constructor(client){
        this.Contact = client.db().collection("contacts");
    }

    extractCotactData(payload) { 
        const contact = { // contact được tạo ra từ các thuộc tính trong payload
            name : payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };

        Object.keys(contact).forEach( // lọc dữ liệu, nếu có value là undefined thì xóa nó
            (key)=> contact[key] === undefined && delete contact[key]
        );
        return contact;
    }
    async create(payload) { //payload là req chứa thông tin contact
        const contact = this.extractCotactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            contact,
            {$set: {favorite:contact.favorite === true}},  // cập nhật atr fav là true nếu giá trị contact.fav là true
            {returnDocument: "after", upsert: true} // upsert cho phép tạo doc mới nếu ko tồn tại, after đảm bảo kết quả trả về sau cập nhật

        );
        return result;
    }

    async find(filter){
        const cursor = await this.Contact.find(filter); // sử dụng method .find(filter) của mongodb để tìm và trả về con trỏ
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i"}, //toán tử regex-trong MongoDB cho phép tìm doc mà name chứa chuổi con khớp với biểu thức chính quy được tạo bởi new RegExp(name), op i ko phân biệt hoa thường
        });
    }
}

module.exports = ContactService;