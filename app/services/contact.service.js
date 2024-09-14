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

    async findById(id) {
        return await this.Contact.findOne({
            _id: ObjectId.isValid(id)? new ObjectId(id) : null, // kiểm tra xem id có hợp lệ hay không nếu có nó sẽ tạo ra và tìm kiếm bằng _id
        });
    }

    async update(id, payload){
        const filter = {
            _id: ObjectId.isValid(id)? new ObjectId(id) : null, 
        };
        const update = this.extractCotactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            filter,
            { $set: update }, // chỉ cập nhật các doc trong updtate
            { returnDocument: "after" }
        );
        return result; // chứa doc được update success còn không thì là null
    }

    async delete(id) {
        const result = await this.Contact.findOneAndDelete({
            _id: ObjectId.isValid(id)? new ObjectId(id) : null,
        });
        return result;
    }

    async findFavorite() {
        return await this.find({favorite:true});

    }
}

module.exports = ContactService;